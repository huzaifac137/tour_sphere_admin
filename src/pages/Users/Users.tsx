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
const Users = () => {
  const adminToken = useSelector((state: any) => state.auth.admin?.token);
  const [isLoading, setisLoading] = useState(true);
  // Handle All Users
  const [usersData, setusersData] = useState([]);
  const allData = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/users`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setusersData(res.data?.users);
      setisLoading(false);
    } catch (error) {
      alert('Error Getting All Senders');
      setisLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchDataAndSetPage = async () => {
      const storedPage = localStorage.getItem('userListPage');
      if (storedPage) {
        const pageNumber = parseInt(storedPage);
        await allData();
        setPageNmber(pageNumber);
        localStorage.removeItem('userListPage');
      } else {
        await allData();
      }
    };
    fetchDataAndSetPage();
  }, []);

  const handledelte = async (id: any) => {
    try {
      const res = await axios.delete(`${serverLink}api/v1/admin-ki-apis/users-admins/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const checked = usersData.filter((lis: any) => lis._id !== id);
      setusersData(checked);
      console.log(res.data);
      toast.success('User Deleted', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(()=>{
      navigate("/users");
      },1500);
    } catch (error) {
      toast.error(error?.response?.data?.message , {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };



  // Handle Filter Functionality
  const [filterVariables, setfilterVariables] = useState({
    username: '',
    email: '',
  });
  const onchange = (e: any) => {
    setfilterVariables({ ...filterVariables, [e.target.id]: e.target.value });
  };
  const filterUser = async (e: any) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await axios.get(
        `${serverLink}api/v1/admin-ki-apis/search/users?username=${filterVariables.username}` ,{headers :{
          Authorization : `Bearer ${adminToken}`
        }} );
      setusersData(res.data?.users);
      setisLoading(false);
      setfilterVariables({
        username: '',
        email: '',
      })
    } catch (error) {
      alert(error?.response?.data?.message);
      setisLoading(false);
    }
  };

  // Handle User Details
  const navigate = useNavigate();
  const userDetailsPage = (id: any) => {
    localStorage.setItem('userListPage', pageNmber.toString());
    navigate(`/user/${id}`);
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
      <Breadcrumb pageName="Users" />
      {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
      <ToastContainer />
      <form action="#">
        <div className="px-6.5 pt-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="enter username"
                id="username"
                onChange={onchange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-[#F7630C] text-[#F7630C] font-semibold hover:text-white py-2 px-4 border border-[#F7630C] hover:border-transparent rounded dark:hover:bg-white dark:text-white dark:hover:text-[#F7630C] dark:border-white"
            onClick={filterUser}
          >
            Search
          </button>
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
                      Full Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Joined
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
                          {user?.name && user?.name !=="" ? user.name : "(Name not provided)" }
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.email ? user.email : "(Email not provided)"}
                        </p>
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
                              userDetailsPage(user?._id);
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
                            className="hover:text-[#EE1010]"
                            onClick={() => {
                              handledelte(user?._id);
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
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
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
              'page-link relative block py-1.5 px-3 border-0 bg-white text-[#F7630C] dark:bg-[#ffffff] dark:text-[#F7630C] font-bold outline-none transition-all duration-300 rounded-full hover:opacity-90 shadow-md focus:shadow-md'
            }
            disabledClassName={
              'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none'
            }
          />
        </>
      ) : (
        'Currently, there are no User Found.'
      )}
    </>
  );
};

export default Users;
