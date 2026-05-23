import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import config
import traceback


def send_contact_email(name: str, email: str, message: str) -> bool:
    """
    Send an email notification when someone contacts through the portfolio.
    
    Args:
        name: Sender's name
        email: Sender's email address
        message: Contact message content
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = config.SENDER_EMAIL
        msg['To'] = config.RECIPIENT_EMAIL
        msg['Subject'] = f"New Contact Message from {name}"
        
        # Create email body
        body = f"""
        You have received a new message from your portfolio contact form.
        
        Name: {name}
        Email: {email}
        Message:
        {message}
        
        ---
        Reply to: {email}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(config.SMTP_SERVER, config.SMTP_PORT) as server:
            server.starttls()
            server.login(config.SENDER_EMAIL, config.SENDER_PASSWORD)
            server.send_message(msg)
        
        print(f"Email sent successfully to {config.RECIPIENT_EMAIL}")
        return True
        
    except Exception as e:
        print(f"Error sending email: {traceback.format_exc()}")
        return False
