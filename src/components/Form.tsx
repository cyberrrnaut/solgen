"use client"

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenCreationForm = () => {
  const { publicKey } = useWallet();
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    description: '',
    decimals: 9, // Default value
    supply: 0,
    image: null,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTokenData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTokenData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Rest of the form and handling goes here
};
