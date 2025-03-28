import axios from 'axios';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import { serverLink } from '../../server/server.ts';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardThree from '../../components/CardThree.tsx';
const Dashboard = () => {
  const adminToken = useSelector(
    (state: any) => state.auth.admin?.token,
  );
 
  const [dashboardData, setdashboardData] = useState({noOfUsers: 0 , noOfAdmins: 0 });
  const dashboard = async () => {
    try {
      const response = await axios.get(`${serverLink}api/v1/admin-ki-apis/no-of/users-admins`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setdashboardData(response.data);
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };
  useEffect(() => {
      dashboard();
  }, []);
  
  return (
    <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardOne usersCount={dashboardData?.noOfUsers} />
            <CardFour adminsCount={dashboardData?.noOfAdmins} />
          </div>
          <div className="w-full mt-4  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne heading={"Users"} userGraphData={dashboardData?.users} />
          </div>
          <div className="w-full mt-4  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ChartOne heading={"Admins"} userGraphData={dashboardData?.admins} />
          </div>
        </>
  );
};

export default Dashboard;
