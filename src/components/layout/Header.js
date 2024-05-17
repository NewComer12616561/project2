'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
  const session = useSession();

  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  const { cartProducts } = useContext(CartContext);

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect to login or homepage after logout
      router.push('/login'); // Replace with your desired redirection route
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error gracefully, e.g., display an error message
    }
  };

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 semibold">
        <Link className="text-primary font-semibold " href="/">
          FOOD STORE
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>

      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link className="whitespace-nowrap" href="/profile">
              Hello, {userName}
            </Link>
            <button onClick={handleLogout} className="bg-primary rounded-full text-red px-8 py-2">
              Logout
            </button>
          </>
        )}

        {status === 'unauthenticated' && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register" className="bg-primary rounded-full text-red px-8 py-2">
              Register
            </Link>
          </>
        )}

        <Link href="/cart" className="relative">
          <ShoppingCart />
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
