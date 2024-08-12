import { NavLink } from "react-router-dom";

export const SidebarLink = (props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive
          ? "sidebar-link bg-slate-50 font-semibold"
          : "sidebar-link font-medium"
      }
    />
  );
};
