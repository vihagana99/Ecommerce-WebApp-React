import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Products } from './Products';
import { auth, fs } from '../Config/Config';
import { collection, doc, getDoc, getDocs, setDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [uid, setUid] = useState(null);

  // Get user UID and data
 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        const userDocRef = doc(fs, 'Users', user.uid); // Get reference to the user document
        getDoc(userDocRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              setUser(snapshot.data().Fullname);
            } else {
              setUser(null);
            }
          })
          .catch(error => console.log(error));
      } else {
        setUser(null);
        setUid(null); // Reset UID when user is logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Get products from Firestore
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsCollectionRef = collection(fs, 'Products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsArray = productsSnapshot.docs.map(doc => ({
          ...doc.data(),
          ID: doc.id,
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProducts();
  }, []);

  // Get total products in the cart
  const [totalProduct, setTotalProduct] = useState(0);

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


  const addToCart = async (product) => {
    if (uid !== null) {
      const productRef = doc(fs, `Cart ${uid}`, product.ID);
      const productData = {
        ...product,
        qty: 1,
        TotalProductPrice: product.price * 1,
      };

      try {
        await setDoc(productRef, productData);
        console.log('Product added to cart successfully');
      } catch (error) {
        console.log('Error adding product to cart:', error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar user={user} totalProduct={totalProduct} />
      <br />

      {products.length > 0 ? (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <Products products={products} addToCart={addToCart} />
          </div>
        </div>
      ) : (
        <div className="container-fluid">Please Wait.....</div>
      )}
    </div>
  );
};
