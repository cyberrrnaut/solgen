"use client";
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Form from '@/components/Form';
import Demo from '@/components/Demo'

export default function Home() {
  const { publicKey } = useWallet(); // Get publicKey from useWallet hook

  return (
    <div>
      <WalletMultiButton />

     
      {publicKey ? (
        <div>
          <p>Your public key is:</p>
          <p>{publicKey.toString()}</p> 
        </div>
      ) : (
        <p>No wallet connected</p>
      )}

      {/* <Form/> */}
      <Demo/>

    </div>
  );
}
