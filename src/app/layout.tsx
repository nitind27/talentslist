import type { Metadata } from "next";
import "../_metronic/assets/sass/style.react.scss";
import "../_metronic/assets/fonticon/fonticon.css";
import "../_metronic/assets/keenicons/duotone/style.css";
import "../_metronic/assets/keenicons/outline/style.css";
import "../_metronic/assets/keenicons/solid/style.css";
import "../_metronic/assets/sass/style.scss";
import "../_metronic/assets/sass/custom/main.module.scss";
import "../_metronic/assets/sass/custom/common.scss";
import "react-toastify/dist/ReactToastify.css";
import { ThemeModeProvider } from "@/_metronic/partials";
import ProfileImageProvider from "@/components/profile/lists/profile/ProfileImage.tsx/ProfileImageProvider";

export const metadata: Metadata = {
  title: "Talentslist",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Suspense fallback={<LayoutSplashScreen />}>
            <LayoutProvider>
              
                <AuthInit>
                  <MasterLayout>
                  <AuthProvider>
                   <ToastContainer /> */}

        <ThemeModeProvider>
          <ProfileImageProvider>{children}</ProfileImageProvider>
        </ThemeModeProvider>
        {/* </AuthProvider>
                    </MasterLayout>
                  <MasterInit />
                </AuthInit>
              </ThemeModeProvider>
            </LayoutProvider>
        </Suspense> */}
      </body>
    </html>
  );
}