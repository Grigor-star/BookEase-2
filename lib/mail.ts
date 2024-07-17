import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://book-ease-gamma.vercel.app/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
    <html>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            <div style="border: 1px solid #ddd; padding: 20px; border-radius: 5px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Hi,</p>
                <p>Thank you for signing up. Please click the button below to verify your email address:</p>
                <a href="${confirmLink}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
                <p>Best regards,</p>
                <p>BookEase</p>
            </div>
        </body>
     </html>
`,
  });
};
