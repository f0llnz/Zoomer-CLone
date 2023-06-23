import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import jwtDecode, { JwtPayload } from 'jwt-decode';

export const isUserAuthenticated = (): boolean => {
  const key = localStorage.getItem('token');
  if (!key) return false;
  const decodedToken = jwtDecode<JwtPayload>(key);
  const tokenExpireDate = decodedToken?.exp;
  return !!tokenExpireDate && Date.now() < tokenExpireDate * 1000;
  console.log(decodedToken)
};

import './Login.scss';

interface LoginFormData {
  email: string;
  password: string;
}

const initialValues: LoginFormData = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: LoginFormData) => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: values.email,
          password: values.password,
        });

        const token = response.data.AccessToken;
        console.log(response.data);

        if (values.email === 'admin' && values.password === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }

        toast.success(`You have logged in successfully`, {
          position: 'top-center',
        });

        localStorage.setItem('token', token);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="ელ. ფოსტა"
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input
            placeholder="პაროლი"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit">შესვლა</button>
      </form>
    </div>
  );
}
