import React, { useEffect, useState } from 'react';
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';



const Cart = () =>{

    const [products, setProducts] = useState([])
    const[reload, setReload] = useState(true)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    const loadAllProducts = () => {
        return(
            <div>
                <h2>This section is for Loading all products</h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false} 
                        setReload={setReload}
                        reload={reload}
                    />                      

                ))}
            </div>
        )
    }

    
    
    return(
        <Base title="Cart page" description="Ready to Checkout">
            <div className="row text-center">
            <div className="col-6">{loadAllProducts()}</div>
            {/* <div className="col-6"><StripeCheckout products={products} setReload={setReload} /></div> */}
            </div>
            

        </Base>
    )
}

export default Cart;