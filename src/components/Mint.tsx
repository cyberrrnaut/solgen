"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAccount,
} from "@solana/spl-token";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const Mint: FC = () => {
  const [mintTxSig, setMintTxSig] = useState<string>("");
  const [mint, setMint] = useState<string>("");
  const [atatxSig, setAtatxSig] = useState<string>("");
  const [tokenAccount, setTokenAccount] = useState<string>("");
  const [supply, setSupply] = useState<number>(0);
  const [supplyTxSig, setSupplyTxSig] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [decimal, setDecimal] = useState<number>(0); // Initialize decimal state
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const form = useForm({
    defaultValues: {
      decimals: 0,
    },
  });

  useEffect(() => {
    if (mint) {
      createTokenAccount();
    }
  }, [mint]);

  const createMint = async () => {
    if (!connection || !publicKey) {
      console.error("No connection or publicKey found");
      return;
    }

    // Generate a new mint keypair
    const mintKeypair = web3.Keypair.generate();

    // Get the minimum balance required to exempt the mint account from rent
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    // Create a transaction for creating and initializing the mint
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),

      createInitializeMintInstruction(
        mintKeypair.publicKey,
        decimal, // Use the decimals from the form
        publicKey,
        publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    // Send the transaction
    try {
      const signature = await sendTransaction(transaction, connection, {
        signers: [mintKeypair],
      });
      setMintTxSig(signature);
      setMint(mintKeypair.publicKey.toString());
    } catch (error) {
      console.warn("Error creating mint:", error);
    }
  };

  const createTokenAccount = async () => {
    if (!connection || !publicKey || !mint) {
      console.warn("No connection, publicKey or mint found");
      return;
    }

    const transaction = new web3.Transaction();
    const ownerAddr = new web3.PublicKey(publicKey);
    const mintAddr = new web3.PublicKey(mint);

    // Get the associated token address
    const associatedToken = await getAssociatedTokenAddress(
      mintAddr,
      ownerAddr,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    transaction.add(
      createAssociatedTokenAccountInstruction(
        publicKey,
        associatedToken,
        ownerAddr,
        mintAddr,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    // Send the transaction
    try {
      const signature = await sendTransaction(transaction, connection);
      setAtatxSig(signature);
      setTokenAccount(associatedToken.toString());
    } catch (error) {
      console.warn("Error creating token account:", error);
    }
  };

  const mintTo = async () => {
    if (!connection || !publicKey || !mint) {
      console.warn("No connection, publicKey, or mint found");
      return;
    }

    const transaction = new web3.Transaction();
    const mintPubKey = new web3.PublicKey(mint);
    const recipientPubKey = publicKey;

    // Calculate the amount with BigInt
    const amount = BigInt(supply) * BigInt(10 ** decimal);

    const associatedToken = await getAssociatedTokenAddress(
      mintPubKey,
      recipientPubKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    transaction.add(
      createMintToInstruction(mintPubKey, associatedToken, publicKey, amount)
    );

    // Send the transaction
    try {
      const signature = await sendTransaction(transaction, connection);
      setSupplyTxSig(signature);
      setTokenAccount(associatedToken.toString());

      const account = await getAccount(connection, associatedToken);
      setBalance(account.amount.toString());
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <div>
      {publicKey ?( !mintTxSig && (
        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); createMint(); }} className="space-y-8">
            <FormField
              control={form.control}
              name="decimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decimals</FormLabel>
                  <FormControl>
                    <Input max={9}
                    min={0}
                      type="number"
                      onChange={(e) => setDecimal(Number(e.target.value))}
                      placeholder="Eg: 6     [MIN-0 | MAX-9]"
                    className="bg-slate-800 border-none" />
                  </FormControl>
                  <FormDescription>
                    Eg: 0.000001 (Smallest unit of your token if Decimal is 6)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="  flex justify-center items-center ">
            <Button className="bg-purple-700" type="submit">Create Mint</Button>

            </div>
          </form>
        </Form>
      ) ): (
        <span className="text-white">Connect Your Wallet</span>
      )}
      {mintTxSig && (
        <div className="text-white pt-5 flex flex-col items-center">Your Token address: 
        
      <div className="text-sm hover:text-slate-400 p-4">
      <a href={`https://explorer.solana.com/address/${mint}`} target="_blank" rel="noopener noreferrer">
                           
                           {mint}
                           </a>
       
        
        </div></div>
      )}

      {atatxSig && (
        <div className="p-4 ">
          <Input
            className="bg-slate-800 border-none" 
            placeholder="Enter Supply"
            type="number"
            onChange={(e) => setSupply(Number(e.target.value))}
          />
          <div className="flex items-center justify-center p-6">
          <Button className="bg-purple-700"  onClick={mintTo}>{supplyTxSig?"Mint More": "Mint Supply"}</Button>

            </div>
        </div>
      )}
      {supplyTxSig && (
        <div >
          Mint Transaction Signature: 
          <div className="text-white text-sm hover:text-slate-400 pt-4 max-w-[500px] break-words">
          <a href={`https://explorer.solana.com/tx/${supplyTxSig}`} target="_blank" rel="noopener noreferrer">
          {supplyTxSig}
                           </a>
            </div>
        </div>
      )}
      {/* {balance && (
        <div className="text-white">
          Balance: {balance}
        </div>
      )} */}
    </div>
  );
};
