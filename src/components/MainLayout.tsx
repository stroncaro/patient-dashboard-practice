import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-grow flex justify-center items-start p-6">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
