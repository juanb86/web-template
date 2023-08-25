import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Inter, DM_Sans } from "next/font/google";
import "~/styles/globals.css";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { env } from "process";

const dmsans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dmsans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const reCaptchaKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <ReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      <SessionProvider session={session}>
        <div className={`${inter.variable} ${dmsans.variable}`}>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ReCaptchaProvider>
  );
};

export default api.withTRPC(MyApp);
