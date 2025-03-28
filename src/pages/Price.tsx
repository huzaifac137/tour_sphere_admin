import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverLink } from '../server/server';
import { useLocation } from 'react-router-dom';
import { FaEuroSign } from 'react-icons/fa';

const Price = () => {
  const dispatch = useDispatch();
  const adminToken = useSelector((state: any) => state.auth.admin?.accessToken);
  const [priceData, setpriceData] = useState('');
  const pathname = useLocation();
  const adminId = pathname.pathname.split('/')[2];
  const price = async () => {
    try {
      const res = await axios.get(`${serverLink}api/auth/getprice`, {
        headers: { token: `Bearer ${adminToken}` },
      });
      setpriceData(res.data?.price);
    } catch (error) {
      alert('Unable to Fetch Price Details');
    }
  };
  useEffect(() => {
    price();
  }, []);
  const [disable, setdisable] = useState(false);
  const onchange = (e: any) => {
    setpriceData(e.target.value);
  };
  const onSubmit = async (e: any) => {
    setdisable(true);
    e.preventDefault();
    try {
      await axios.put(
        `${serverLink}api/auth/updateprice`,
        { price: priceData },
        {
          headers: { token: `Bearer ${adminToken}` },
        },
      );
      setdisable(false);
      toast.success('Price Updated', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setdisable(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Price" />
      <ToastContainer />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Price Update Form
            </h3>
          </div>
          <form action="#" onSubmit={onSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Price per Person <span className="text-meta-1">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      onChange={onchange}
                      required
                      id="username"
                      type="number"
                      value={priceData?.price}
                      placeholder="Enter price"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <FaEuroSign />
                  </div>
                </div>
              </div>
              <button
                disabled={disable ? true : false}
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium xl:w-1/2 text-gray ${
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

export default Price;
