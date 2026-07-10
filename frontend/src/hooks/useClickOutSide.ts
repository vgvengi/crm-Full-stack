import { useEffect, type RefObject } from "react";

function useClickOutSide<T extends HTMLElement>(
    ref : RefObject<T | null>,
    callback :()=> void 
){
    useEffect(()=>{

        function handleOutSideEvent(event:MouseEvent){
            if(ref.current && !ref.current.contains(event.target as Node)){
                callback();
            }
        }
        document.addEventListener("mousedown",handleOutSideEvent);
        return()=>{
            document.removeEventListener("mousedown",handleOutSideEvent);
        }
    },[ref, callback])
}

export default useClickOutSide;  