import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ToggleBar() {
  const pathname = usePathname();


  return (

  
    <div className='flex rounded-full p-1 justify-between w-[250px] bg-slate-800'>
     
     <Link 
  href="/tokens"
  className={pathname === '/mint-token' 
    ?   'bg-slate-800 text-purple-950  rounded-full p-4 text-slate-300'
    : 'bg-purple-300 text-purple-950  rounded-full p-4' 
  }
>
  Your tokens 
</Link>


<Link 
  href="/mint-token"
  className={pathname === '/mint-token' 
    ?  'bg-purple-300 text-purple-950  rounded-full p-4' 
    : 'bg-slate-800 text-purple-950  rounded-full p-4 text-slate-300'
  }
>
  Mint Token 
</Link>

     
  
    </div>
  )
}
