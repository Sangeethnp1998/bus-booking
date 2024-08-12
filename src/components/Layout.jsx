import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./Sidebar/Sidebar";
import { useEffect } from "react";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('dashboard', { replace: true });
    }
  }, [location, navigate]);
  return (
    <div className="text-slate-950">
      <Header />
      <Sidebar />
      <main className="min-h-screen bg-slate-100 pl-60 pt-14">
        <Outlet />
      </main>
    </div>
  );
};
