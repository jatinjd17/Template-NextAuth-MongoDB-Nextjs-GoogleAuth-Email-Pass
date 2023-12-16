import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { OAuthUserConfig } from "next-auth/providers/oauth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "", //Ternary Because Typescript showing error
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // return {
        //   id: "324324324",
        //   email: "jatin@gmail.com",
        // };
        // console.log(credentials?.email);
        // console.log(credentials?.password);
        //

        // const loginnn: any = await fetch(
        //   "http://localhost:5000/api/normallogin",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       // You can add additional headers here if needed
        //     },
        //     body: JSON.stringify({
        //       email: credentials?.email,
        //       password: credentials?.password,
        //     }),
        //   }
        // );

        ///////////////////////////////////////////////////////////////
        const loginnn: any = await axios.post(
          "http://localhost:5000/api/normallogin",
          JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              // You can add additional headers here if needed
            },
          }
        );

        // console.log(loginnn.data);
        const { data } = loginnn;
        console.log(data);
        if (data.success) {
          return {
            id: data.id,
            email: data.email,
          };
        }
        /////////////////////////////////////////////////////////////////////////
        // const response = await sql`
        // SELECT * FROM users WHERE email=${credentials?.email}`;
        // const user = response.rows[0];

        // const passwordCorrect = await compare(
        //   credentials?.password || "",
        //   user.password
        // );

        // console.log({ passwordCorrect });

        // if (passwordCorrect) {
        //   return {
        //     id: user.id,
        //     email: user.email,
        //   };
        // }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
