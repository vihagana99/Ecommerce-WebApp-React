import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { auth, fs } from '../Config/Config';
import { doc, getDoc, collection, query, onSnapshot, updateDoc } from 'firebase/firestore';
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';

export const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [uid, setUid] = useState(null); // State to store the user UID
  const [totalProduct, setTotalProduct] = useState(0);

  // Get user data and UID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // Set the UID when the user is logged in
        const userDocRef = doc(fs, 'Users', user.uid);
        getDoc(userDocRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUser(snapshot.data().Fullname);
            } else {
              setUser(null);
            }
          })
          .catch((error) => console.log(error));
      } else {
        setUser(null);
        setUid(null); // Reset UID when the user is logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Get cart products from Firestore collection
  useEffect(() => {
    if (uid) {
      const cartRef = collection(fs, 'Cart ' + uid);
      const q = query(cartRef);

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const newCartProducts = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }));
        setCartProducts(newCartProducts);
      });

      return () => unsubscribeSnapshot();
    } else {
      console.log('User is not logged in');
    }
  }, [uid]); // Dependency on 'uid'

  // Total Quantity Calculation
  const totalQty = cartProducts.reduce((acc, product) => acc + product.qty, 0);

  // Total Price Calculation
  const totalPrice = cartProducts.reduce((acc, product) => acc + product.TotalProductPrice, 0);

  // Cart product increase function
  const cartProductIncrease = async (cartproduct) => {
    if (!cartproduct.ID) {
      console.log('Error: Product ID is missing');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const productRef = doc(fs, 'Cart ' + user.uid, cartproduct.ID);

        const newQty = cartproduct.qty + 1;
        const newTotalPrice = newQty * cartproduct.price;

        await updateDoc(productRef, {
          qty: newQty,
          TotalProductPrice: newTotalPrice,
        });

        console.log('Increment added successfully');
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  // Cart product decrement function
  const cartProductDecrement = async (cartproduct) => {
    if (!cartproduct.ID) {
      console.log('Error: Product ID is missing');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const productRef = doc(fs, 'Cart ' + user.uid, cartproduct.ID);

        const newQty = cartproduct.qty - 1;
        const newTotalPrice = newQty * cartproduct.price;

        await updateDoc(productRef, {
          qty: newQty,
          TotalProductPrice: newTotalPrice,
        });

        console.log('Decrement successfully');
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  // Get total products in the cart
  useEffect(() => {
    if (uid) {
      const cartRef = collection(fs, `Cart ${uid}`);
      const unsubscribe = onSnapshot(cartRef, snapshot => {
        const qty = snapshot.docs.length;
        setTotalProduct(qty);
      });
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <div>
      <Navbar user={user} totalProduct={totalProduct} />
      <br />
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrement={cartProductDecrement}
            />
          </div>

          <div className="summary-box">
            <h5>Cart Summary</h5>
            <br />
            <div>
              <strong>Total No of Products:</strong> <span>{totalQty}</span>
            </div>
            <div>
              <strong>Total Price to Pay:</strong> <span>RS.{totalPrice}</span>
            </div>
            <br />
            <StripeCheckout>
              {/* Add Stripe Checkout configuration here */}
            </StripeCheckout>
          </div>
        </div>
      )}

      {cartProducts.length < 1 && <div className="container-fluid">No Products to Show</div>}
    </div>
  );
};
