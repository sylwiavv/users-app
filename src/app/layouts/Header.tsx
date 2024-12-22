// import { TUserRole } from "../../types/userTypes";
// import {currentLoggUser} from "../getCurrentUserDetails"

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import IconButton from "../components/atoms/IconButton/IconButton";
import { PowerIcon, QuestionmarkIcon } from "../../assets/icons/icons";
import { HeaderNavigation } from "./HeaderNavigation/HeaderNavigation";
import { useUserRole } from "../hooks/useUserRole";

// const getNavSettingsTabs = document.querySelector("#main-header") as HTMLElement;

export const Header = () => {
  // const user = await currentLoggUser();
  // const {user_avatar, first_name, last_name} = user
  // const isCurrentUserAdmin = user.role === "admin";
  const { currentUser } = useAuth();
  const { isAdmin } = useUserRole({ userFromPageDetails: currentUser });

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("../signin", { replace: true });
  };

  const getCurrentUserInfo = () => {
    navigate(`user-details/${currentUser.id}`);
  };

  const goToHome = () => {
    navigate(`/address-book`);
  };

  return (
    <header id="main-header" className="header">
      <nav className="navbar">
        <div className="logo" onClick={goToHome}>
          <p className="app-name">LEVERX</p>
          <p className="subtitle">EMPLOYEE SERVICES</p>
        </div>

        <HeaderNavigation isAdmin={isAdmin} />

        <div className="nav-actions">
          <IconButton
            label="Support"
            icon={<QuestionmarkIcon />}
            onClick={() => {
              return;
            }}
            className="support-btn rounded-button"
          />

          <button
            onClick={getCurrentUserInfo}
            className="user-info rounded-button"
          >
            <div className="user-info_avatar-wrapper">
              <img src={currentUser.user_avatar} alt="current user" />
            </div>
            <span className="user-name">
              {currentUser.first_name} {currentUser.last_name}
            </span>
          </button>

          <IconButton
            icon={<PowerIcon />}
            label=""
            onClick={handleLogout}
            className="rounded-button rounded current-user_logout"
          />
        </div>
      </nav>
    </header>
  );
};
