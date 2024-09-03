"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

export const Formpage = () => {
  const { publicKey, connect } = useWallet();
  const form = useForm({
    defaultValues: {
      tokenName: "",
      tokenSymbol: "",
      decimals: "",
      tokenSupply: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Add your form submission logic here
    // Example: send data to your backend
  };

  return (
    <div className='flex justify-center p-28'>
      <div className=' bg-slate-950 rounded-lg p-5 shadow-2xl flex justify-center items-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          //@ts-ignore
                control={form.control}
                // name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Logo</FormLabel>
                    <FormControl>
                      <Input type='file' {...field}  className='bg-slate-900 text-white border-none'/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className='flex space-x-4'>
            <FormField
        control={form.control}
        name="tokenName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-white'>Token Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="USDC Token" 
                {...field}  
                className='bg-slate-900 text-white border-none'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
              <FormField          //@ts-ignore

                control={form.control}
                // name="tokenSymbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Token Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg- USDC" {...field} className='bg-slate-900 text-white border-none' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex space-x-4'>
              <FormField          //@ts-ignore

                control={form.control}
                // name="decimals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Decimals</FormLabel>
                    <FormControl>
                      <Input placeholder="0-9" {...field} className='bg-slate-900 text-white border-none'  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
         


            <FormField          //@ts-ignore

              control={form.control}
              // name="tokenSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Token Supply</FormLabel>
                  <FormControl>
                    <Input placeholder="Total supply of the token" {...field} className='bg-slate-900 text-white border-none'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
           
             <div className='flex items-center justify-center'>
             <Button className='bg-indigo-800' type="submit">Generate Token</Button>

             </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
  