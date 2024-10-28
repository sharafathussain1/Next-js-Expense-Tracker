import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword  } from "firebase/auth";
import { app } from "./config";
import { log } from "console";

 export const auth = getAuth(app);

//  export  async function SignUpUser( email:string, password:string ,Confirmpassword:string )
//  {
  
//   if(password!==Confirmpassword){
//     ()
// return;

// }
//     createUserWithEmailAndPassword(auth, email, password)

//   .then((userCredential ) => {
//     // Signed up 
//     const { email, uid } = userCredential.user;
//     console.log(email, uid, 'user created successfully.', userCredential);
    
//     //  cleear form field
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorMessage)
//     // ..
//   })

// }

export function SigInUser(email:string, password:string){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const { email, uid } = userCredential.user;

            console.log(email, uid, 'user LOGGED IN successfully.', userCredential);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
    
}


