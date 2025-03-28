import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumb';

const CreateSubAdmin = () => {
  const adminToken = useSelector((state) => state.auth.admin?.token);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const response = await axios.post(
        `${serverLink}api/v1/admin-ki-apis/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      toast.success('Sub-admin created successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating sub-admin', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Sub-Admin" />
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create New Sub-Admin
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Username <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password <span className="text-meta-1">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
  className=" w-full bg-transparent hover:bg-[#F7630C] text-[#F7630C] font-semibold hover:text-white py-2 px-4 border border-[#F7630C] hover:border-transparent rounded dark:hover:bg-white dark:text-white dark:hover:text-[#F7630C] dark:border-white"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Sub-Admin'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSubAdmin;