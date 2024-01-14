import{
  logInView,
  logOutView, 
  logOutBtn,
  visitorList,
  renderVisitorCard,


} from './script.js';

import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection,onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy,
  getDoc, 

} from 'firebase/firestore';

import { getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut
}from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBXGsqKPufo8yw8OMA0Dl8eNQ5AQkJaYfE",
    authDomain: "project-catch-2.firebaseapp.com",
    projectId: "project-catch-2",
    storageBucket: "project-catch-2.appspot.com",
    messagingSenderId: "367769451783",
    appId: "1:367769451783:web:5905b221fbf542c4f019a2",
    measurementId: "G-33WPG5KWSL"
  };

  initializeApp(firebaseConfig)
  
  const db = getFirestore()

  const colRef = collection(db,'visitors')

  const auth = getAuth()
  
  //Sign In users 
  const logIn = document.querySelector('.login-form');
  logIn.addEventListener('submit', (e) => {
    e.preventDefault()

      const email = logIn.email.value
      const password = logIn.password.value
 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
          console.log(user);
      // ...
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)
    });
  });
   
  const snapShotView = () =>{
   onSnapshot(colRef, (snapshot) => {
          visitorList.innerHTML = ''; // Clear the previous data
            snapshot.docs.forEach((doc) => {
              const visitor = { ...doc.data(), id: doc.id };
              const visitorCard = renderVisitorCard(visitor);
              visitorList.appendChild(visitorCard);

              console.log(visitorCard)
            });
          });
   
  }
  const monitorAuthState = async () => {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          snapShotView();
          logInView();
  
          // Assuming you have a modal element with the id 'myModal'
          const signUpModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
          signUpModal.hide();
          
          const modalBackdrop = document.querySelector('.modal-backdrop');
                  if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                  }

          logOutBtn.addEventListener('click', (e) => {
            e.preventDefault()
      
              signOut(auth)
                  .then(() =>{
                      console.log('the user signed out')
                  })
                  .catch((error) =>{
                      console.log(error.message)
                  })
          })
         

          resolve(); // Resolve the promise when the user is authenticated
        } else {
          console.log('Try again');
          logOutView();
          resolve(); // Resolve the promise when there is no authenticated user
        }
      });
  
      // Assuming you want to stop monitoring when the function is called again
      return () => unsubscribe();
    });
  };
  
  // Call the function
  monitorAuthState();
  
  
    //adding Docs
    const addVisitorForm = document.querySelector('.add')
    addVisitorForm.addEventListener('submit', (e) =>{
      e.preventDefault()
  
      addDoc(colRef, {
        firstName: addVisitorForm.firstName.value,
        surName: addVisitorForm.surName.value,
        emailAddress: addVisitorForm.emailAddress.value,
      })
      .then(() =>{
        addVisitorForm.reset()
      })
    })


