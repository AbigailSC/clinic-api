export const getActivationTemplate = (refreshToken: string): string => {
  return `
  <h1>Almost done! 🤏</h1>
  <p>Complete signing up by clicking “Verify My Account”.</p>
  <a href='${refreshToken}'>Verify My Account</a>
  <span>The verification link is valid for up to 1 day.</span>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
};

export const getWelcomeTemplate = (name: string, urlLogin: string): string => {
  return `
  <h1>Welcome 👋</h1>
  <p>Hi ${name}, welcome to <b>Clinic App</b>.</br>
  This message is to confirm your registration in our application.</p>
  <a href='${urlLogin}'>Login</a>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
}

export const getNewDocument = (urlToSignDocument: string, name:string) => {
  return `
  <h1>Hi ${name}, you have a new document to consent</h1>
  <p>We inform you that you have a new document pending to sign a new document in the <b>Clinic App</b></p>
  <a href='${urlToSignDocument}'>Login to the System</a>
  <span>Greetings.</br>
  Tonotos Team</span>
  `;
}