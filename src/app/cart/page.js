'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import CartProduct from "@/components/menu/CartProduct";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";


export default function CartPage(){
    const {cartProducts, removeCartProducts} = useContext(CartContext);
    const {data:profileData} =useProfile();
    const [ address,setAddress] =useState({});

    useEffect(()=> {
        if(typeof window !== 'undefined'){
            if(window.location.href.includes('canceled=1')){
                toast.error('Payment failed :/')
            }
        }
    }, []);



  useEffect(() => {
    if (profileData?.city) {
      const {phone, streetAddress, city, postalCode, country} = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

    let foodtotal =0;
    for(const p of cartProducts){
        console.log(p);
        foodtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value){
        setAddress(prevAddress => ({...prevAddress,[propName]:value})
        );
    }

    async function proceedToCheckout(ev){
        ev.preventDefault();
        //Grab address and cart items 
        const promise = new Promise((resolve,reject)=>{
            fetch('/api/checkout',{
                method: 'POST',
                headers: {'Content-Type':'appliction/json'},
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
    
            }). then(async(response) =>{
                if(response.ok){
                    resolve();
                    window.location  = await response.json();
                }
                else{
                    reject();
                }
               
            }); 
        });
        toast.promise(promise,{
            loading:'Preparing your order',
            success:'Redirecting to payment',
            error:'Something went wrong...'
        })

    }
  
    if(cartProducts?.length === 0 ){
        return (
            <section className="mt-8">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your cart is empty😂</p>
            </section>
        )
    }


    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className=" mt-8 grid gap-8 grid-cols-2">
                <div>
                   {cartProducts?.length === 0 &&(
                    <div>No items in your cart</div>
                   )}
                   {cartProducts?.length > 0 && cartProducts.map(
                    (product, index) =>(
                   <CartProduct 
                   product={product}
                   key={index}
                   index={index}
                   onRemove={removeCartProducts}
                   />
                   ))}
                
                   <div className="py-2 pr-16 flex justify-end items-center">
                    <div className="text-gray-500">
                        Food Price:<br />
                        Delivery: <br />
                        Total: 
                    </div>  
                    <div className=" font-semibold pl-2 text-right">
                        ${foodtotal} <br />
                        $5<br />
                        ${foodtotal + 5} <br/>
                    </div>
                   </div>

                  

                </div>  


                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                       
                        <AddressInputs 
                            addressProps ={address}
                            setAddressProp ={ handleAddressChange}/>
                         <button type="submit">Pay ${foodtotal+5}</button>
                    </form>
                    
                </div> 
            </div>
            
        </section>
    )
}