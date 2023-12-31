import Layout from "./components/layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans.jsx";
import VanDetails from "./pages/Vans/VanDetails";
import HostLayout, {
  loader as hostLoader,
} from "./components/layouts/HostLayout.jsx";
import Dashboard, {
  loader as hostDashboardLoader,
} from "./pages/Host/Dashboard.jsx";
import Income, { loader as hostIncomeLoader } from "./pages/Host/Income.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import HostVans, {
  loader as hostVansLoader,
} from "./pages/Host/Host vans/HostVans.jsx";
import HostVanDetails, {
  loader as hostVanDetailslsLoader,
} from "./pages/Host/Host vans/HostVanDetails.jsx";
import HostVanInfo from "./pages/Host/Host vans/HostVanInfo.jsx";
import HostVanPricing from "./pages/Host/Host vans/HostVanPricing.jsx";
import HostVanPhotos from "./pages/Host/Host vans/HostVanPhotos.jsx";
import Error from "./components/Error.jsx";
import NotFound from "./pages/NoteFound.jsx";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import "./server";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} loader={vansLoader} />
          <Route path="vans/:id" element={<VanDetails />} />
          <Route
            path="login"
            element={<Login />}
            loader={loginLoader}
            action={loginAction}
          />
          <Route path="host" element={<HostLayout />} loader={hostLoader}>
            <Route index element={<Dashboard />} loader={hostDashboardLoader} />
            <Route
              path="income"
              element={<Income />}
              loader={hostIncomeLoader}
            />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
            <Route
              path="vans/:id"
              element={<HostVanDetails />}
              loader={hostVanDetailslsLoader}
            >
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
