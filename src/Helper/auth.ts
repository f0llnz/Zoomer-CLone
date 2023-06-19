import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

export const isUserAuthenticated = () => {
  const key = Cookies.get('token');;
  if (!key) return false;
  const decodedToken = jwtDecode<JwtPayload>(key);
  const tokenExpireDate = decodedToken.exp;
  return tokenExpireDate ? Date.now() < tokenExpireDate : false;
};