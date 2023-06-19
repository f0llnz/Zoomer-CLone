import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

import './Login.scss'
import { toast } from 'react-toastify';


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
    email: yup.string().email('Invalid email').required('Email is required'),
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
        console.log(response.data)
        
        console.log('you have been logged in');
        navigate('/');
        toast.success(`You have logged in successfully`, {
          position: "top-center",
        });

        Cookies.set('token', token, { expires: 7 });
      } catch (error) {
        alert('something went wrong, try again');
      }
    },
  });

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='ელ. ფოსტა'
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <input
            placeholder='პაროლი'
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
};
