"use client";

import Appbar from "@/components/Appbar";
import ToggleBar from "@/components/ToggleBar";
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
   
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchAssociatedTokens = async () => {
      try {

        setLoading(true);
        setTimeout(()=>{console.log("Siuuu");
        },7000)
        setError(null);

        //@ts-ignore
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const tokens = tokenAccounts.value.map((tokenAccount) => {
          const accountInfo = AccountLayout.decode(tokenAccount.account.data);
          return {
            mint: new PublicKey(accountInfo.mint),
            owner: new PublicKey(accountInfo.owner),
            amount: Number(accountInfo.amount),
            decimals: 0, // accountInfo.decimals,
          };
        });

        setTokens(tokens);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAssociatedTokens();
  }, [publicKey]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Appbar />
      
      <div className=" flex flex-col items-center justify-center p-4">
        
        {/* Responsive container for the address display */}
          
          <ToggleBar />
         { publicKey ? (
          <>  
          
     
          <h1 className="text-xl font-semibold mb-4 mt-7 ">Associated Tokens</h1>
            {loading && <Skeleton className="w-[100px] h-[20px] rounded-full" />
            }
            {error && <p>Error: {error}</p>}

            <div id="inner" className="bg-slate-950 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-4 w-full">
              {tokens.map((token, index) => (
                <div  key={index} className="mb-3 p-3 bg-slate-900 rounded-2xl  mt-3">
                  <a href={`https://explorer.solana.com/address/${token.mint.toString()}`} target="_blank" rel="noopener noreferrer">
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer text-blue-600 underline  break-words">
                      {token.mint.toString()}
                    </HoverCardTrigger>
                    <HoverCardContent className="p-4 rounded bg-white shadow-lg">
                      <p><strong>Amount:</strong> {token.amount / 10 ** token.decimals}</p>
                      <p><strong>Decimals:</strong> {token.decimals}</p>
                    </HoverCardContent>
                  </HoverCard>
                    
                    </a>
                  
                </div>
              ))}
            </div>
            </>
         ): <div className="text-2xl mt-10 ">
Please connect your wallet.
</div>
           }
            
          </div>
        </div>
  );
}
