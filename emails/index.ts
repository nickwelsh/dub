import { nanoid } from "#/lib/utils";
import { ReactElement, JSXElementConstructor } from "react";
import { Resend } from "resend";
import {PUBLIC_ROOT_DOMAIN, RESEND_EMAILS} from '#/lib/constants'

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  email,
  subject,
  react,
  marketing,
  test,
}: {
  email: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  test?: boolean;
}) => {
  return resend.emails.send({
    from: marketing
      ? `Steven from Dub <${RESEND_EMAILS.marketing}>`
      : `Dub <${RESEND_EMAILS.system}>`,
    to: test ? "delivered@resend.dev" : email,
    subject,
    react,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
};
