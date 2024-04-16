import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import FlyingButton from "react-flying-item"

export function MenuItem(menuItem){
        const {image,name,description,basePrice,
            sizes,extraIngredientPrices,
            } =menuItem
        const [selectedSize, setSelectedSize] = 
        useState(sizes?.[0] || null);
        const [selectedExtras, setSelectedExtras] = useState([]);
        const {addToCart} = useContext(CartContext);
        const [showPopup, setShowPopup] =useState(false);
        

    async function handleAddToCartButtonClick(){
        
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        
        if(hasOptions && !showPopup){
            
            setShowPopup(true);
            return;
        }

            addToCart(menuItem, selectedSize, selectedExtras);
            await new Promise(resolve => setTimeout(resolve, 1000));
           
            setShowPopup(false);
    
           
            
            toast.success('Item added to Cart',{
                position:"top-right",
            });     
            }
    

    function handleExtraThingClick(ev, extraThing){
       const checked = ev.target.checked;
       if(checked){
        setSelectedExtras(prev => [...prev, extraThing]);
       } else{
        setSelectedExtras(prev => {
            return prev.filter(e => e.name !== extraThing.name);
        });
       }
    }
    
    let selectedPrice = basePrice;
    if (selectedSize){
        selectedPrice += selectedSize.price;
    }
    if(selectedExtras?.length > 0){
        for( const extra of selectedExtras){
            selectedPrice += extra.price;
        }
    }

        // line-clamp-4 <- adjust this number to allow longer or shorter description of said menu item
        
    return(
        <>
        {showPopup && (
            <div 
            onClick={() =>setShowPopup(false)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div 
                onClick={ev => ev.stopPropagation()}
                className="my-8 bg-white p-2 rounded-lg max-w-md ">
                    <div className="overflow-y-scroll p-2" 
                    style={{maxHeight:'calc(100vh - 100px)'}}>
                    <Image 
                    src={image} alt={name} 
                    width={200} height={200}
                    className="mx-auto" />
                    <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                    <p className="text-center text-gray-500 text-sm ">{description}</p>
                    {sizes?.length > 0 &&(
                        <div className="bg-gray-300 rounded-md p-2 mb-1">
                            <h3 className="text-center text-gray-300 ">Pick your sizes</h3>
                            {sizes.map(size => (
                                <label className="flex items-center gap-2 block p-4 border">
                                    <input
                                    onClick={()=> setSelectedSize(size)}
                                    checked={selectedSize?.name === size.name} 
                                    type="radio" 
                                    name="size"/> {size.name} ${basePrice + size.price}
                                </label>
                            ))}
                         </div>
                    )}
                            {extraIngredientPrices?.length > 0 &&(
                                 <div className="bg-gray-300 rounded-md p-2 mb-1">
                                 <h3 className="text-center text-gray-300 ">Additional</h3>
                                 {extraIngredientPrices.map(extraThing => (
                                     <label className="flex items-center gap-2 block p-4 border">
                                         <input type="checkbox" 
                                         onClick={ev => handleExtraThingClick(ev, extraThing)}
                                         name={extraThing}/> 
                                         {extraThing.name} ${ extraThing.price}
                                     </label>
                                 ))}
                              </div>
                            )}
                    
                       <FlyingButton 
                       target-top={'5%'} 
                       targetLeft={'95%'}
                       src={image}>
                        <div 
                        onClick={handleAddToCartButtonClick}
                        className="primary sticky bottom-2">
                            Add to cart ${selectedPrice}
                        </div>
                       
                       </FlyingButton>
                       
                       
                       <button className="mt-2"
                       onClick={()=> setShowPopup(false)}>
                        Cancel</button>
                    </div>
                    
                    
                </div>
            </div>
        )}
        <MenuItemTile 
        onAddToCart={handleAddToCartButtonClick} 
        {...menuItem} />
    </>
    );
    
}