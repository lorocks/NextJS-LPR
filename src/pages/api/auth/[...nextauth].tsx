import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // perform you login logic
        // find out user from db
        if (username !== "plate" || password !== "Plate123$") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          message: "Everything Works",
          id: "1234",
        };
      },
    }),
  ],
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  // }),
  pages: {
    signIn: "/auth/signin",
    // //     // error: '/auth/error',
    // //     // signOut: '/auth/signout'
  },
  //   callbacks: {
  //     jwt(params) {
  //       // update token
  //       if (params.user?.role) {
  //         params.token.role = params.user.role;
  //       }
  //       // return final_token
  //       return params.token;
  //     },
  //   },
};

export default NextAuth(authOptions);
