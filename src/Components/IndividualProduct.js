import React from 'react';

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  
  const handleAddToCart=()=>{
      addToCart(individualProduct);

  }

  return (
    <div className="product">
      <div className="product-img">
        
        <img 
          src={individualProduct.url || '/path/to/fallback-image.jpg'} 
          alt="product-img" 
        />
      </div>
      <div className="product-text title">{individualProduct.title}</div>
      <div className="product-text description">{individualProduct.description}</div>
      <div className="product-text price">RS.{individualProduct.price}</div>
      <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>ADD TO CART</div>
    </div>
  );
};
