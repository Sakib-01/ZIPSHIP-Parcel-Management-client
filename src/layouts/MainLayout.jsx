import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../providers/theme/Theme";
import Footer from "../components/shared/Footer";
const MainLayout = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="bg-background">
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
