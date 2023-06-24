import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useState } from 'react';

export const isUserAuthenticated = (): boolean => {
  const key = localStorage.getItem('token');
  if (!key) return false;
  const decodedToken = jwtDecode<JwtPayload>(key);
  const tokenExpireDate = decodedToken?.exp;
  return !!tokenExpireDate && Date.now() < tokenExpireDate * 1000;
};

export const isAdminAuthenticated = (): boolean => {
  const key = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false)
  if (!key) return false;
  const decodedToken = jwtDecode<any>(key);
  if(decodedToken.isAdmin === true){
    setIsAdmin(true)
  }
  return isAdmin
}