import { IContact } from "src/interfaces/contact";

export const getHtmlBody = (value: IContact, appName: string, supportMail: string) => {
  return `
        <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <title>Contact Us - Email Reply</title>
                <style>
                .card {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                }

                .card h1 {
                    text-align: center;
                }

                .card p {
                    margin-bottom: 10px;
                }

                .card table {
                    width: 100%;
                    margin-bottom: 10px;
                }

                .card table td {
                    padding: 5px;
                    border-bottom: 1px solid #ccc;
                }

                .card table td:first-child {
                    font-weight: bold;
                    width: 30%;
                }
                </style>
            </head>
            <body>
                <div class="card">
                <h1>Contact Us - Email Reply</h1>

                <p>Dear ${value.firstName},</p>

                <p>
                    Thank you for contacting us. We appreciate your interest and will respond to your inquiry as
                    soon as possible. Here is a summary of your message:
                </p>

                <table>
                    <tr>
                    <td><strong>Name:</strong></td>
                    <td>${value.firstName} ${value.lastName} </td>
                    </tr>
                    <tr>
                    <td><strong>Email:</strong></td>
                    <td>${value.email}</td>
                    </tr>
                    <tr>
                    <td><strong>Contact:</strong></td>
                    <td>${value.phoneNumber}</td>
                    </tr>
                    <tr>
                    <td><strong>State:</strong></td>
                    <td>${value.state}</td>
                    </tr>
                    <tr>
                    <td><strong>City:</strong></td>
                    <td>${value.city}</td>
                    </tr>
                    <tr>
                    <td><strong>Zip Code:</strong></td>
                    <td>${value.zip}</td>
                    </tr>
                    <tr>
                    <td><strong>Department:</strong></td>
                    <td>${value.department}</td>
                    </tr>
                    <tr>
                    <td><strong>Message:</strong></td>
                    <td><p>${value.message}</p></td>
                    </tr>
                </table>

                <p>
                    We aim to reply within 24-48 hours, although it may take longer during busy periods. Please
                    be assured that your inquiry is important to us, and we will do our best to provide a timely
                    response.
                </p>

                <p>
                    Thank you once again for reaching out to us. If you have any further questions or require
                    immediate assistance, please feel free to contact us at [${supportMail}].
                </p>

                <p>Best regards,</p>
                <p>${appName}</p>
                </div>
            </body>
            </html>
    `;
};
