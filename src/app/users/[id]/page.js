'use client';
import {UserTabs} from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";

export default function EditUserPage(){
    const {loading,data} =useProfile();
    const [user, setUser] =useState(null);
    const {id} = useParams();

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/profile?_id=${id}`);
        const user = await response.json();
        setUser(user);
      };
      fetchData();
    }, [id]); // Run only when id changes

    async function handleSaveButtonClick(ev, data){
      ev.preventDefault();
      const promise = new Promise(async(resolve,reject)=> {
        const res = await fetch('/api/profile',{
          method:'PUT',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({...data,_id:id},)
        });

      if(res.ok)
        resolve();
      else 
        reject();
      });

      await toast.promise(promise, {
        loading:'Saving user...',
        success:'User saved',
        error:'An error has occured',

      })
      
    }

    
    if(loading || !user){
        return 'Loading users info...'
    }

    if(!data.admin){
        return 'Not an admin'
    }
    
    return (
        <section className="mt-8 mx-auto max-w-2xl ">
            <UserTabs isAdmin={true} />
            <Link href={'/users'} className="button mt-8">
                <Left/><span>Return to Users </span> 
            </Link>
            <div className="mt-8">
              <UserForm user={user} onSave={handleSaveButtonClick}/>
              
            </div>
        </section>
    )
}