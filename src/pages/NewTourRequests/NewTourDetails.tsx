import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CoverOne from '../../images/cover/cover-01.png';
import Loading from '../../images/loading.png';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const NewTourDetails = () => {
  const [userData, setUserData] = useState({});
  const pathname = useLocation();
  const editTourRequestId = pathname.pathname.split('/')[2];

  const adminToken = useSelector((state: any) => state?.auth?.admin?.token);
 
  const user = async () => {
    try {
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/requests/tours/unapproved/${editTourRequestId}` , {
        headers : {
          Authorization: `Bearer ${adminToken}`,
        }
      });
      setUserData(res.data?.tour);
      console.log(res.data.tour);
    } catch (error) {
      alert('Unable to Fetch new tour request Details');
    }
  };

  useEffect(() => {
    user();
  }, []);
  

  return (
    <>
      <Breadcrumb pageName="New Tour Request Details" />
      <ToastContainer />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          {userData?.images && userData.images.length > 0 ? (
            <img
              src={userData.images[0]}
              alt="tour cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          ) : (
            <img
              src={CoverOne}
              alt="default cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          )}
        </div>
        <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
          <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              New Tour Request Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p>
                  <strong className="font-medium">Title:</strong>{' '}
                  {userData?.title || 'Not provided'}
                </p>
                <p>
                  <strong className="font-medium">Price:</strong>{' '}
                  {userData?.price ? `${userData.price} ${userData.currency}` : 'Not provided'}
                </p>
                <p>
                  <strong className="font-medium">Duration:</strong>{' '}
                  {userData?.duration ? `${userData.duration} days` : 'Not provided'}
                </p>
                <p>
                  <strong className="font-medium">Country:</strong>{' '}
                  {userData?.country || 'Not provided'}
                </p>
                <p>
                  <strong className="font-medium">Language:</strong>{' '}
                  {userData?.language || 'Not provided'}
                </p>
              </div>
              <div className="space-y-3">
                {/* <p>
                  <strong className="font-medium">Status:</strong>{' '}
                  <span className={`${userData?.is_approved ? 'text-green-500' : 'text-yellow-500'}`}>
                    {userData?.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </p> */}
                <p>
                  <strong className="font-medium">Created:</strong>{' '}
                  {new Date(userData?.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong className="font-medium">Last Updated:</strong>{' '}
                  {new Date(userData?.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Description:</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {userData?.description || 'No description provided'}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Tour Images:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Tour image ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTourDetails;
