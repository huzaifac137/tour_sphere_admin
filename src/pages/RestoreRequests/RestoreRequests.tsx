import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ReactPaginate from 'react-paginate';
import { GrFormNext } from 'react-icons/gr';
import axios from 'axios';
import { serverLink } from '../../server/server';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from '../../common/Loader';

const RestoreRequests = () => {
  const adminToken = useSelector((state: any) => state.auth.admin?.token);
  const [isLoading, setIsLoading] = useState(true);
  const [requestsData, setRequestsData] = useState([]);

  const allData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${serverLink}api/admin-ki-apis/restore-requests/all`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setRequestsData(res.data?.restoreRequests);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error Getting Restore Requests', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    allData();
  }, []);

  const handleAcceptReject = async (id: any , action : "accept" | "reject") => {
    try {
      const res = await axios.patch(`${serverLink}api/admin-ki-apis/restore-requests/accept-reject`, {
        requestId : id,
        action : action,
      }, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const updatedRequests = requestsData.filter((req: any) => req._id !== id);
      setRequestsData(updatedRequests);
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message , {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

 

  // handle pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
  const pageVisited = pageNumber * itemsPerPage;
  const displayItems = requestsData?.slice(
    pageVisited,
    pageVisited + itemsPerPage,
  );
  const pageCount = Math.ceil(requestsData?.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
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
      <Breadcrumb pageName="Restore Requests" />
      <ToastContainer />
      {requestsData?.length !== 0 ? (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      User
                    </th>
                   
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems?.map((request) => (
                    <tr key={request?._id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {request?.user?.email || "(Email not provided)"}
                        </h5>
                      </td>
                      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {moment(request?.createdAt).fromNow()}
                        </p>
                      </td> */}
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => handleAcceptReject(request?._id , "accept")}
                          >
                            Accept
                          </button>
                          <button
                            className="hover:text-[#EE1010]"
                            onClick={() => handleAcceptReject(request?._id , "reject")}
                          >
                            Reject
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
              'page-link relative block py-1.5 px-3 border-0 bg-[#F7630C] dark:bg-[#ffffff] dark:text-[#F7630C] text-[#ffffff] outline-none transition-all duration-300  hover:bg-gray-600 shadow-md focus:shadow-md'
            }
            disabledClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none'
            }
          />
        </>
      ) : (
        'Currently, there are no Restore Requests.'
      )}
    </>
  );
};

export default RestoreRequests;