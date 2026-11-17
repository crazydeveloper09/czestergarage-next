"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./PageContent.module.scss";

export default function ContactForm() {
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  async function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    sending.current = true;
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (response.ok && result.ok) {
        form.reset();
        setStatus("Wiadomość została wysłana.");
      } else {
        setStatus(result.error || "Nie udało się wysłać wiadomości.");
      }
    } catch {
      setStatus("Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.");
    } finally {
      sending.current = false;
      setPending(false);
    }
  }

  return (
    <form id="formularz" className={styles.contactForm} onSubmit={sendEmail}>
      <span className={styles.eyebrow}>Napisz do nas</span>
      <h2>Formularz kontaktowy</h2>
      <p>Napisz, w czym możemy pomóc.</p>
      <div hidden><label>Strona internetowa <input name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <div className={styles.formRow}>
        <label>Imię i nazwisko <span aria-hidden="true">*</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>Telefon <span aria-hidden="true">*</span>
          <input name="phone" type="tel" autoComplete="tel" required maxLength={40} />
        </label>
      </div>
      <label>E-mail
        <input name="email" type="email" autoComplete="email" maxLength={254} />
      </label>
      <label>Wiadomość <span aria-hidden="true">*</span>
        <textarea name="message" rows={4} required maxLength={2500} />
      </label>
      <button className={styles.directions} type="submit" disabled={pending}>{pending ? "Wysyłanie…" : "Wyślij wiadomość"} <span aria-hidden="true">→</span></button>
      <div role="status">{status}</div>
    </form>
  );
}
