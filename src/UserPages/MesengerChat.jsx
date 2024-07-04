"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';

const MesengerChat = () => {
  return (
 
       <FacebookProvider appId="1671663350256198" chatSupport>
        <CustomChat pageId="343721882163379" minimized={true}/>
      </FacebookProvider>    
  
  )
}

export default MesengerChat
