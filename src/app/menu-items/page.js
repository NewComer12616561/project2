'use client';
import { UserTabs} from "../../components/layout/UserTabs"
import { useProfile } from "../../components/UseProfile"
import EditableImage from "../../components/layout/EditableImage";
import { useState } from "react";

export default function MenuItemsPage(){


    const [image, setImage] = useState('');
    const{loading, data} = useProfile();
    
    if(loading){
        return 'Loading menu Item info...'
    }

    if(!data.admin){
        return 'Not an admin';
    }


    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <form className="mt-8 max-w-md mx-auto">
                <div 
                className="grid items-start gap-2 "
                style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div >
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Menu item name</label>
                        <input type="text"/>
                        <label>Description</label>
                        <input type="text"/>
                        <label>Base price</label>
                        <input type="text"/>
                        <button type ="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}