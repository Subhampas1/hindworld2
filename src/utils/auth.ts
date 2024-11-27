import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

export const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, provider);
    
    // Create user object from Firebase user
    const user = {
      id: result.user.uid,
      email: result.user.email || '',
      name: result.user.displayName || '',
      role: 'buyer', // Default role, can be changed later
      createdAt: new Date()
    };

    // Update auth store
    useAuthStore.getState().login(user);
    
    return {
      success: true,
      user
    };
  } catch (error: any) {
    let message = 'An error occurred during Google sign-in';
    
    if (error.code === 'auth/popup-blocked') {
      message = 'Please allow popups for this website to sign in with Google';
    } else if (error.code === 'auth/cancelled-popup-request') {
      message = 'Sign-in cancelled';
    } else if (error.code === 'auth/popup-closed-by-user') {
      message = 'Sign-in window was closed';
    }
    
    return {
      success: false,
      error: message
    };
  }
};