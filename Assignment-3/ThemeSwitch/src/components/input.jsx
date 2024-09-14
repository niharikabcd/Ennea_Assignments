import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Lput, Xyput } from '../styled';
export default function Input(){
    const { theme } = useContext(ThemeContext);
    const [user,setUser]=useState('user');
    function handle(newi){
        setUser(newi);
    }
    return <section>
        <Lput>
            <p>
                <label>enter your name</label>
                <br/>
                    <input 
                    value={user}
                    onChange={(event)=>handle(event.target.value)}/>
                    <br/>
                    <br/>
                    <Xyput theme={theme}>
                        Hello {user}
                    </Xyput>
            </p>
        </Lput>
    </section>
}