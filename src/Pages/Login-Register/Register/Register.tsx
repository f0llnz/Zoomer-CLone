import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';

import './Register.scss';
import { toast } from 'react-toastify';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  password2: string;
}

const initialValues: RegisterFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: 0,
  email: '',
  password: '',
  password2: '',
};

export default function Register()  {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.number().required('Phone Number is required'),
    password: yup.string().required('Password is required'),
    password2: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  });

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: RegisterFormData) => {
      try{
        await axios.post('http://localhost:8080/register',{
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
        });
          navigate('/authorisation')
          toast.success(`You have Registered successfully`, {
            position: "top-center",
          });
        } catch (error){
          alert('somethings wrong, try again')
      }
    },
  });

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <div className="nameandlastname">

          <div className="firstN">
            {errors.firstName && <div className="error">{errors.firstName}</div>}
            <input
              placeholder="სახელი"
              type="text"
              id="firstName"
              className="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
          />
          </div>

          <div className="lastN">
            {errors.lastName && <div className="error">{errors.lastName}</div>}
            <input
              placeholder="გვარი"
              type="text"
              id="lastName"
              className="firstName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="passwords">

          <div className="password1">
            {errors.password && <div className="error">{errors.password}</div>}
            <input
              placeholder="პაროლი"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <div className="password2">
            {errors.password2 && <div className="error">{errors.password2}</div>}
            <input
              placeholder="გაიმეორეთ პაროლი"
              type="password"
              id="password2"
              name="password2"
              value={values.password2}
              onChange={handleChange}
            />
          </div>
          
        </div>
        <div className="phoneN">
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            <input
              placeholder="ტელეფონის ნომერი"
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
        </div>

        <div className="email">
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            placeholder="ელ. ფოსტა"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">რეგისტრაცია</button>
      </form>
    </div>
  )
}
