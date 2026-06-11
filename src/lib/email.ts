import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || 'test',
    pass: process.env.SMTP_PASS || 'test',
  },
});

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Aurore Capital" <noreply@aurorecapital.com>',
      to,
      subject,
      text,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    // Even if it fails (e.g. dummy credentials), we return true for the demo so the user flow doesn't break
    return { success: false, error };
  }
}
