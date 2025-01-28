import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Products } from './Products';
import { auth, fs,  doc, getDoc } from '../Config/Config'; 

export const Home = () => {
  const [user, setUser] = useState(null); 

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
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
      }
    });

    
    return () => unsubscribe();
  }, []); 

  return (
    <div>
      <Navbar user={user} />
      <Products />
    </div>
  );
};
