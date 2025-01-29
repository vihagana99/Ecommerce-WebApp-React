import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa'; // Use react-icons
import { auth, fs } from '../Config/Config';
import { doc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

export const IndividualCartProduct = ({ cartproduct, cartProductIncrease, cartProductDecrement }) => {


  const handleCartProductIncrease = () => {
      cartProductIncrease(cartproduct);
  }
  const handleCartProductDecrement = () => {
      cartProductDecrement(cartproduct);
  }
  // Delete cart product from Firestore
  const handleCartProductDelete = () => {
      auth.onAuthStateChanged(async (user) => {
          if (user) {
              try {
                  const cartRef = doc(fs, `Cart ${user.uid}`, cartproduct.ID); // Corrected Firestore syntax
                  await deleteDoc(cartRef);
                  console.log("Item successfully deleted!");
              } catch (error) {
                  console.error("Error removing document: ", error);
              }
          }
      });
  };
  

  return (
    <div className='product'>
      <div className='product-img'>
        <img src={cartproduct.url} alt='product-img' />
      </div>
      <div className='product-text title'>{cartproduct.title}</div>
      <div className='product-text description'>{cartproduct.description}</div>
      <div className='product-text price'>RS.{cartproduct.price}</div>
      <span>Quantity</span>

      <div className='product-text quantity-box'>
        <div className='action-btns minus' >
          <FaMinus size={20} onClick={handleCartProductDecrement} />
        </div>
        <div>{cartproduct.qty}</div>
        <div className='action-btns plus'>
          <FaPlus size={20}  onClick={handleCartProductIncrease} /> 
        </div>
      </div>

      <div className='product-text cart-price'>RS.{cartproduct.TotalProductPrice}</div>
      <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>
    </div>
  );
};
