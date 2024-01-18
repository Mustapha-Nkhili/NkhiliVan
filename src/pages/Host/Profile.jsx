import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const date = user.lastLoginAt
    ? new Date(parseInt(user.createdAt))
    : new Date();

  return (
    <div className="profile container">
      <div className="container">
        <div className="profile-imgs-container">
          <img
            src={"/src/assets/imgs/Hero-Banner-Placeholder-Light.png"}
            alt="this is the banner of this profile"
            className="profile-banner"
          />
          <img
            src={user.img}
            alt="this is the profile picture"
            className="profile-picture"
          />
        </div>
        <div className="content">
          <div className="flex-sb-ctr padding-t-b-10">
            <h1>My profile</h1>
            <span className="user-last-login">
              <span>Last login: </span>
              <span>
                {date.toDateString()} -{" "}
                {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}
                :
                {date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes()}
              </span>
            </span>
          </div>
          <div className="flex-sb-ctr padding-t-b-10">
            <h2 className="user-name">{user.name}</h2>
            <span className="user-phone-number">{user.phoneNumber}</span>
          </div>
          <h2 className="padding-t-b-10"> {user.email}</h2>
        </div>
      </div>
    </div>
  );
}
