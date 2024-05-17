'use client';
import { UserTabs } from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";


export default function CategoriesPage(){
    const[CategoryName, setCategoryName] =useState('');
    const[categories,setCategories] =useState([]);
    const {loading:profileLoading,data:profileData} = useProfile();
    const [editedCategory, seteditedCategory] = useState(null);

    useEffect(() =>{
        fetchCategories();
        
    },[]);

    function fetchCategories(){
        fetch('api/categories').then(res =>{
            res.json().then(categories =>{
                setCategories(categories);
            });
        });

    }

    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve,reject) =>{
            const data = {name:CategoryName};
            if(editedCategory){
                data._id =editedCategory._id;
            }
            const response = await fetch('api/categories',{
                method: editedCategory? 'PUT' :'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
            });
            setCategoryName('');//to remove previous input in category
            fetchCategories();
            seteditedCategory(null);// to remove previous selected category for update
            if(response.ok) 
            resolve();
            else
            reject();
        });
        toast.promise(creationPromise,{
            loading: editedCategory 
            ? 'Updating caegory...'
            : 'Creating new category...',
            success: editedCategory
            ? 'Category updated'
            :'Category created',
            error:'Error, sorry',

        }); 
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id, {
                method:'DELETE',
            });
            if(response.ok){
                resolve();
            } else {
                    reject();
                }            
        });

         toast.promise(promise,{
            loading:'Deleting category...',
            success:'Category deleted',
            error:'Error',
         });

         fetchCategories();
    }
    
    if(profileLoading){
        return 'Loading categories info...';
    }

    if(!profileData.admin){
        return 'Not an admin'
    }

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                    <label>
                        {editedCategory? 'Update category':'New category name'}
                        {editedCategory &&(
                        <>: <b>{editedCategory.name}</b>
                        </>
                        )}
                    </label>
                    <input type="text" 
                    value={CategoryName}
                    onChange={ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2 flex gap-2">
                    <button className="border border-primary"type="submit">
                        {editedCategory? 'Update':'Create'}
                    </button>
                    
                    <button type="button"
                    onClick={()=> {// Handling Cancel button inside Categories
                        seteditedCategory(null);
                        setCategoryName('')}}>
                        Cancel
                    </button>
                    
                    </div>
                </div>
            </form>
            <ul>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing category:</h2>
                {categories?.length >0 && categories.map(c =>(
                    <div 
                    className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1
                     items-center mb-1">            
                    <div className=" grow ">{c.name}</div>
                    <div className="flex gap-1">
                    <button type="button"
                        onClick={() => {
                        seteditedCategory(c);
                        setCategoryName(c.name);}
                                    }>Edit</button> 
                   <DeleteButton 
                   label="Delete" 
                   onDelete={ () => handleDeleteClick(c._id)}></DeleteButton>
                    </div>    
                    </div>

                ))}
            </div>
            </ul>
        </section>
    );
}