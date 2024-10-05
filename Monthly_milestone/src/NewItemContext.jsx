import React, {createContext, useState } from 'react';
export const NewItemContext = createContext();
export const NewItemContextProvider=({ children })=>{
    console.log('newitem context is rendering...')
    const [NewItem,setNewItem]=useState({
        'id': 0,
        'title':'',
        'category':''
    })
    return(
        <NewItemContext.Provider value={{NewItem,setNewItem}}>
        {children}
        </NewItemContext.Provider>
    )
}