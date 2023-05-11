import Head from "next/head";
import { Auth } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Image from "next/image";
import styles from "../styles/Home.module.css";

function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex relative w-screen h-screen bg-zinc-400">
        <div className="absolute inset-0 h-full">
          <Image
            src="/sunroad.jpg"
            alt="background image"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <Head>
          <title>Signin Page</title>
        </Head>
        <div className="m-auto relative bg-white w-3/12 sm:w-full shadow-lg rounded-md">
          <div className="m-4">
            <Auth
              supabaseClient={supabase}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email Address",
                    password_label: "Password",
                  },
                  sign_up: {
                    link_text: "",
                  },
                },
              }}
              appearance={{
                theme: ThemeSupa,

                style: {
                  button: {
                    background: "rgb(251, 146, 60)",
                    border: "rgb(251, 146, 60)",
                    color: "white",
                  },
                },
              }}
              // providers={["google", "facebook", "twitter"]}
            />
          </div>
        </div>
      </div>
    );
  } else {
    router.push("/licenses");
  }
}

export default Home;
