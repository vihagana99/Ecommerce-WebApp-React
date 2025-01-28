import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Products } from './Products';
import { auth, fs, collection, doc, getDoc } from '../Config/Config'; // Import required Firestore methods

export const Home = () => {
  const [user, setUser] = useState(null); // Declare state for user

  // Use useEffect to fetch current user when component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userDocRef = doc(fs, 'Users', user.uid); // Get reference to the user document
        getDoc(userDocRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              setUser(snapshot.data().Fullname); // Set user state with Fullname
            } else {
              setUser(null); // User not found
            }
          })
          .catch(error => console.log(error));
      } else {
        setUser(null); // Set user state to null if no user is logged in
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <Navbar user={user} />
      <Products />
    </div>
  );
};
