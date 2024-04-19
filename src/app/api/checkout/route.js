import mongoose from "mongoose";
const stripe = require('string')(process.env.STRIPE_SK);

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);

    const {cartPoducts, address}= await req.json();

/* 
const stripeSession =await stripe.checkout.sessions.create({
    line_items: [],
    mode: 'payment',
    customer_email: '',
    success_url: '',
    cancel_url: '',
    metadata:{orderId:null},
    shipping_option:[
        {
            shipping_rate_data: {
                display_name :'Delivery fee',
                type:'fixed_amount',
                fixed_amount: {amount: 500, currency:'USD'},

            },
        }
    ]
}) */
}