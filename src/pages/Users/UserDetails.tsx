import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const pathname = useLocation();
  const userId = pathname.pathname.split('/')[2];

  const adminToken = useSelector((state: any) => state?.auth?.admin?.token);

  const user = async () => {
    try {
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/details/user/${userId}` , {
        headers : {
          Authorization: `Bearer ${adminToken}`,
        }
      });
      setUserData(res.data?.user);
    } catch (error) {
      alert('Unable to Fetch User Details');
    }
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <>
      <Breadcrumb pageName="User Details" />
      <ToastContainer />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          {userData?.profile && userData.profile !=="none" ? (
            <img
              src={userData?.profile}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          ) : (
            <img
              src={CoverOne}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          )}
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            {userData?.profile && userData.profile!=="none" ? (
              <img
                src={userData?.profile}
                className="h-full w-full object-fit rounded-full"
                alt="profile"
              />
            ) : (
              <img
                src={userSix}
                className="h-full w-full object-fit"
                alt="profile"
              />
            )}
          </div>
          <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              User Profile
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="font-medium">Full Name:</strong>{' '}
                {userData?.fullname}
              </p>
              <p>
                <strong className="font-medium">Email:</strong> {userData?.email ? userData?.email : 'No Email Provided'}
              </p>
              <p>
                <strong className="font-medium">Phone No:</strong> {userData?.phone }
              </p>
              <p>
                <strong className="font-medium">Type:</strong> {userData?.type }
              </p>
             
              <p>
                <strong className="font-medium">Created At:</strong> {new Date(userData?.createdAt).toLocaleDateString()}
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
