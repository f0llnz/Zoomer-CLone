import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import axios from 'axios';
import {toast} from 'react-toastify'

import Infobar from '../../components/Navbar/Infobar/Infobar';
import Navbar from '../SingleItem/component/Navbar2/SPSearchbar';

import './Admin.scss';

interface ProductFormData {
  title: string;
  description: string;
  images: string;
  brand: string;
  category: string;
  price: string;
  amount: string;
}

const initialValues: ProductFormData = {
  title: '',
  description: '',
  images: '',
  brand: '',
  category: '',
  price: '',
  amount: '',
};

export default function Admin() {
    const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    images: yup.string().required('At least one image URL is required'),
    brand: yup.string().required('Brand is required'),
    category: yup.string().required('Category is required'),
    price: yup.number().typeError('Price must be a number').required('Price is required'),
    amount: yup.number().typeError('Amount must be a number').required('Amount is required'),
  });

  const handleSubmit = async (values: ProductFormData) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.post(
          'http://localhost:8080/product',
          {
            ...values,
            images: values.images.split(',').map((image: string) => image.trim()),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        navigate(`/product/${response.data.id}`)
        toast.success(`An item has been added to the list`, {
            position: "bottom-left",
          });
      } else {
        toast.error(`You do not have the permission for this action`, {
            position: "bottom-left",
          });
      }
    } catch (error) {
        console.log(error)
    }
  };


  const { handleSubmit: handleFormSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="AdminBody">
      <Infobar />
      <Navbar />
      <div className="innerAB">
        <h2>Add Product</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Description"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div>
            <input
              type="text"
              id="images"
              name="images"
              value={values.images}
              onChange={handleChange}
              placeholder="Image URLs (comma-separated)"
            />
            {errors.images && <div className="error">{errors.images}</div>}
          </div>
          <div>
            <input
              type="text"
              id="brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              placeholder="Brand"
            />
            {errors.brand && <div className="error">{errors.brand}</div>}
          </div>
          <div>
            <input
              type="text"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              placeholder="Category"
            />
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
          <div>
            <input
              type="text"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="Price"
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
          <div>
            <input
              type="text"
              id="amount"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
            {errors.amount && <div className="error">{errors.amount}</div>}
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}