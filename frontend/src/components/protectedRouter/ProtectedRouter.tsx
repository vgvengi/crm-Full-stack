import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../auth";

export default function ProtectedRouter() {
  return isAuthenticated() ? <Outlet /> : <Navigate replace to="/" />;
}