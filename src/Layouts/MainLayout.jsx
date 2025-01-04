import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const MainLayout = () => {
  return (
    <div>
       {/* Navbar */}
       <Navbar/>

       {/* Outlet */}
       <div className="min-h-[calc(100vh-600px)] max-w-[2400px] mx-auto">
        <Outlet />
      </div>

       {/* Footer */}
       <Footer/>
    </div>
  );
};

export default MainLayout;