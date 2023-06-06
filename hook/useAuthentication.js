import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app from '../config/firebase';

const auth = getAuth(app);

export function useAuthentication(){
    const [user, setUser] = useState('')

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            user ? setUser(user) : setUser (undefined);
            return unsubscribe;
        })
    },[])
    return{user}
}