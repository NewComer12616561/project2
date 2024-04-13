import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";

export function MenuItem(menuItem){
        const {image,name,description,basePrice,
            sizes,extraIngredientPrices,
            } =menuItem
        const {addToCart} = useContext(CartContext);
        const [showPopup, setShowPopup] =useState(false);

    function handleAddToCartButtonClick(){
        if(sizes.length === 0 && extraIngredientPrices.length === 0){
            addToCart(menuItem);
            toast.success('Item added to Cart');
        } else{
            setShowPopup(true);
        }
    }

        // line-clamp-4 <- adjust this number to allow longer or shorter description of said menu item
        
    return(
        <>
        {showPopup && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg max-w-md">
                    <Image 
                    src={image} alt={name} 
                    width={200} height={200}
                    className="mx-auto" />
                    <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                    <p className="text-center text-gray-500 text-sm ">{description}</p>
                    {sizes?.length > 0 &&(
                        <div className="bg-gray-300 rounded-md p-2">
                            <h3>Pick your sizes</h3>
                        </div>
                    ) }
                </div>
            </div>
        )}
        <MenuItemTile 
        onAddToCart={handleAddToCartButtonClick} 
        {...menuItem} />
    </>
    );
    
}