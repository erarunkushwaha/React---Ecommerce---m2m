// import { Button } from '@mui/material';
import React from 'react';
import './customButton.css';

function CustomButton({text,icon,logout,avatar}) {
    return (
        <button onClick={() => {
            logout() 
          }} className='customButton'>
          {icon}
          
          {!avatar && ( <h1 className='text'>{(text)?text:''}</h1>)}
          {avatar && ( <h1 className='avtarText'>{(text)?text:''}</h1>)}
           
          
        </button>
    )
}

export default CustomButton
