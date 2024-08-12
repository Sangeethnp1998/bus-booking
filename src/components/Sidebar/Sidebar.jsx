import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-10 h-screen w-60 border-r border-slate-200 bg-white pt-14 font-semibold">
      <nav className="pt-6">
        <ul>
          <li>
            <SidebarLink to="dashboard">Dashboard</SidebarLink>
          </li>
          <li>
            <SidebarLink to="reservation">Reservation</SidebarLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
