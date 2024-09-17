import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DivWrapper, InputWrapper } from '../styled';
export default function Input(){
    const { theme } = useContext(ThemeContext);
    const [user,setUser]=useState('user');
    function handle(newi){
        setUser(newi);
    }
    return <section>
        <DivWrapper theme={theme}>
            <p>
                <label>enter your name</label>
                <br/>
                    <input 
                    value={user}
                    onChange={(event)=>handle(event.target.value)}/>
                    <br/>
                    <br/>
                    <InputWrapper theme={theme}>
                        Hello {user}
                    </InputWrapper>
            </p>
        </DivWrapper>
    </section>
}