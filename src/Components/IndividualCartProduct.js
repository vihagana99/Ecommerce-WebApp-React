import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa'; // Use react-icons

export const IndividualCartProduct = ({ cartproduct }) => {
  return (
    <div className='product'>
      <div className='product-img'>
        <img src={cartproduct.url} alt='product-img' />
      </div>
      <div className='product-text title'>{cartproduct.title}</div>
      <div className='product-text description'>{cartproduct.description}</div>
      <div className='product-text price'>{cartproduct.price}</div>
      <span>Quantity</span>

      <div className='product-text quantity-box'>
        <div className='action-btns minus'>
          <FaMinus size={20} /> {/* Use FaMinus */}
        </div>
        <div>{cartproduct.qty}</div>
        <div className='action-btns plus'>
          <FaPlus size={20} /> {/* Use FaPlus */}
        </div>
      </div>

      <div className='product-text cart-price'>RS.{cartproduct.TotalProductPrice}</div>
      <div className='btn btn-danger btn-md cart-btn'>DELETE</div>
    </div>
  );
};
