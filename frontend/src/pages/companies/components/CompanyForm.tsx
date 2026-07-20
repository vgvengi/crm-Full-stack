import { useState, type ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";

type close = {
  onClose: () => void;
};
function CompanyForm({ onClose }: close) {
  const [data, setData] = useState({
    companyDomainName: "",
    companyName: "",
    companyOwner: "",
    dateCreated: "",
    phoneNumber: "",
    lastActivityDate: "",
    city: "",
    CountryRegion: "",
    industry: "",
  });
  const validate =
    data.companyDomainName.trim() !== "" || data.companyName.trim() !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveDataToBackEnd = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create companies");
      }
      alert(data.message);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create contact");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b h-15 w-full flex flex-row ">
        <header
          className="flex flex-row  justify-between
         gap-10 text-[20px] px-10 py-3 "
        >
          <h2>Create Company</h2>
          <div>
            <button
              className="hover:bg-[#EDEDED] rounded-2xl p-2"
              onClick={onClose}
            >
              <IoClose size={20} />
            </button>
          </div>
        </header>
      </div>
      <div className="h-120 flex flex-col overflow-x-auto">
        <div className="ms-auto pr-12 h-fit underline cursor-pointer">
          Edit this form
        </div>
        {/* Form -------------------------------------------------------------------- */}
        <form
          className="flex flex-col p-10 gap-7 [&_label]:font-bold
         text-gray-700"
        >
          <div className=" relative flex flex-col gap-2">
            <label htmlFor="companyDomainName">Company domain name</label>
            <input
              id="companyDomainName"
              className="h-8 border p-3"
              type="email"
              name="companyDomainName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              name="companyName"
              className="h-8 border"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="relative mt-4">
            {!validate && (
              <div className="absolute inset-0 z-10 flex  justify-center bg-white/80">
                <p className=" w-auto h-auto text-wrap">
                  Start by entering a domain name, an account name, or both.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="companyOwner">Company Owner</label>
              <input
                id="companyOwner"
                name="companyOwner"
                className="h-8 border"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="relative mt-4">
              <div className="flex flex-col  gap-7">
                <div className="flex flex-col gap-2">
                  <label htmlFor="industry">Industry</label>
                  <input
                    id="industry"
                    name="industry"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="type">Type</label>
                  <input
                    id="type"
                    name="type"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="stateRegion">State/Region</label>
                  <input
                    id="stateRegion"
                    name="stateRegion"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="numberOfEmployees">Number of employees</label>
                  <input
                    id="numberOfEmployees"
                    name="numberOfEmployees"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="annualRevenue">Annual revenue</label>
                  <input
                    id="annualRevenue"
                    name="annualRevenue"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="timeZone">Time zone</label>
                  <input
                    id="timeZone"
                    name="timeZone"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="LinkedInCompanyPage">
                    LinkedIn company page
                  </label>
                  <input
                    id="LinkedInCompanyPage"
                    name="LinkedInCompanyPage"
                    className="h-8 border"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* footer--------------------------------------------------------------------- */}
      <footer className="flex flex-row gap-10">
        <div>
          <button
            className={`p-3 border rounded-xl 
           hover:bg-[#F0F0F0] ${!validate}? 
          "cursor-pointer hover:bg-[#F0F0F0]"
               : "cursor-not-allowed opacity-50 bg-gray-200" `}
            disabled={validate}
            onClick={saveDataToBackEnd}
          >
            Create
          </button>
        </div>
        <div>
          <button
            className="p-3 border rounded-xl cursor-not-allowed
           hover:bg-[#F0F0F0]"
          >
            Create and Add
          </button>
        </div>
        <div>
          <button
            className="p-3 border rounded-xl cursor-pointer 
          hover:bg-[#F0F0F0]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CompanyForm;
