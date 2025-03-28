import { useSelector } from 'react-redux';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';

const Profile = () => {
  const admin = useSelector((state: any) => state.auth.admin);
  const adminProfilePic = useSelector((state: any) => state?.auth?.profile_pic);
  
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          {adminProfilePic ? 
          <img
            src={adminProfilePic}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          /> :   <img
          src={CoverOne}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        />}
        </div> 
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:w-44 sm:p-3">
            {adminProfilePic ? (
              <img
                src={adminProfilePic}
                className="h-full w-full object-cover rounded-full"
                alt="profile"
              />
            ) : (
              <img
                src={userSix}
                className="h-full w-full object-cover rounded-full"
                alt="profile"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white capitalize">
              {admin?.admin_username}
            </h3>
            <p className="font-medium">{admin?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
