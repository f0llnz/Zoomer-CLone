import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Infobar from '../../components/Navbar/Infobar/Infobar';
import Navbar from '../SingleItem/component/Navbar2/SPSearchbar';

import './ProfilePage.scss';
import Footer from '../../components/Footer/Footer';

interface User {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8080/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  interface UpdateFormData {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
  }

  const initialValues: UpdateFormData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || 0,
    email: user?.email || '',
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.number().required('Phone Number is required'),
  });

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: UpdateFormData) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post(
            'http://localhost:8080/user',
            {
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values.phoneNumber,
              email: values.email,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userInfo = response.data
          console.log(userInfo)
          setUser(userInfo);
          alert('User information updated successfully!');
        }
      } catch (error) {
        console.error('Failed to update user:', error);
        alert('Failed to update user information. Please try again.');
      }
    },
  });

  return (
    <div>
      <Infobar />
      <Navbar />

      {user && (
        <div className="ProfileP">
          <h1>Welcome, {user.firstName}!</h1>
          <div className="form">
            <form onSubmit={handleSubmit}>

              {errors.firstName && <div className="error">{errors.firstName}</div>}
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder={user.firstName}
              />

              {errors.lastName && <div className="error">{errors.lastName}</div>}
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder={user.lastName}
              />

              {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder={user.phoneNumber.toString()}
              />

              {errors.email && <div className="error">{errors.email}</div>}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder={user.email}
              />
              
              <button type="submit">დაიმახსოვრე</button>

            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;