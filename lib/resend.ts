import { Resend } from 'resend';

export const sendVerificationRequest = async (
  params: any,
) => {
  let { identifier: email, url, provider: { from } } = params;
  try {
    const resend = new Resend( process.env.RESEND_API_KEY! );
    await resend.emails.send({
      from: from,
      to: email,
      subject: 'Login Link to your Account',
      html: '<p>Click the magic link below to sign in to your account:</p>\
             <p><a href="' + url + '"><b>Sign in</b></a></p>',
    });
  } catch (error) {
    console.log({ error });
  }
}