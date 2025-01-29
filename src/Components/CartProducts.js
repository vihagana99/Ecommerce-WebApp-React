import React from 'react';
import { IndividualCartProduct } from './IndividualCartProduct';

export const CartProducts = ({ cartProducts , cartProductIncrease , cartProductDecrement}) => {
  return cartProducts.map((cartproduct) => (
    <IndividualCartProduct key={cartproduct.ID} cartproduct={cartproduct} 
    cartProductIncrease={cartProductIncrease}
    cartProductDecrement={cartProductDecrement}
    />
  ));
};
