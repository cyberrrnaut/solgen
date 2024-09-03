import React from 'react'
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';


export default function Appbar() {
    const { publicKey } = useWallet(); // Get publicKey from useWallet hook

  return (
    <div className=' bg-slate-950 p-3 flex justify-between'>
<div className='text-slate-400 text-2xl'>
    Solgen
</div>



<div>
{/* {publicKey ? (
        <div>
          <p>Your public key is:</p>
          <p className='text-white'>{publicKey.toString()}</p> 
        </div>
      ) : (
        <p className='text-white'>No wallet connected</p>
      )} */}

<WalletMultiButton />
</div>

 

 

    </div>
  )
}
