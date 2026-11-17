const ease = [.22, 1, .36, 1] as const;

export function reveal(delay = 0) {
  return {
    initial: false as const,
    whileInView: { opacity: [.15, 1], y: [22, 0] },
    viewport: { once: true, amount: "some" as const },
    transition: { duration: .95, delay, ease },
  };
}

export const revealFade = {
  initial: false as const,
  whileInView: { opacity: [.72, 1] },
  viewport: { once: true },
  transition: { duration: .55, ease },
};
