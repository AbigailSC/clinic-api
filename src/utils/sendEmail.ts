import { sendEmail } from "@config";
import { getNewDocument, getVerifyTemplate, getWelcomeTemplate } from "@constants";

export const sendEmailVerification  = (email: string) => sendEmail(email, "Please confirm your Clinic App Account", getVerifyTemplate());

export const sendEmailWelcome = (email: string, name:string) => sendEmail(email, "Welcome to Clinic App", getWelcomeTemplate(name))

export const sendEmailNewDocument = (email:string, name: string) => sendEmail(email, `${name} has a new Clinic App document available`, getNewDocument(name))