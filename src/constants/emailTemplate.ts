import { config } from "@config";
import { APPNAME } from "./appName";

export const getVerifyTemplate = (): string => {
  return `
  <h1>Almost done! 🤏</h1>
  <p>Complete signing up by clicking “Verify My Account”.</p>
  <a href='${config.app.verifyAccountUrl}'>Verify My Account</a>
  <span>The verification link is valid for up to 1 day.</span>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
};

export const getWelcomeTemplate = (name: string): string => {
  return `
  <h1>Welcome 👋</h1>
  <p>Hi ${name}, welcome to <b>${APPNAME}</b>.</br>
  This message is to confirm your registration in our application.</p>
  <a href='${config.app.loginAccountUrl}'>Login</a>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
}

export const getNewDocument = (name:string) => {
  return `
  <h1>Hi ${name}, you have a new document to consent</h1>
  <p>We inform you that you have a new document pending to sign a new document in the <b>${APPNAME}</b></p>
  <a href='${config.app.signDocumentUrl}'>Login to the System</a>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
}