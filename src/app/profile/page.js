'use client';

import { useSession } from "next-auth/react";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";
import { UserTabs } from "../../components/layout/UserTabs";

export default function ProfilePage(){
    const session = useSession();
   
    const[userName, setUserName] =useState( '');
    const[image, setImage] =useState('');
    const[phone, setPhone] =useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const[postalCode, setPostalCode] =useState('');
    const[city, setCity] =useState('');
    const[country, setCountry] =useState('');
    const[isAdmin, setIsAdmin]=useState(false);
    const[profileFetchedd, setProfileFetched] = useState(false);
    const {status}= session;
    
    useEffect(()=>{
        if(status==='authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response =>{
                response.json().then(data =>{
                    setPhone(data.phone);
                  //something went wrong with street address ->Typo on models/User ->Missing d char in address[fixed]
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                    
                });
            })
        }
    }, [session ,status] );

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile/', {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    name:userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country
                }),
        });
        if(response.ok) 
         resolve()
        else 
         reject();
        });
        toast.promise(
            
            savingPromise, {
            loading:'Saving...',
            success:'Profile saved',
            error:'Error',
        });
    }
    //Primarly Picture
    async function handleFileChange(ev){
       const files = ev.target.files;
       if(files?.length === 1 ){
        const data = new FormData;
        data.set('file', files[0]);

        const uploadPromise =  fetch('/api/upload',{
                method:'POST',
                body: data,
            }).then (response=> {
                if (response.ok) {
                    return response.json().then(link => {
                    setImage(link);
                    })
                }
                throw new Error('Something went wrong');
            });            
        
       await toast.promise(uploadPromise,{ 
        loading:'Uploading...',
        success:'Upload saved',
        error:'Upload Error',
    });       
        
       }
    }
    

    if(status === 'loading' || !profileFetchedd){
        return 'Loading....';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
        <div className="max-w-md mx-auto mt-8 ">
            <div className="flex gap-4 ">
                <div>
                   
                <div className=" p-2 rounded-lg relative max-w-[120px]">
                    {image &&(
                        <Image className="rounded-lg w-full h-full mb-1" src={image} width={259} height={250}
                        alt={'avatar'} />
                    )}
                    
                <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className=" block border border-gray-300  
                rounded-lg p-2 text-center cursor-pointer">Edit Image</span>
                </label>   
                
                
                </div>
                </div>
                <form className="grow" onSubmit={handleProfileInfoUpdate}>
                    <label>First and last name</label>
                <input type="text" placeholder="Input First and Last name"
                value={userName} onChange={ev => setUserName(ev.target.value)}/>
                    <label>Email</label>
                <input type="email" disabled={true} value={session.data.user.email}
                placeholder={'email'}/>
                   <label>Phone</label>
                <input type ="tel" placeholder="Phone number"
                value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <label>Street address</label>
                <input type ="text" placeholder="Street address"
                value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                
                <div className="flex gap-2">
                    <div>
                    <label>Postal code</label>
                    <input type ="text" placeholder="Postal code"
                    value={postalCode} onChange={ev => setPostalCode(ev.target.value)} /> 
                    </div>
                    <div>
                    <label>City</label>
                    <input  type ="text" placeholder="City"
                    value={city} onChange={ev => setCity(ev.target.value)}/>
                    </div>
                </div>
                <label>Country</label>
                <input type ="text" placeholder="Country"
                value={country} onChange={ev => setCountry(ev.target.value)}/>

                <button type ="submit">Save</button> 
                </form>
                
            </div>
       
        </div>
        
        </section>
    )
}