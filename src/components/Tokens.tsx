import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const FetchAssociatedTokens: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual public key
  const { connection } = useConnection();

  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchAssociatedTokens = async () => {
      try {
        setLoading(true);
        setError(null);

        // const connection = new Connection('https://api.mainnet-beta.solana.com');
        // const publicKey = new PublicKey(publicKeyString);
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
    <div>
      <h1>Associated Tokens</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              <p>Token Mint: {token.mint.toString()}</p>
              <p>Amount: {token.amount / 10 ** token.decimals}</p>
              <p>Decimals: {token.decimals}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
