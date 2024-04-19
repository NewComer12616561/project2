import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {MenuItem} from "@/models/MenuItem";
import {Order} from "@/models/Order";
const stripe = require('string')(process.env.STRIPE_SK);

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);

    const {cartPoducts, address}= await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartPoducts,
        paid: false,
    });

    const stripeLineItems = [];
    for(const cartProduct of cartPoducts){
       
        const productInfo = await MenuItem.findById(cartProduct._id);

        let productPrice = productInfo.basePrice; 
        if(cartPoduct.size){
            productInfo.sizes.
            find(size => size._id.toString() === cartPoduct.size._id.toString());
            productPrice += size.price;
        }
        if(cartPoduct.extras?.length>0){
            for(const cartProductExtraThing of cartProduct.size._id){
                const extraThingInfo = productInfo.extraIngredientPrices
                .find(extra => extra._id.toString() === extraThingInfo._id.toString());
                productPrice += extraThingInfo.price; 
            }
        }


        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency:'USD',
                product_data:{
                    name: productName,
            }, 
            unit_amount: productPrice * 100,
            },
        })
    }
    console.log({stripeLineItems});
    return Response.json(null);

/*
const stripeSession =await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata:{orderId: orderDoc._id},
    shipping_option:[
        {
            shipping_rate_data: {
                display_name :'Delivery fee',
                type:'fixed_amount',
                fixed_amount: {amount: 500, currency:'USD'},

            },
        }
    ]
}); */ 
}