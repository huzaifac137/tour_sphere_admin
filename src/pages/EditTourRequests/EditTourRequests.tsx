import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ReactPaginate from 'react-paginate';
import { GrFormNext } from 'react-icons/gr';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { MdMoney } from 'react-icons/md';
const EditTourRequests = () => {
  const adminToken = useSelector((state: any) => state.auth.admin?.token);
  const [isLoading, setisLoading] = useState(true);
  // Handle All Users
  const [usersData, setusersData] = useState([]);
  const allData = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/requests/tours/for-edit`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log(res?.data?.editTourRequests)
      setusersData(res.data?.editTourRequests);
      setisLoading(false);
    } catch (error) {
      alert('Error Getting All Senders');
      setisLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchDataAndSetPage = async () => {
      const storedPage = localStorage.getItem('editTourListPage');
      if (storedPage) {
        const pageNumber = parseInt(storedPage);
        await allData();
        setPageNmber(pageNumber);
        localStorage.removeItem('editTourListPage');
      } else {
        await allData();
      }
    };
    fetchDataAndSetPage();
  }, []);
   
  const handleAccept = async (id: any) => {
    try {
      const res = await axios.patch(`${serverLink}api/v1/admin-ki-apis/requests/tours/for-edit/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      toast.success('Tour Request Accepted', {
        position: toast.POSITION.TOP_RIGHT,
      });
      allData(); // Refresh the list
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleReject = async (id: any) => {
    try {
      const res = await axios.delete(`${serverLink}api/v1/admin-ki-apis/requests/tours/for-edit/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      toast.success('Tour Request Rejected', {
        position: toast.POSITION.TOP_RIGHT,
      });
      allData(); // Refresh the list
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  //

  // Handle User Details
  const navigate = useNavigate();
  const detailsPage = (id: any) => {
    localStorage.setItem('editTourListPage', pageNmber.toString());
    navigate(`/edit-tour-requests/${id}`);
  };

  // handle pagination
  const [pageNmber, setPageNmber] = useState(0);
  const itemsPerPage = 6;
  const pageVisited = pageNmber * itemsPerPage;
  const displayItems = usersData?.slice(
    pageVisited,
    pageVisited + itemsPerPage,
  );
  const pageCount = Math.ceil(usersData?.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNmber(selected);
  };
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
     <Breadcrumb pageName="Edit Tour Requests" />
      {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
      <ToastContainer />
      <form action="#">
        <div className="px-6.5 pt-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          </div>
        </div>
      </form>
      {usersData?.length !== 0 ? (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Title
                    </th>
                     <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Price
                    </th> 
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Images
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Date
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems?.map((user) => (
                    <tr key={Math.random()}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11" key={user?._id}>
                        <h5 className="font-medium text-black dark:text-white">
                          {user?.title && user?.title !=="" ? user.title : "(Title not provided)" }
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.price ? user.price : "(Not Modified)"}
                        </p>
                      </td> 

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {user?.images && user.images.length > 0 ? (
                          <img
                            src={user.images[0]}
                            alt="Tour"
                            className="w-20 h-20 object-cover rounded"
                          />
                        ) : (
                          <p className="text-black dark:text-white">(No image)</p>
                        )}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {moment(user?.createdAt).fromNow()}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                        <button
                            className="hover:text-primary"
                            onClick={() => {
                              detailsPage(user?._id);
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:text-green-500"
                            onClick={() => {
                              handleAccept(user?._id);
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                            </svg>
                          </button>
                          <button
                            className="hover:text-[#EE1010]"
                            onClick={() => {
                              handleReject(user?._id);
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
              </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <GrFormNext className="fill-primary dark:fill-whit text-xl" />
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={pageNmber}
            previousLabel={
              <GrFormNext className="fill-primary dark:fill-whit text-xl rotate-180" />
            }
            renderOnZeroPageCount={null}
            containerClassName={
              'flex justify-center items-center gap-4 text-[14px] list-style-none'
            }
            pageLinkClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
            }
            previousLinkClassName={'previousBttn'}
            activeLinkClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-white text-[#F7630C] dark:bg-[#FFFFFF] dark:text-[#F7630C] font-bold outline-none transition-all duration-300 rounded-full hover:opacity-90 shadow-md focus:shadow-md'
            }
            disabledClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none'
            }
          />
        </>
      ) : (
        'Currently, there are no Edit Tour Requests Found.'
      )}
    </>
  );
};

export default EditTourRequests;
