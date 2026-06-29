import { Route, Routes } from "react-router-dom";
import Dashboard from "../layouts/dashboard/Dashboard";
import Contacts from "../pages/contact/Contacts";
import Companies from "../pages/companies/Companies";
import Home from "../pages/home/Home";

export default function routes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route  path="contacts" element={<Contacts />} />
          <Route  path="companies" element={<Companies />} />
        </Route>
      </Routes>
    </div>
  );
}
