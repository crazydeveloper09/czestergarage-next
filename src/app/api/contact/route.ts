import { getFooter } from "@/lib/graphql/requests/footer";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const field = (name: string) => String(form.get(name) ?? "").trim();
  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const message = field("message");

  if (field("website")) return Response.json({ ok: true });
  if (!name || name.length > 100 || !phone || phone.length > 40 ||
      !message || message.length > 2500 ||
      (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))) {
    return Response.json({ error: "Sprawdź wymagane pola formularza." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  try {
    if (!apiKey || !from) throw new Error("Missing Resend configuration");
    const to = (await getFooter())?.email;
    if (!to) throw new Error("Missing Hygraph contact email");

    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: "Wiadomość z formularza Czester Garage",
        text: [`Imię i nazwisko: ${name}`, `Telefon: ${phone}`, `E-mail: ${email || "—"}`, "", message].join("\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) throw new Error(`Resend returned HTTP ${result.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed", error instanceof Error ? error.message : "");
    return Response.json({ error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń." }, { status: 503 });
  }
}
