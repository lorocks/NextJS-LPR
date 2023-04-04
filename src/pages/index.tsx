// import Head from "next/head";
// import { useState, useEffect } from "react";
// import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import Link from "next/link";
// import supabaseServer from "../client";

// function Home({ profileList }) {
//   const session = useSession();
//   const supabase = useSupabaseClient();

//   return (
//     <div>
//       <Head>
//         <title>Initial Page</title>
//       </Head>

//       {!session ? (
//         <Auth supabaseClient={supabase} />
//       ) : (
//         <MainPage
//           session={session}
//           profiles={profileList}
//           supabase={supabase}
//         />
//       )}
//     </div>
//   );
// }

// export default Home;

// function MainPage({ session, profiles, supabase }) {
//   // const [loading, setLoading] = useState(true);
//   // const [profiles, setProfiles] = useState([]);

//   // useEffect(() => {
//   //   listProfiles();
//   // }, [session]);

//   // async function listProfiles() {
//   //   try {
//   //     let { data, error, status } = await supabase.from("profiles").select();
//   //     if (error) {
//   //       throw error;
//   //     }
//   //     setProfiles(data);
//   //   } catch (error) {
//   //     alert("Error loading user data!");
//   //     console.log(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   // if (loading) {
//   //   return <h2>Loading...</h2>;
//   // } else {
//   return (
//     <>
//       <div>
//         <div className="flex">
//           <label htmlFor="email">Email</label>
//           <input id="email" type="text" value={session.user.email} disabled />
//         </div>
//         <div>
//           {profiles.map((profile) => {
//             return (
//               <>
//                 <div key={profile.password}>
//                   <Link
//                     href={{
//                       pathname: `/${profile.username}`,
//                       query: {
//                         license: profile.username,
//                         session: session,
//                         supabase: supabase,
//                       },
//                     }}
//                   >
//                     {profile.username}
//                   </Link>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//         <div>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
//             onClick={() => supabase.auth.signOut()}
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
// // }

// export async function getServerSideProps(context) {
//   const { data, error } = await supabaseServer.from("profiles").select();
//   return {
//     props: {
//       profileList: data,
//     },
//   };
// }

// import Head from "next/head";
// import { Auth } from "@supabase/auth-ui-react";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import supabaseServer from "../client";
// import { useRouter } from "next/router";

// function Home() {
//   const session = useSession();
//   const router = useRouter();
//   const email = session?.user.email;

//   function signIn() {
//     router.push("/signin");
//   }

//   if (!session) {
//     return (
//       <div>
//         <Head>
//           <title>Initial Page</title>
//         </Head>
//         <button onClick={signIn}>Sign In</button>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <Head>
//           <title>Initial Page</title>
//         </Head>
//         <p>Logged In as {email}</p>
//         <button onClick={signIn}>Sign In</button>
//       </div>
//     );
//   }
// }

// export default Home;

// import Head from "next/head";
// import { Auth } from "@supabase/auth-ui-react";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
// import supabaseServer from "../client";
// import { useRouter } from "next/router";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import Image from "next/image";
// import Header from "../components/header";
// import Footer from "../components/footer";

// function Home() {
//   const session = useSession();
//   const supabase = useSupabaseClient();
//   const router = useRouter();

//   if (!session) {
//     return (
//       <div className="flex flex-col relative w-screen h-screen">
//         <div className="absolute inset-0">
//           <Image src="/waves3.jpg" alt="background image" fill />
//         </div>
//         <Head>
//           <title>Signin Page</title>
//         </Head>
//         <div className="m-auto relative bg-white w-3/12 shadow-lg rounded-md">
//           <div className="m-4">
//             <Auth
//               supabaseClient={supabase}
//               localization={{
//                 variables: {
//                   sign_in: {
//                     email_label: "Email Address",
//                     password_label: "Password",
//                   },
//                   sign_up: {
//                     link_text: "",
//                   },
//                 },
//               }}
//               appearance={{
//                 theme: ThemeSupa,
//                 variables: {
//                   default: {
//                     fontSizes: {
//                       baseLabelSize: "16px",
//                       baseButtonSize: "16px",
//                     },
//                   },
//                 },
//               }}
//               theme=""
//             />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     router.push("/licenses");
//   }
// }

// export default Home;
