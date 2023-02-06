import React, { useState, useMemo } from "react";

export interface IPaginationState{    
    perPageCount: number;
    setPerPageCount:(count: number)=>void;
    currentUrl:string;
    setCurrentUrl:(url:string)=>void,
    prevUrl: string;
    setPrevUrl:(url:string)=>void;
    nextUrl: string;
    setNextUrl:(url:string)=>void;
    firstUrl:string;
    setFirstUrl:(url:string)=>void;
    lastUrl:string;
    setLastUrl:(url:string)=>void;

}

export const initialPaginationState: IPaginationState = {   
    perPageCount: 10,
    setPerPageCount:()=>{return},
    currentUrl:"",
    setCurrentUrl:()=>{return},
    prevUrl:"",
    setPrevUrl: ()=>{return},
    nextUrl:"",
    setNextUrl:()=>{return},
    firstUrl:"",
    setFirstUrl:()=>{return},
    lastUrl:"",
    setLastUrl:()=>{return}
}

export const PaginationContext = React.createContext<IPaginationState>(initialPaginationState);
   

export function PaginationProvider({children}: {children: React.ReactNode}): React.ReactElement{
    const [perPageCount, setPerPageCount] = useState(initialPaginationState.perPageCount);
    const [currentUrl, setCurrentUrl] = useState(initialPaginationState.currentUrl);
    const [prevUrl, setPrevUrl] = useState(initialPaginationState.prevUrl);
    const [firstUrl, setFirstUrl] = useState(initialPaginationState.firstUrl);
    const [nextUrl, setNextUrl] = useState(initialPaginationState.nextUrl);
    const [lastUrl, setLastUrl] = useState(initialPaginationState.lastUrl);

    const paginationState = useMemo((): IPaginationState => {
      return {
        perPageCount,
        setPerPageCount,
        currentUrl,
        setCurrentUrl,
        prevUrl,
        setPrevUrl,
        nextUrl,
        setNextUrl,
        firstUrl,
        setFirstUrl,
        lastUrl,
        setLastUrl
      };
    },[perPageCount,
        setPerPageCount,
        currentUrl,
        setCurrentUrl,
        prevUrl,
        setPrevUrl,
        nextUrl,
        setNextUrl,
        firstUrl,
        setFirstUrl,
        lastUrl,
        setLastUrl]);

    return (
        <PaginationContext.Provider  value={paginationState} >
            {children}
        </PaginationContext.Provider>
    )
}

