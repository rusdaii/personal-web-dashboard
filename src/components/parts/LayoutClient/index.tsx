'use client';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const LayoutClient = () => (
  <ToastContainer
    position="top-center"
    autoClose={1000}
    closeOnClick
    draggable
    pauseOnHover
    pauseOnFocusLoss={false}
    hideProgressBar
  />
);

export default LayoutClient;
