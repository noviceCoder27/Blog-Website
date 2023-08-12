
import { useState } from 'react';

export const Loader = () => {
  const [endTimer,setEndTimer] = useState(false);
  setTimeout(() => {
    setEndTimer(true);
  },5000);
  return (
    <>
      {!endTimer && <div className="inline-block w-24 h-24 border-t-4 rounded-full border-t-red-500 animate-spin"></div>}
      {endTimer && <div className="text-2xl font-monsterrat text-[#f16363] font-extrabold " style={{"textShadow": "1px 2px 0 black"}}>No Blogs Found ...</div>}
    </>
    
  )
}
