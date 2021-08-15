import sendgridMail, { MailDataRequired } from "@sendgrid/mail";
import { EmailSpec } from "Types/EmailSpec";
import { config } from "./Config";

const getMailDataFromEmailSpec = (emailSpec: EmailSpec) => {
  const { from, html, subject, to } = emailSpec;
  const mailData: MailDataRequired = { from, html, subject, to };
  return mailData;
};

export const configureEmail = () => {
  sendgridMail.setApiKey(config.sendgridApiKey);
};

export const sendEmail = async (emailSpec: EmailSpec | EmailSpec[]) => {
  if (Array.isArray(emailSpec)) {
    await sendgridMail.send(
      emailSpec.map((spec) => getMailDataFromEmailSpec(spec))
    );
  } else {
    await sendgridMail.send(getMailDataFromEmailSpec(emailSpec));
  }
};
