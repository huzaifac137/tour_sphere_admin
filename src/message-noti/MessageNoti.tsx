import  {NotificationPayload} from "firebase/messaging";
import "./MessageNoti.css";

const MessageNoti = ({ notification} : {notification : NotificationPayload}) => {
    return (
      <>
        <div id="notificationHeader">
          {/* image is optional */}
          {notification.image && (
            <div id="imageContainer">
              <img src={notification?.image} width={100} />
            </div>
          )}
          <span>{notification?.title}</span>
        </div>
        <div id="notificationBody">{notification?.body}</div>
      </>
    );
  };
  
  export default MessageNoti;