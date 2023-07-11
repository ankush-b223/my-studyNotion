import  { useEffect } from 'react'

export default function useOnOutsideClick(ref,handler){

    useEffect( ()=>{

        
        const listner = (event)=>{
            //if event is in ref of profileDropDown
            if(!ref.current || ref.current.contains(event.target) ){

                return;
            }

            handler(event);
        }

        //events triggerring above handler fn
        document.addEventListener("mousedown" , listner);
        document.addEventListener("touchstart" , listner);

        //cleanup fn
        return ()=>{
            document.removeEventListener("mousedown",listner);
            document.removeEventListener("touchstart",listner);
        }


    },[ref,handler])  

}

