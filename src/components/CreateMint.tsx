import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";

import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
} from "@solana/spl-token";

export const CreateMintForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const createMint = async (event:any) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mint = web3.Keypair.generate();

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new web3.Transaction();

    transaction.add(
      web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        publicKey,
        publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    sendTransaction(transaction, connection, {
      signers: [mint],
    }).then((sig) => {
      setTxSig(sig);
      setMint(mint.publicKey.toString());
    });
  };

  return (
    <div>
      {publicKey ? (
        <form onSubmit={createMint}>
          <button type="submit" >
            Create Mint
          </button>
        </form>
      ) : (
        <span className="text-white">Connect Your Wallet</span>
      )}
      {txSig ? (
        <div>
          <p className="text-white">Token Mint Address: {mint}</p>
          <p  className="text-white">View your transaction on </p>
          <a href={link()}  className="text-white">Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};