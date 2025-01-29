import React from 'react';
import { IndividualCartProduct } from './IndividualCartProduct';

export const CartProducts = ({ cartProducts }) => {
  return cartProducts.map((cartproduct) => (
    <IndividualCartProduct key={cartproduct.ID} cartproduct={cartproduct} />
  ));
};
