export async function sendEmail({ to, subject, html }) {
  return {
    to,
    subject,
    html,
    provider: 'not-configured',
  };
}

