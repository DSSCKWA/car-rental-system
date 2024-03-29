import smtplib
import os
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from .invoice import generate_invoice


def send_email(recipient_email, subject, body, attachment_path=""):
    sender_email = "dssckwabot@gmail.com"
    smtp_connection = smtplib.SMTP("smtp.gmail.com", 587)
    smtp_connection.starttls()
    smtp_connection.login(sender_email, "tgscgeeytaeegvvg")

    email = MIMEMultipart()
    email['From'] = "Delta Szwadron Super Cool Komando Wilków Alfa Bot"
    email['To'] = recipient_email
    email['Subject'] = Header(subject, 'utf-8')
    email.attach(MIMEText(body, 'plain', 'utf-8'))
    if attachment_path:
        with open(attachment_path, "rb") as file:
            attachment = MIMEBase("application", "octet-stream")
            attachment.set_payload(file.read())

        encoders.encode_base64(attachment)
        attachment.add_header(
            "Content-Disposition",
            f"attachment; filename={attachment_path}",
        )
        email.attach(attachment)
        os.remove(attachment_path)

    smtp_connection.sendmail(sender_email, recipient_email, email.as_string())

    smtp_connection.quit()


def send_registration_confirmation(recipient_email, name):
    msg = f"""
    Dear {name},

    Thank you for choosing Car Rental System as your preferred car rental service. 
    
    We are delighted to confirm that your account registration has been successfully completed. You are now a valued member of our growing community!

    With your new account, you can enjoy seamless access to our extensive fleet of vehicles, convenient booking options, and exceptional customer service.
    Whether you need a car for business trips, vacations, or daily commuting, we are here to provide you with a hassle-free and enjoyable experience!
    """
    send_email(recipient_email, "Registration Success!", msg)


def send_password_change_confirmation(recipient_email):
    msg = """
    Your password has been successfully changed. This email serves as a confirmation of the recent password update. 
    Your account security is of utmost importance to us, and we encourage regular password updates to ensure the continued protection of your personal information.

    If you did not initiate this change, please contact our customer support team immediately at dssckwa@gmail.com. We take any unauthorized access very seriously and will investigate the matter promptly.

    To help maintain the security of your account, we recommend following these best practices:

    1. Create a strong and unique password: Use a combination of uppercase and lowercase letters, numbers, and special characters.
    2. Avoid using easily guessable information: Refrain from using personal details such as your name, birthdate, or phone number.
    3. Do not reuse passwords: Ensure that your new password is not the same as any previously used passwords.
    4. Enable two-factor authentication (2FA): Utilize an extra layer of security by enabling 2FA whenever possible.
    5. Regularly update your password: Change your password periodically to reduce the risk of unauthorized access.

    Thank you for your attention to this matter. We appreciate your commitment to account security and your continued trust in our services.
    """
    send_email(recipient_email, "Password changed successfully!", msg)


def send_rental_confirmation(recipient_email, start, end, brand, model):
    msg = f"""
    Thank you for choosing Car Rental Service for your car rental needs. We are delighted to confirm your reservation for a car, as per the details provided. 
    
    Please review the following information regarding your rental:

    Pick-up Date and Time: {start}
    Return Date and Time: {end}
    Car: {brand} {model}

    Rental Terms and Conditions:
        Please ensure that you carefully review and adhere to our rental terms and conditions. Here are a few important points to keep in mind:
            - The primary driver must present a valid driver's license and a major credit card at the time of pick-up.
            - The rental vehicle should be returned with a full tank of fuel to avoid any refueling charges.
            - Additional charges may apply for late returns or any damages incurred during the rental period.

    We look forward to serving you and providing a smooth and enjoyable car rental experience. We appreciate your business and hope you have a pleasant journey.

    Safe travels!
   
    """
    send_email(recipient_email,
               "Vehicle rented successfully!", msg)


def send_rental_invoice(recipient_email, name, surname, brand, model, vehicle_cost, insurance_cost, penalty_charges, start_date, end_date):
    invoice_path = generate_invoice(
        name, surname, brand, model, vehicle_cost, insurance_cost, penalty_charges)
    msg = f"""
    We would like to extend our gratitude for choosing Car Rental Service as your trusted car rental service provider.

    As per our records, your car rental agreement with us commenced on {start_date} and concluded on {end_date}. 
    We are pleased to attach your detailed invoice for the rental period.

    To settle the payment, kindly remit the total amount as soon as possible. You can make the payment using the following methods:
        1. Credit/Debit Card
        2. Bank Transfer
        3. Cash
    Upon successful payment, please retain the invoice for your records. If you have already made the payment, please disregard this reminder.

    We appreciate your business and look forward to serving you again in the future. 
    If there's anything else we can assist you with, feel free to let us know.

    Thank you for choosing Car Rental System.   
    """
    send_email(recipient_email,
               "Your Car Rental Invoice", msg, invoice_path)
