import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "routes/ProtectedRoute";

const AuthPage = lazy(() => import('./auth/auth'));
const UserPage = lazy(() => import('./user/user'));


export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route 
                path="/user" 
                element={
                    <ProtectedRoute>
                        <UserPage />
                    </ProtectedRoute>
                }
             />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};