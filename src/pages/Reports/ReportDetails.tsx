import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { serverLink } from '../../server/server';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
const ReportDetails = () => {
  const adminToken = useSelector((state: any) => state.auth.admin?.accessToken);
  const [reportData, setreportData] = useState({});
  const pathname = useLocation();
  const reportId = pathname.pathname.split('/')[2];
  const report = async () => {
    try {
      const res = await axios.get(
        `${serverLink}api/admin/reportdetails/${reportId}`,
        {
          headers: { token: `Bearer ${adminToken}` },
        },
      );
      setreportData(res.data?.data?.report);
    } catch (error) {
      alert('Unable to Fetch Report Details');
    }
  };
  useEffect(() => {
    report();
  }, []);
  const isVideoLink = (url: any) => {
    if (!url) return false;
    const videoExtensions = [
      '.mp4',
      '.webm',
      '.ogg',
      '.MOV',
      '.avi',
      '.flv',
      '.mkv',
      '.wmv',
    ]; // Add more video extensions if needed
    const fileExtension = url.substring(url.lastIndexOf('.'));
    return videoExtensions.includes(fileExtension);
  };
  return (
    <>
      <Breadcrumb pageName="Report Details" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
          <div className="mt-4">
            <h3 className="mb-1.5 text-xl font-semibold text-black dark:text-white capitalize">
              Report By :
            </h3>
            <p className="font-medium">{reportData.By?.username}</p>
            <p className="font-medium">{reportData.By?.phone}</p>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-xl font-semibold text-black dark:text-white capitalize">
              Whom To report :
            </h3>
            <p className="font-medium">{reportData.post?.user?.username}</p>
            <p className="font-medium">{reportData.post?.user?.phone}</p>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-xl font-semibold text-black dark:text-white capitalize">
              Post Details :
            </h3>
            <p className="font-medium">{reportData.post?.description}</p>
            <div className="relative z-20 h-35 md:h-65">
              {isVideoLink(reportData?.post?.media[0]) ? (
                <video
                  src={reportData.post?.media[0]}
                  alt="post"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-contain object-center border shadow-lg border-[#e0e0e0]"
                  controls
                />
              ) : (
                <img
                  src={reportData.post?.media[0]}
                  alt="post"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-contain object-center border shadow-lg border-[#e0e0e0]"
                />
              )}
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-xl font-semibold text-black dark:text-white capitalize">
                Reason :
              </h3>
              <p className="font-medium">{reportData.reason}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDetails;
