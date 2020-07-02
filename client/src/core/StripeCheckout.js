import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout'
import {API} from "../backend"
import { createOrder } from './helper/orderHelper';


const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
    }) => {


    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })  
    
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    //Dint understand this
    const getFinalAmount = () => {
       let amount = 0;
       products.map(p => {
           amount = amount + p.price
       })
       return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            //call further methods
        }).catch(err => console.log(err))
    };
    
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_2OiL2c0lk5p4CtnhJUeTZj7x00Dc3Bnj8M"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy t-shirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckoutButton>
            
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h2 className="text-white">Stripe Checkout {getFinalAmount()}</h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;