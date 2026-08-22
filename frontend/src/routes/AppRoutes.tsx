import { Route, Routes } from "react-router-dom";
import Dashboard from "../layouts/dashboard/Dashboard";
import Contacts from "../pages/contact/Contacts";
import Companies from "../pages/companies/Companies";
import Home from "../pages/home/Home";
import Deals from "@/pages/deals/Deals";
import Restore from "@/pages/deals/editsDeals/Restore";
import EditProperties from "@/pages/deals/editsDeals/EditProperties";
import GeneralProperty from "@/pages/deals/editsDeals/general/GeneralProperty";

export default function routes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="companies" element={<Companies />} />
          <Route path="deals" element={<Deals />} />
          <Route path="deals/restore" element={<Restore />} />
          <Route path="deals/edit-properties" element={<EditProperties />} />
          <Route path="deals/general" element={<GeneralProperty />} />
        </Route>
      </Routes>
    </div>
  );
}
