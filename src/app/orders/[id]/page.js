'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";

export default function OrderPage(){
    const {clearCart} =useContext(CartContext)
    useEffect(()=> {
        if(typeof window.console !== "undefined"){
            if(window.location.href.includes('clear-cart=1')){
                clearCart();
            }
        }
    })
    return(
        <section className="max-w-2xl mx-autp text-center mt-8">
            <SectionHeaders  mainHeader="Your order"/>
            <div className="my-4">
                <p>Thank for ordering</p>
                <p>We will call you when we arrived</p>
            </div>    
        </section>
    )
}