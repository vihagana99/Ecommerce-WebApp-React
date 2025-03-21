import React from 'react';
import { IndividualProduct } from './IndividualProduct';

export const Products = ({ products, addToCart }) => {

  return products.map((individualProduct) => {
    return (
      <IndividualProduct key={individualProduct.ID} individualProduct={individualProduct} 
      
      addToCart={addToCart}
      
      />
        
    );
  });
};
