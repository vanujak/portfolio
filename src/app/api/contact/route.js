import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getAutoReplyTemplate(name, visitorMessage) {
  const currentYear = new Date().getFullYear();
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Reaching Out</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <!-- Main Email Container -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">
                
                <!-- Premium Gradient Header Accent -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); height: 6px;"></td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <!-- Brand/Header -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                      <tr>
                        <td>
                          <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #1e1b4b;">Vanuja<span style="color: #6366f1;">.</span></span>
                        </td>
                      </tr>
                    </table>

                    <!-- Greeting & Main Message -->
                    <h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; line-height: 1.25;">Hi ${name},</h1>
                    <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                      Thanks for reaching out! I have received your message through my portfolio contact form. I will review it and get back to you as soon as possible.
                    </p>

                    <!-- User Message Quote Block -->
                    ${
                      visitorMessage
                        ? `
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; border-radius: 8px; border-left: 4px solid #6366f1; margin-bottom: 28px;">
                        <tr>
                          <td style="padding: 16px 20px;">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">Your Message:</span>
                            <p style="font-size: 14px; line-height: 1.5; color: #334155; margin: 0; font-style: italic;">"${visitorMessage}"</p>
                          </td>
                        </tr>
                      </table>
                    `
                        : ""
                    }

                    <!-- Signature -->
                    <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 4px 0;">Best regards,</p>
                    <p style="font-size: 15px; font-weight: 700; color: #1e1b4b; margin: 0;">Vanuja</p>
                  </td>
                </tr>

                <!-- Footer Section -->
                <tr>
                  <td style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 30px; text-align: center;">
                    <!-- Social Links -->
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Let's connect</p>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 20px auto;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="https://github.com/vanujak" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 600;">GitHub</a>
                        </td>
                        <td style="padding: 0 4px; color: #cbd5e1;">&bull;</td>
                        <td style="padding: 0 8px;">
                          <a href="https://linkedin.com/in/vanujak" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 600;">LinkedIn</a>
                        </td>
                        <td style="padding: 0 4px; color: #cbd5e1;">&bull;</td>
                        <td style="padding: 0 8px;">
                          <a href="https://twitter.com/vanuja__" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 600;">Twitter</a>
                        </td>
                        <td style="padding: 0 4px; color: #cbd5e1;">&bull;</td>
                        <td style="padding: 0 8px;">
                          <a href="https://instagram.com/vanuja___" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 600;">Instagram</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Copyright / Note -->
                    <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
                      &copy; ${currentYear} Vanuja. All rights reserved.<br>
                      Sent automatically via portfolio contact form.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400, headers: corsHeaders }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env variables.");
      return NextResponse.json(
        { error: "Email service is currently misconfigured." },
        { status: 500, headers: corsHeaders }
      );
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const destinationEmail = process.env.NOTIFICATION_EMAIL || gmailUser;

    // 1. Send notification to the portfolio owner
    const adminMailPromise = transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: destinationEmail,
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          <p style="font-size: 15px;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="font-size: 15px; margin-bottom: 5px;"><strong>Message:</strong></p>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; font-style: italic; border-left: 4px solid #6366f1;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    // 2. Send auto-reply to the visitor
    const visitorMailPromise = transporter.sendMail({
      from: `"Vanuja" <${gmailUser}>`,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you soon.\n\nBest regards,\nVanuja`,
      html: getAutoReplyTemplate(name, message),
    });

    // Send both concurrently
    await Promise.all([adminMailPromise, visitorMailPromise]);

    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500, headers: corsHeaders }
    );
  }
}
