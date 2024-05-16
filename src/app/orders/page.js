'use client';
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data:profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
  }

  

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      
        <div className="mt-8">
          {loadingOrders && <div>Loading Orders...</div>}
          {orders.map(order => (
            <div
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-items-center gap-6"
              key={order._id} // Add a key for better performance
            >
              <div className="grow flex items-center gap-6">
                <div>
                  <div
                    className={`p-2 rounded-md text-white w-24 text-center ${
                      order.paid ? 'bg-green-500' : 'bg-red-400'
                    }`}
                  >
                    {order.paid ? 'Paid' : 'Not Paid'}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500 text-xs">
                      <div>{dbTimeForHuman(order.createdAt)}</div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts?.map(p => p.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center">
                <Link href={"/orders/" + order._id} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      
      
    </section>
  );
}
