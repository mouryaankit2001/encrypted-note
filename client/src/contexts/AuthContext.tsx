import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';
import { User, AuthState } from '../types';
import { initializeEncryptionKey, clearEncryptionKey } from '../services/encryptionService';

type AuthAction =
  | { type: 'AUTH_REQUEST' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAIL'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AUTH_STORAGE_KEY = 'user';
const TOKEN_STORAGE_KEY = 'token';
const PASS_STORAGE_KEY = 'securePassKey';

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'AUTH_FAIL':
      return { ...state, isLoading: false, isAuthenticated: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem(AUTH_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    
    if (user && token) {
      const userData = JSON.parse(user);
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      
      const storedPassword = localStorage.getItem(PASS_STORAGE_KEY);
      if (storedPassword && userData.email) {
        initializeEncryptionKey(storedPassword, userData.email);
      }
    }
  }, []);

  const handleAuth = async (endpoint: string, credentials: any) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      const { data } = await api.post(`/users/${endpoint}`, credentials);
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(PASS_STORAGE_KEY, credentials.password);
      
      initializeEncryptionKey(credentials.password, credentials.email);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error: any) {
      dispatch({ 
        type: 'AUTH_FAIL', 
        payload: error.response?.data?.message || `${endpoint} failed` 
      });
    }
  };

  const login = async (email: string, password: string) => {
    await handleAuth('login', { email, password });
  };

  const register = async (name: string, email: string, password: string) => {
    await handleAuth('register', { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(PASS_STORAGE_KEY);
    clearEncryptionKey();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 