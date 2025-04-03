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

const SubAdmins = () => {
    const navigate= useNavigate();
  const adminToken = useSelector((state: any) => state.auth.admin?.token);
  const adminId = useSelector((state: any) => state.auth.admin?.adminId);
  const [isLoading, setisLoading] = useState(true);
  // Handle All Admins
  const [adminsData, setadminsData] = useState([]);
  const allData = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/admins`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setadminsData(res.data.admins);
      console.log(res.data.admins)
      setisLoading(false);
    } catch (error) {      
      setisLoading(false);
      alert('Error Getting All admins');
    }
  };
  useEffect(() => {
    allData();
  }, []);
 

 
  // handle pagination
  const [pageNmber, setPageNmber] = useState(0);
  const itemsPerPage = 6;
  const pageVisited = pageNmber * itemsPerPage;
  const displayItems = adminsData?.slice(
    pageVisited,
    pageVisited + itemsPerPage,
  );
  const pageCount = Math.ceil(adminsData?.length / itemsPerPage);
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
      <Breadcrumb pageName="Other Admins" />
      {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
      <ToastContainer />
        
      <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-[#F7630C] text-[#F7630C] font-semibold hover:text-white py-2 px-4 border border-[#F7630C] hover:border-transparent rounded dark:hover:bg-white dark:text-white dark:hover:text-[#F7630C] dark:border-white"
             onClick={() => navigate('/admins/register')}
          >
            Create New
          </button>
        </div>
      {adminsData?.length !== 0 ? (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Full Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    {/* 
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Phone Number
                    </th> */}
                  
                  </tr>
                </thead>
                <tbody>
                  {displayItems?.map((admin) => (
                    <tr>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white capitalize">
                          {admin?.name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {admin?.email}
                        </p>
                      </td>
                      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {admin?.phone_no && admin?.phone_no !=="" ? admin?.phone_no : "Number not provided" }
                        </p>
                      </td> */}

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
              'page-link relative block py-1.5 px-3 border-0 bg-white text-[#F7630C] dark:bg-[#ffffff] dark:text-[#F7630C] font-bold outline-none transition-all duration-300 rounded-full hover:opacity-90 shadow-md focus:shadow-md'
            }
            disabledClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none'
            }
          />
        </>
      ) : (
        'Currently, there are no Admins data Available.'
      )}
    </>
  );
};

export default SubAdmins;
