import { sendEmail } from "@config";
import { APPNAME, getNewDocument, getVerifyTemplate, getWelcomeTemplate } from "@constants";

export const sendEmailVerification  = (email: string) => sendEmail(email, `Please confirm your ${APPNAME} Account`, getVerifyTemplate());

export const sendEmailWelcome = (email: string, name:string) => sendEmail(email, `Welcome to ${APPNAME}`, getWelcomeTemplate(name))

export const sendEmailNewDocument = (email:string, name: string) => sendEmail(email, `${name} has a new ${APPNAME} document available`, getNewDocument(name))