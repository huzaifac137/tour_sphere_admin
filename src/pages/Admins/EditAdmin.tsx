import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { useLocation } from 'react-router-dom';
import { logoutSuccess } from '../../redux/slices/adminSlice';

const EditAdmin = () => {
  const dispatch = useDispatch();
  const adminToken = useSelector((state: any) => state.auth.admin?.accessToken);
  const loginAdminId = useSelector((state: any) => state.auth.admin?.userId?._id);
  const [adminData, setadminData] = useState({});
  const pathname = useLocation();
  const adminId = pathname.pathname.split('/')[2];
  const admin = async () => {
    try {
      const res = await axios.get(`${serverLink}api/auth/getUserById/${adminId}`, {
        headers: { token: `Bearer ${adminToken}` },
      });
      setadminData(res.data?.userInfo);
    } catch (error) {
      alert('Unable to Fetch Admin Details');
    }
  };
  useEffect(() => {
    admin();
  }, []);
  const [disable, setdisable] = useState(false);
  const onchange = (e: any) => {
    setadminData({ ...adminData, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e: any) => {
    setdisable(true);
    e.preventDefault();
    try {
      await axios.put(
        `${serverLink}api/auth/editProfile/${adminId}`,
        adminData,
        {
          headers: { token: `Bearer ${adminToken}` },
        },
      );
      setdisable(false);
      e.target.reset();
      toast.success('Admin Updated', {
        position: toast.POSITION.TOP_RIGHT,
      });
      const updatedEmail = adminData.email;
      const prevEmail = loginAdminId === adminId ? loginAdminId : '';
      if (updatedEmail !== prevEmail && adminId === loginAdminId) {
        dispatch(logoutSuccess());
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
      <Breadcrumb pageName="Update Admin" />
      <ToastContainer />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Admin Update Form
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
                    id="Name"
                    type="text"
                    value={adminData?.Name}
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
                    value={adminData?.email}
                    placeholder="Enter email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                disabled={disable ? true : false}
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray ${
                  disable ? 'cursor-wait' : ''
                }`}
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAdmin;
