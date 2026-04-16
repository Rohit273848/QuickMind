
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
   
  }
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.error("❌Email transporter verification failed:", err);
  });

export async function sendEmail({ to, subject, html, text="" }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text: text || "Please check your email",
  };

  try {
    const details = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email send failed:", error);
  }
  console.log("Email sented:", to);
}