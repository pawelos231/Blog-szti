import React from 'react'
import Link from 'next/link';
const Navbar = () => {
    return ( 
    <nav className='fixed w-full bg-stone-700'>
        <ul className='flex justify-end gap-12 p-2 text-white mr-4'>
            <li >
                <Link href="/">
                    <a>Główna</a>
                </Link></li>
            <li>Wyszukaj</li>
        </ul>
    </nav> );
}
 
export default Navbar;