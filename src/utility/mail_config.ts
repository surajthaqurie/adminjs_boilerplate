import sgMail from "@sendgrid/mail";
import client from "@sendgrid/client";
import { IMailData, IMailSender } from "src/interfaces";

const mailSender = async (personalizations: any): Promise<IMailSender<sgMail.ClientResponse>> => {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;
    const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || null;

    if (!SENDGRID_API_KEY) {
      return {
        success: false,
        message: "Sendgrid API key not set"
      };
    }

    if (!SENDGRID_SENDER_EMAIL) {
      return {
        success: false,
        message: "Sendgrid sender email address not set"
      };
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const mail = {
      from: `noreply@${SENDGRID_SENDER_EMAIL}`,
      ...personalizations
    };

    const mail_response = await sgMail.send(mail, true);
    return {
      success: true,
      message: "Mail sent successfully",
      content: mail_response[0]
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message
    };
  }
};

export const sendSingleMail = async (mail_data: IMailData): Promise<IMailSender<sgMail.ClientResponse>> => {
  let bccEmails: { email: string }[] = [];
  let toEmail: { email: string }[] = [];

  if (Array.isArray(mail_data.email)) {
    mail_data.email.forEach((email: string, index: number) => {
      if (index === 0) {
        toEmail.push({ email });
      }
      if (index !== 0) {
        bccEmails.push({ email });
      }
    });
  } else {
    toEmail.push({ email: mail_data.email });
  }

  const mail = {
    personalizations: [
      {
        to: toEmail,
        ...(bccEmails.length && { bcc: bccEmails })
      }
    ],
    subject: mail_data.title,
    html: mail_data.body
  };

  return await mailSender(mail);
};

export const getEmailTemplate = async (): Promise<any> => {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;
    if (!SENDGRID_API_KEY) {
      return {
        success: false,
        msg: "Sendgrid API key not set"
      };
    }

    client.setApiKey(SENDGRID_API_KEY);

    const queryParams = {
      generations: "dynamic",
      page_size: 20
    };

    const mail_request = {
      url: `/v3/templates`,
      method: "GET",
      qs: queryParams
    };

    const [response]: any = await client.request(mail_request as any);

    return {
      success: true,
      templates: response.body.result
    };
  } catch (err: any) {
    return {
      success: false,
      msg: err.message
    };
  }
};

export const getTemplateName = async (templateId: string): Promise<any> => {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;
    if (!SENDGRID_API_KEY) {
      return {
        success: false,
        msg: "Sendgrid API key not set"
      };
    }

    client.setApiKey(SENDGRID_API_KEY);

    const mail_request = {
      url: `/v3/templates/${templateId}`,
      method: "GET"
    };

    const [Response] = await client.request(mail_request as any);

    return {
      success: true,
      template: Response.body
    };
  } catch (err: any) {
    return {
      success: false,
      msg: err.message
    };
  }
};
