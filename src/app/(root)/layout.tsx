"use client"  // to make root a client component we create a sub layout as primary layout cant be a client component


import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const network = WalletAdapterNetwork.Mainnet;
    
    // You can also provide a custom RPC endpoint.
    const endpoint = "https://solana-mainnet.g.alchemy.com/v2/UIw0HFD_vv2S3gV4a1vpHypPbfQb97FC";
    

    const wallets = useMemo(
        () => [],
        [network]
    );
    
  
  return (
    <div className='bg-slate-900 '>
          <ConnectionProvider endpoint={endpoint} >
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    </div>

  );
}
