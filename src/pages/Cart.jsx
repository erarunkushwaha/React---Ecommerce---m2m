import React from 'react'
import Badge from '@mui/material/Badge';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
  

    return (

       <>
       <div className="cartContainer">
       <Badge badgeContent={4}  color="error">
         <ShoppingCartIcon style={{ fill:"#fff",fontSize: 30  }}  />
    </Badge>
       <h2> CART</h2>
       </div>
       </>
   
       
    )
}

export default Cart
