import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverLink } from '../../server/server';

const AddAdmin = () => {
  const adminToken = useSelector(
    (state: any) => state.auth.admin?.accessToken,
  );
  const [disable, setdisable] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    image: '',
  });
  const onchange = (e: any) => {
    if (e.target.type === 'file') {
      setData({ ...data, [e.target.id]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.id]: e.target.value });
    }
  };
  const onSubmit = async (e: any) => {
    setdisable(true);
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      toast.error('Password Not Matched', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setdisable(false);
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append('Name', data.username);
      formdata.append('email', data.email);
      formdata.append('password', data.password);
      formdata.append('image', data.image);
      formdata.append('confirmpassword', data.confirmpassword);
      if (data.password === data.confirmpassword) {
        await axios.post(`${serverLink}api/Admin/registerAdmin`, formdata, {
          headers: { token: `Bearer ${adminToken}` },
        });
        setdisable(false);
        e.target.reset();
        toast.success('Admin Added', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error('Error Adding Admin', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setdisable(false);
      }
    } catch (error) {
      setdisable(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <Breadcrumb pageName="Register New Admin" />
      <ToastContainer />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Admin Form
            </h3>
          </div>
          <form action="#" onSubmit={onSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    onChange={onchange}
                    required
                    id="username"
                    type="text"
                    placeholder="Enter name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    onChange={onchange}
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={onchange}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Confirm Password <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={onchange}
                  id="confirmpassword"
                  type="password"
                  placeholder="Enter your confirm password"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Image
                </label>
                <input
                  onChange={onchange}
                  id="image"
                  required
                  multiple={false}
                  accept="image/*"
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <button
                disabled={disable ? true : false}
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray ${
                  disable ? 'cursor-wait' : ''
                }`}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
