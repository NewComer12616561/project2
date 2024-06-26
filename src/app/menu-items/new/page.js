'use client';
import { useProfile } from "../../../components/UseProfile";
import { useState } from "react";
import { UserTabs } from "../../../components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Link from "next/link";
import Left from "@/components/icons/Left";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';

export default function NewMenuItemPage(){
    
    
    
    
    const [redirectToItems, setRedirectToItems] = useState(false);
    const{loading, data} = useProfile();
    
    
    async function handleFormSubmit(ev,data){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items',{
                method:'POST',
                body: JSON.stringify(data),
                headers: {'Content-type':'appliation/json'},
        });
        if (response.ok)
        resolve();
        else
        reject();
        });
        await toast.promise(savingPromise,{
            loading:'Saving this tasty item',
            success:'Saved',
            error:'Error',
        });

        setRedirectToItems(true);
    }
  
    if (redirectToItems) {
      return redirect('/menu-items');
    }

    if(loading){
        return 'loading user info...'
    }

    if(!data.admin){
        return 'Not an admin'
    }

    return (
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className="max-w-2xl mx-auto mt-8">
            <Link href={'/menu-items'} className="button">
                <Left/><span>Return to Menu items </span> 
            </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
    );
}