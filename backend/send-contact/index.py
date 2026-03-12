import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта ДомДзен на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    to_email = "ruslan399885@gmail.com"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #9B3A1E; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">ДомДзен — Новая заявка</h1>
      </div>
      <div style="padding: 32px; background: #F5F0EA;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE6DC; color: #7A6E65; font-size: 13px; width: 30%;">Имя</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE6DC; font-size: 15px; font-weight: bold; color: #1C1612;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE6DC; color: #7A6E65; font-size: 13px;">Телефон</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE6DC; font-size: 15px; font-weight: bold; color: #1C1612;">
              <a href="tel:{phone}" style="color: #9B3A1E; text-decoration: none;">{phone}</a>
            </td>
          </tr>
          {"" if not message else f'<tr><td style="padding: 12px 0; color: #7A6E65; font-size: 13px; vertical-align: top;">Сообщение</td><td style="padding: 12px 0; font-size: 14px; color: #1C1612;">{message}</td></tr>'}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #1C1612; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">© 2026 ДомДзен · domdzen@gmail.com</p>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name} — ДомДзен"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }