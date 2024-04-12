'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";



export default function UserForm({user,onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '')
    const [admin, setAdmin] = useState(user?.admin || false)
    const {data:loggedInUserData} = useProfile();
    
    return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, phone, admin,
            streetAddress, city, country, postalCode,
          })
        }
      >
        <label>
          First and last name
        </label>
        <input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={'email'}
        />
                   <label>Phone</label>
                <input type ="tel" placeholder="Phone number"
                value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <label>Street address</label>
                <input type ="text" placeholder="Street address"
                value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                
                <div className="grid grid-cols-2 gap-2">
                    <div >
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
                {loggedInUserData.admin &&(
                  <div>
                  <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                  <input id="adminCb" type="checkbox" className=""
                  value={'1'} checked={admin}
                  onClick={ev =>setAdmin(ev.target.checked)}/>
                  <span>Admin authority</span>
                  </label>
                </div>
                )}     
                <button type ="submit">Save</button> 
                </form>
                
            </div>
       
    )
}