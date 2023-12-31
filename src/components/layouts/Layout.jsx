import Nav from "../Nav";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
