import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { auth, fs } from '../Config/Config';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { CartProducts } from './CartProducts';

export const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  // Get user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(fs, 'Users', user.uid); // Get reference to the user document
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
      }
    });

    return () => unsubscribe();
  }, []);

  // Get cart products from Firestore collection
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Use Firestore modular API to query the cart collection
        const cartRef = collection(fs, 'Cart ' + user.uid); // Get reference to the user's cart collection
        const q = query(cartRef); // Create a query (you can add more filters if needed)

        // Real-time listener for cart changes
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const newCartProducts = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProducts);
        });

        return () => unsubscribeSnapshot(); // Cleanup listener when component unmounts
      } else {
        console.log('User is not logged in');
      }
    });

    return () => unsubscribe(); // Cleanup auth listener
  }, []);

  console.log(cartProducts);

  return (
    <div>
      <Navbar user={user} />
      <br />
      {cartProducts.length > 0 && (
        <div className='container-fluid'>
          <h1 className='text-center'>Cart</h1>
          <div className='products-box'>
            <CartProducts cartProducts={cartProducts} />
          </div>
        </div>
      )}

      {cartProducts.length < 1 && (
        <div className='container-fluid'>No Products to Show</div>
      )}
    </div>
  );
};
