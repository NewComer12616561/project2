import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";

export default function cartProduct({product,index, onRemove}){
    return(
        
            <div className="flex items-center gap-4  
            border-b py-4">
                <div className="w-24">
                    <Image src={product.image} alt={''}
                    width={240} height={240} />
                </div>
                <div className="grow">
                <h3 className="font-semibold">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="txt-sm ">
                        Size: <span>{product.size.name}</span> </div>
                )}
                {product.extras?.length > 0 &&(
                    <div className="text-sm text-gray-500">
                        {product.extras.map(extra =>(
                            <div>{extra.name}+ ${extra.price}</div>
                        ))}
                    </div>
                )}
                </div>
               <div className="text-lg font-semibold">
                    ${cartProductPrice(product)}
                </div>
                {!!onRemove &&(
                    <div className="ml-2">
                    <button
                    onClick={()=> onRemove(index)}
                    type="button"
                    className="p-2">
                        <Trash />
                    </button>
                </div>
                )}
                
            </div>
    )
}