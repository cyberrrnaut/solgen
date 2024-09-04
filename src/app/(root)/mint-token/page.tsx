"use client";

import Appbar from "@/components/Appbar";
import { Mint } from "@/components/Mint";
import ToggleBar from "@/components/ToggleBar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Link from 'next/link';

export default function Page() {

    const [address, setAddress] = useState("");
    const { publicKey } = useWallet();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Appbar />
                  
            <div className="flex flex-col items-center justify-center p-4">
              
                {/* Responsive container for the address display */}
                <div className="flex  flex-col items-center justify-center rounded-lg  h-auto w-full max-w-md mx-auto ">
                
                <ToggleBar  />
   
                
                {publicKey ? (
                        <div className="flex mt-7 flex-col items-center justify-center text-xl p-14 sm:text-2xl md:text-3xl lg:text-4xl shadow-lg p-4 rounded-3xl bg-slate-950  shadow-lg w-[560px] cursor-pointer ">
                             Your Solana address: <br />
                           <div className="hover:text-slate-400 text-sm p-4 max-w-[500px] break-words">
                         
                           <a href={`https://explorer.solana.com/address/${publicKey.toString()}`} target="_blank" rel="noopener noreferrer">
                           {publicKey.toString()}

                           </a>
                        
                           </div>
                             
                        <Mint/>
                        </div>
                        
                    ) : (
                        <div className="text-2xl mt-10 ">
                        Please connect your wallet.
                        </div>

                        
                    )}


                </div>
            </div>
        </div>
    );
}
