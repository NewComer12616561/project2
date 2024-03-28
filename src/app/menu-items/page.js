'use client';

import { UserTabs } from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import Link from "next/link";

import Right from "@/components/icons/Right";



export default function MenuItemsPage(){

    const{loading,data}= useProfile();


    

    if(loading){
        return 'Loading menu Item info...'
    }

    if(!data.admin){
        return 'Not an admin';
    }


    return(
       <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
                <div className="mt-8">
                    <Link className="button"
                     href={'/menu-items/new'}>
                        <span>Create new menu item</span> <Right/>
                    </Link> 
                </div>
        
       </section>
    );
}