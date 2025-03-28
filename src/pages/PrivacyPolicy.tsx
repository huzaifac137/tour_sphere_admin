import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../components/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverLink } from '../server/server';
const PrivacyPolicy = () => {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${serverLink}api/admin/privacypolicy`);
      setEditorContent(response.data?.data.data.text);
    };

    fetchData();
  }, []);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${serverLink}api/admin/updateprivacypolicy`,
        {
          text: editorContent,
        },
      );
      toast.success('Privay Policy Updated', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('Error Updating Privay Policy', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <Breadcrumb pageName="Privacy Policy" />
      <ToastContainer />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-auto">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Manage Privacy Policy
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            className="h-67"
          />
          <button
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-11"
            onClick={onSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
