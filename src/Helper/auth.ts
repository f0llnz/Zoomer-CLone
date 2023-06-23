import jwtDecode, { JwtPayload } from 'jwt-decode';

export const isUserAuthenticated = (): boolean => {
  const key = localStorage.getItem('token');
  if (!key) return false;
  const decodedToken = jwtDecode<JwtPayload>(key);
  const tokenExpireDate = decodedToken?.exp;
  return !!tokenExpireDate && Date.now() < tokenExpireDate * 1000;
};