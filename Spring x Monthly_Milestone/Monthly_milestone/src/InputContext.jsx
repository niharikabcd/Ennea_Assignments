import React, {createContext, useState } from 'react';
export const InputContext = createContext();
export const InputContextProvider=({ children })=>{
    console.log('inputcontext is rendering...')
    const [select,setSelect]=useState('')
    console.log(select)
    return(
        <InputContext.Provider value={{select,setSelect}}>
        {children}
        </InputContext.Provider>
    )
}
