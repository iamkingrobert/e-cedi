// import { useEffect,useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import app from "../config/firebase";


export const useUserData=()=>{
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = getAuth().currentUser.uid;

  
//     useEffect(()=>{
//       let data
//         const getData=async()=>{
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
// //console.log("Document data:", docSnap.data());
//      data=docSnap.data();    

//  //   console.log(data);      
//         return data
//         } else {
//           // docSnap.data() will be undefined in this case
//           console.log("No such document!");
//         } 
//         }
//         getData()
       

//         },[])
    
        
}
