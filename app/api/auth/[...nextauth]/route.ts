import { connectToDb } from "@utils/database";
import { NextApiHandler } from "next";
import NextAut, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAut({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });
        (session.user as any).id = sessionUser?._id.toString();
      }
      return session;
    },
    signIn: async ({ user }) => {
      try {
        // serverless -> lambda -> api -> auth -> [...nextauth].ts
        await connectToDb();
        //   check if a user aleady exists
        const userExists = await User.findOne({ email: user.email });
        //   if not, create a new user
        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.name?.replace(" ", "").toLowerCase(),
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export const GET = handler;
export const POST = handler;
