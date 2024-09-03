"use client";

import {Formpage} from '@/components/Form';
import Demo from '@/components/Demo'
import { Button } from '@/components/ui/button';
import Appbar from '@/components/Appbar';
import { CreateMintForm } from '@/components/CreateMint';
import { BalanceDisplay } from '@/components/Balance';
import { CreateTokenAccountForm } from '@/components/CreateATA';
import { MintToForm } from '@/components/MintToken';
import { FetchAssociatedTokens } from '@/components/Tokens';

export default function Home() {

  return (
    <div>

     
      <Appbar/>
            

<BalanceDisplay/>
<FetchAssociatedTokens/>
<CreateMintForm/>
<CreateTokenAccountForm/>
<MintToForm/>
       {/* <div>
       <Formpage/>
       </div> */}
      
      {/* <Demo/> */}
     
 <div className='text-white'>
 </div>
 {/* <img src="https://v2.akord.com/public/vaults/active/T7tIjhW2N4kIckHefDPtB1qnnRMd09sFHyRWt5nVzDY/gallery#2db7d1c3-135d-4ceb-abda-deaecfa698bb" alt="adn" /> */}

    </div>
  );
}
