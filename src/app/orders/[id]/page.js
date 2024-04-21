'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs"
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage(){
    const {clearCart} =useContext(CartContext);
    const {id} =useParams();
    const [order, setOrder] = useState();

    useEffect(()=> {
        if(typeof window.console !== "undefined"){
            if(window.location.href.includes('clear-cart=1')){
                clearCart();
            }
        }

        if(id){
            fetch('/api/orders?_id='+id).then(res => {
                res.json().then(orderData => {
                  setOrder(orderData);
                });
            })
        }
    },[]);

    let foodtotal =0; 
    if(order?.cartProducts){
        for(const product of order?.cartProducts){
            foodtotal+=cartProductPrice(product);
        
    }
}


    return(
        <section className="max-w-2xl mx-auto text-center mt-8">
            <div className="text-center">
            <SectionHeaders  mainHeader="Your order"/>
            <div className="my-4">
                <p>Thank for ordering</p>
                <p>We will call you when we arrived</p>
            </div> 
            </div>
            
             {order &&(
                <div className="grid grid-cols-2 gap-16">
                    <div className="mt-4 mb-8">
                        {order.cartProducts.map(product =>(
                        <CartProduct product={product} />
                    ))}
                        <div className="text-right py-2 text-gray-500">
                        
                            Food Price: <span className="text-black font-bold inline-block 2 w-8">
                                {foodtotal}</span><br/>
                            
                            Delivery: <span className="text-black font-bold inline-block 2 w-8">
                                $5</span><br/>

                            Total: <span className="text-black font-bold inline-block 2 w-8">
                                ${foodtotal+5}</span><br/>
                        </div>
                    
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg" >
                        <AddressInputs
                        disabled = {true}
                        addressProps={order} />
                    </div>
                </div>
             )}
           
        </section>
    )
}