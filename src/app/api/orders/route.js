import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import mongoose from "mongoose";
import {UserInfo} from "@/models/UserInfo"
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userEmail = session?.user?.email;

   

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    
    if (_id) {
      return Response.json(await Order.findById(_id));
    } else {
      const foundUser = await UserInfo.findOne({ email: user.email });
      if (foundUser?.admin) {
        return Response.json(await Order.find()); // Admins get all orders
      } 
      if (userEmail) {
        return Response.json( await Order.find({userEmail}) );
      }
    }
  }