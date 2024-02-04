import { Navigate } from 'react-router-dom';
import { useAuthSelector } from 'entities/auth/model/selectors';

export const ProtectedRoute = ({ children } : any) => {
     const auth = useAuthSelector((state) => state.auth.auth);
console.log(auth, 'auth routing')
    if (!auth?.userId) {
      // user is not authenticated
      return <Navigate to='/' />;
    } 
    return children;
  };