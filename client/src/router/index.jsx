import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { lazy } from "react";
import PageLayout from "../components/layout";

const Dashboard = lazy(() => import("../pages/client/dashboard"));
const Login = lazy(() => import("../components/auth/Login"));
const CheckTask = lazy(() => import("../pages/client/CheckoutPage"));
const DriverTask = lazy(() => import("../pages/driver/index"));
const WasherTask = lazy(() => import("../pages/washer"));
const LandingPage = lazy(() => import("../pages/landing"));
const Admin = lazy(() => import("../pages/admin"));
const AdminRole = lazy(() => import("../pages/admin/role/admin-role"));
const DriverRole = lazy(() => import("../pages/admin/role/driver-role"));
const WasherRole = lazy(() => import("../pages/admin/role/washer-role"));

function RoutesDefined() {
  return (
    <Router>
      <PageLayout>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/client/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/driver/checktask" element={<DriverTask />} />
            <Route path="/client/checktask" element={<CheckTask />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/washer/checktask" element={<WasherTask />} />

            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminRole />} />
              <Route path="driver-role" element={<DriverRole />} />
              <Route path="washer-role" element={<WasherRole />} />
            </Route>

            {/* Add other routes as needed */}
          </Routes>
        </Suspense>
      </PageLayout>
    </Router>
  );
}
export default RoutesDefined;
