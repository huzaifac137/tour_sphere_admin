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
      const res = await axios.get(`${serverLink}api/v1/admin-ki-apis/requests/tours/unapproved`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setusersData(res.data?.tours);
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
      const res = await axios.patch(`${serverLink}api/v1/admin-ki-apis/requests/tours/unapproved/accept/${id}`, {}, {
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
      const res = await axios.delete(`${serverLink}api/v1/admin-ki-apis/requests/tours/unapproved/${id}`, {
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
  const userDetailsPage = (id: any) => {
    localStorage.setItem('editTourListPage', pageNmber.toString());
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
     
    </>
  );
};

export default EditTourRequests;
