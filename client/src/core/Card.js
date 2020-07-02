import React, { useEffect, useState } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemTocart, removeItemfromCart } from './helper/cartHelper';




const Card = ({ product,
               addtoCart=true, 
               removeFromCart=false,
               setReload= f=> f,
               reload = undefined
                
              }) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count)

    const cardTitle = product? product.name: "A photo from pixels" 
    const cardDescription = product? product.description: "A photo from pixels" 
    const cardPrice = product? product.price: "DEFAULT" 

    const addToCart = () => {
      addItemTocart(product, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
      if(redirect){
        return <Redirect to="/cart" />
      }
    }

    const showAddToCart = addtoCart => {
        return(
            addtoCart && (<button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
            Add to Cart
            </button>)
        )
    }

    const showRemoveToCart = (removeFromCart) => {
        return(
            removeFromCart && (<button
                onClick={() => {
                  removeItemfromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
            Remove from cart
            </button>)
        )
    }

        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
              <ImageHelper product={product} />
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveToCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
   


export default Card;