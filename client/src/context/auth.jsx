import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        isLoading: true,
        error: null
    })

    useEffect(() => {
        const verifyAuth = async() => {
            const token = new URLSearchParams(window.location.search).get('token') 
                || localStorage.getItem('token')

            if(!token){
                setAuth(prev => ({ ...prev, isLoading: false }));
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                localStorage.setItem('token', token);
                setAuth({
                    user: response.data.user,
                    isLoading: false,
                    error: null
                })
                if (window.location.search.includes('token')) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }catch(error){
                localStorage.removeItem('token');
                setAuth({
                    user: null,
                    isLoading: false,
                    error: error.response?.data?.message || 'Authentication failed'
                })
            }
        };
        verifyAuth()
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            user: null,
            isLoading: false,
            error: null
        });
    };

    return (
        <AuthContext.Provider value={{ ...auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);