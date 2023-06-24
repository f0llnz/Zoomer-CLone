import React from 'react';
import { Formik, Form, Field } from 'formik';
import Navbar from '../SingleItem/component/Navbar2/SPSearchbar'
import Infobar from '../../components/Navbar/Infobar/Infobar';
import './Checkout.scss'
import Footer from '../../components/Footer/Footer';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

const CheckoutPage: React.FC = () => {
  const initialValues: CheckoutFormData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  };

  const handleSubmit = (values: CheckoutFormData) => {
    console.log(values);
  };

  return (
    <div className="checkoutbody">
        <div className="firsttwo">
          <Infobar />
          <Navbar />
        </div>
        <div className='CheckoutForm'>
        <h2>Checkout Page</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <Field type="text" id="firstName" name="firstName" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <Field type="text" id="lastName" name="lastName" />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <Field className='address' type="text" id="address" name="address" />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <Field className='city' type="text" id="city" name="city" />
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code:</label>
                <Field className='postal' type="text" id="postalCode" name="postalCode" />
            </div>
            <button type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
        <Footer />
    </div>
  );
};

export default CheckoutPage;