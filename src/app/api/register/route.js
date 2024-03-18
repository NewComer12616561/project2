
import mongoose from "mongoose";

import {User} from "/src/models/User.js";

export async function POST(req){
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL).catch(err => {
        console.error(err)
    })
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}