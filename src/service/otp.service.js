import nodemailer from "nodemailer";
import dns from "dns";

// Force Node.js DNS lookup to prioritize IPv4 over IPv6.
// Fixes 'connect ENETUNREACH <IPv6>:465' on Railway & cloud hosting.
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
}

export const GenerateOtp = () => {
    // Generate a 6-digit random numeric string
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const createTransporter = () => {
    const rawHost = process.env.SMTP_HOST?.trim();
    // If SMTP_HOST is 'gmail' or omitted, map to 'smtp.gmail.com'
    const host = (rawHost && rawHost.toLowerCase() !== "gmail") ? rawHost : "smtp.gmail.com";
    
    // Default to port 587 (STARTTLS) if not explicitly set to 465
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
        family: 4, // Force IPv4 connection to prevent ENETUNREACH
        tls: {
            rejectUnauthorized: false
        }
    });
};

export const SendOtpEmail = async (email, otp) => {
    const hasSmtpConfig = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

    if (hasSmtpConfig) {
        try {
            const transporter = createTransporter();

            const mailOptions = {
                from: `"LinkVault Security" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `${otp} is your LinkVault Password Reset Code`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
                        <div style="text-align: center; margin-bottom: 24px;">
                            <h1 style="color: #1e1b4b; font-size: 24px; font-weight: 800; margin: 0;">LinkVault</h1>
                            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Password Reset Request</p>
                        </div>
                        <div style="background: #ffffff; padding: 28px 24px; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                            <p style="color: #334155; font-size: 14px; margin: 0 0 16px 0; line-height: 1.5;">
                                We received a request to reset your password. Use the 6-digit verification code below to complete your reset:
                            </p>
                            <div style="display: inline-block; padding: 14px 32px; background: #e0e7ff; color: #4338ca; font-size: 32px; font-weight: 800; letter-spacing: 6px; border-radius: 12px; font-family: monospace; border: 1px solid #c7d2fe;">
                                ${otp}
                            </div>
                            <p style="color: #64748b; font-size: 12px; margin: 20px 0 0 0;">
                                This code is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.
                            </p>
                        </div>
                        <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 24px;">
                            &copy; ${new Date().getFullYear()} LinkVault Inc. All rights reserved.
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`[EMAIL SENT] Password reset OTP sent to ${email}`);
            return { success: true, method: "smtp" };
        } catch (error) {
            console.error("[SMTP ERROR] Failed to send email via nodemailer:", error.message);
            if (process.env.NODE_ENV === "production") {
                throw new Error(`Email delivery failed: ${error.message}`);
            }
        }
    }

    // Development / Fallback Console Logger:
    console.log("\n=======================================================");
    console.log("🔐 [LINKVAULT OTP VERIFICATION CODE]");
    console.log(`👤 Recipient Email : ${email}`);
    console.log(`🔑 6-Digit OTP Code : >>> ${otp} <<<`);
    console.log(`⏱️ Validity         : 10 Minutes`);
    console.log("=======================================================\n");

    return { success: true, method: "console", otp };
};

export const SendSignupOtpEmail = async (email, otp) => {
    const hasSmtpConfig = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

    if (hasSmtpConfig) {
        try {
            const transporter = createTransporter();

            const mailOptions = {
                from: `"LinkVault Security" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `${otp} is your LinkVault Registration Verification Code`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
                        <div style="text-align: center; margin-bottom: 24px;">
                            <h1 style="color: #1e1b4b; font-size: 24px; font-weight: 800; margin: 0;">LinkVault</h1>
                            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Welcome & Email Verification</p>
                        </div>
                        <div style="background: #ffffff; padding: 28px 24px; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                            <p style="color: #334155; font-size: 14px; margin: 0 0 16px 0; line-height: 1.5;">
                                Welcome to LinkVault! Use the 6-digit verification code below to verify your email address and complete your account creation:
                            </p>
                            <div style="display: inline-block; padding: 14px 32px; background: #e0e7ff; color: #4338ca; font-size: 32px; font-weight: 800; letter-spacing: 6px; border-radius: 12px; font-family: monospace; border: 1px solid #c7d2fe;">
                                ${otp}
                            </div>
                            <p style="color: #64748b; font-size: 12px; margin: 20px 0 0 0;">
                                This code is valid for <strong>10 minutes</strong>. If you did not initiate account registration, please ignore this email.
                            </p>
                        </div>
                        <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 24px;">
                            &copy; ${new Date().getFullYear()} LinkVault Inc. All rights reserved.
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`[SIGNUP EMAIL SENT] Registration OTP sent to ${email}`);
            return { success: true, method: "smtp" };
        } catch (error) {
            console.error("[SMTP ERROR] Failed to send signup email via nodemailer:", error.message);
            if (process.env.NODE_ENV === "production") {
                throw new Error(`Email delivery failed: ${error.message}`);
            }
        }
    }

    // Development / Fallback Console Logger:
    console.log("\n=======================================================");
    console.log("🔐 [LINKVAULT SIGNUP OTP VERIFICATION CODE]");
    console.log(`👤 Recipient Email : ${email}`);
    console.log(`🔑 6-Digit OTP Code : >>> ${otp} <<<`);
    console.log(`⏱️ Validity         : 10 Minutes`);
    console.log("=======================================================\n");

    return { success: true, method: "console", otp };
};


