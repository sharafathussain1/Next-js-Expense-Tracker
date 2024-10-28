import { getAuth ,signInWithEmailAndPassword  } from "firebase/auth";
import { app } from "./config";


 export const auth = getAuth(app);


export function SigInUser(email:string, password:string){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const { email, uid } = userCredential.user;

            console.log(email, uid, 'user LOGGED IN successfully.', userCredential);
        
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
    
}


