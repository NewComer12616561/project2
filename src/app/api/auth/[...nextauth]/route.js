import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "/src/libs/mongoConnect"

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session:{
    strategy:"jwt",
  }, 
  providers: [
    
    
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

    CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "😂" },
          password: { label: "Password", type: "password", placeholder: "😊" },
        },
        async authorize(credentials, req) {
          
          const email = credentials?.email;
          const password = credentials?.password;
          
          mongoose.connect(process.env.MONGO_URL); // MONGO_URL typo
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);

          

          if(passwordOk){
            return user;
          }
          
          return null
        }
      })


  ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }