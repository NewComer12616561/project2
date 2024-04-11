'use client';
import {UserTabs} from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage(){
    const {loading,data} =useProfile();
    const [user, setUser] =useState(null);
    const {id} = useParams();

    useEffect(() => {
      fetch('/api/profile?_id='+id).then(res => {
        res.json().then(user => {
          setUser(user);
        });
      })
    }, []);

    function handleSaveButtonClick(ev, data){
      ev.preventDefault();
      fetch('/api/profile',{
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({...data,_id:id},)
      })
    }

    
    if(loading){
        return 'Loading users info...'
    }

    if(!data.admin){
        return 'Not an admin'
    }
    
    return (
        <section className="mt-8 mx-auto max-w-2xl ">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
              <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}