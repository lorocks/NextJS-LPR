import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

function SignIn({ user }) {
  const router = useRouter();
  useEffect(() => {
    router.push("/signin");
  }, []);
  return <h2>You are Signed In</h2>;
}

export default SignIn;

export async function getServerSideProps(context) {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
}
