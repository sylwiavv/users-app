import { NavLink } from "react-router-dom";

const NAVIGATION = [
  { name: "Address Book", linkAddress: "/address-book", requiresAdmin: false },
  { name: "Settings", linkAddress: "/settings", requiresAdmin: true },
];

export const HeaderNavigation = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="nav-tabs">
      {NAVIGATION.map(({ name, linkAddress, requiresAdmin }) =>
        (!requiresAdmin || isAdmin) && (
          <NavLink
            key={name}
            to={linkAddress}
            className={({ isActive }) =>
              `nav-tabs__link ${isActive ? "active" : ""}`
            }
          >
            {name}
          </NavLink>
        )
      )}
    </div>
  );
};
