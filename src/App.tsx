import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/Config";

import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import OTPVerification from './pages/Authentication/OTPVerification';
import { useDispatch, useSelector } from 'react-redux';
import { SampleMap } from './pages/SampleMap';
import { io, Socket } from 'socket.io-client';
import { serverLink } from './server/server';
// import ChatMessages from './pages/ChatSupport/SingleChatMessages';
import MessageNoti from './message-noti/MessageNoti';
import { toast, ToastContainer } from 'react-toastify';
import { deviceTokenSuccess } from './redux/slices/adminSlice';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const adminId = useSelector((state: any) => state.auth.admin?.adminId);
  // const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  // // Connect to the server
  // socketRef.current = io(serverLink , {
  //   transports: ['websocket']
  // });
  
  // // Event listener for connection
  // socketRef?.current.on("connect", () => {
  //   console.log("Connected to server");
  //  if(adminId){
  //   socketRef.current?.emit("add-user" ,adminId );
  //  }
    
  // });
  
  // // Event listener for disconnection
  // socketRef.current.on("disconnect", () => {
  //   console.log("Disconnected from server");
  // });

  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedin);
  // const isLoggedIn = useSelector((state: any) => state.auth.isLoggedin);
  const admin = useSelector(
    (state: any) => state.auth?.admin?.token
  );
  console.log(admin);


  // const adminType = useSelector((state: any) => state.auth.admin?.adminType);


  // const { VITE_APP_VAPID_KEY } = import.meta.env;

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        // vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
      dispatch(deviceTokenSuccess(token));

    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  onMessage(messaging, (payload) => {
    // toast(payload.notification?.title + " " + payload.notification?.body);
    toast(<MessageNoti notification={payload.notification!} />)
  });

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <ToastContainer
      position='top-right'
      />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<DefaultLayout />}>
              <Route index element={<Dashboard />} />
              {/* <Route path='/chats/messages/:yourId/:receiverId' element={ <ChatMessages socketRef={socketRef} />} /> */}
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <route.component  />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </>
        ) : (
          <>
            <Route path="/auth/forgetpassword" element={<ForgetPassword />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/otpverification" element={<OTPVerification />} />
            <Route path="*" element={<Navigate replace to="/auth/signin" />} />
          </>
        )}
        <Route
          path="*"
          element={
            isLoggedIn && admin  ? (
              <Navigate replace to="/" />
            ) : (
              <PageNotFound />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
