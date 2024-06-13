import { auth } from "./config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";



export const doCreateUserWithEmailAndPassword = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: username
        });
        return userCredential;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithgoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // result.user
    return result
};

export const doSignOut = async () => {
    const auth = getAuth;
    await signOut(auth);
}



