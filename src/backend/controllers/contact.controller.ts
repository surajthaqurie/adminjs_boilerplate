import { NextFunction, Request, Response } from "express";

import { AppError, catchAsync } from "src/utility";
import { contactValidation } from "../validations/contact.validation";
import { getHtmlBody } from "src/utility/mail_body";
import { sendSingleMail } from "src/utility/mail_config";
import { IMailData } from "src/interfaces";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = contactValidation(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const mail_data: IMailData = {
    email: [
      ("support@" + process.env.SENDGRID_SENDER_EMAIL) as string,
      value.email
    ],
    title: "Contact Us",
    body: getHtmlBody(
      value,
      process.env.APP_NAME as string,
      ("support@" + process.env.SENDGRID_SENDER_EMAIL) as string
    )
  };

  const mail_response = await sendSingleMail(mail_data);
  if (!mail_response.success) {
    return next(
      new AppError(mail_response.message || "Unable to send mail", 400)
    );
  }

  return res.json({
    success: true,
    message: "Successfully sent on the mail of contact us"
  });
  /* ************** Swagger Documentation  **************
  #swagger.tags = ['Contact']
  #swagger.description = 'Api for sending message.'
  #swagger.summary = 'Send Message.'
  #swagger.operationId = 'postMessage'
  #swagger.requestBody = {
    required: true,
      "@content": {
        "application/json": {
          schema: { 
          type: "object",
          properties: {
            firstName : {
              type: "string",
              required: true,
              example: "John"
            },
            lastName : {
              type: "string",
              required: true,
              example: "Doe"
            },
            email: {
              type: "string",
              required: true,
              example: "test@gmail.com"
            },
            state : {
              type: "string",
              example: "Las Vegas"
            },
            city : {
              type: "string",
              example: "Navada"
            },
            zip: {
              type: "number",
              example: "33455"
            },
            phoneNumber: {
              type: "string",
              example: "6235272562"
            },
            department: {
              type: "string",
              example: "Department One"
            },
            message : {
              type: "string",
              example: "Hello message"
            },
          },
          required: ["email", "fullName", "phoneNumber", "message"]
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: 'Successfully post the message!!!',
    schema: { $ref: '#/definitions/Contact' }
  }
  ************** Swagger Documentation  ************** */
};

export const contact_controller = {
  sendMessage: catchAsync(sendMessage)
};
