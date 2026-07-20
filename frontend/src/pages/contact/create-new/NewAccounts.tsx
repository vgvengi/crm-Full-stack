import { ChangeEvent, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

type NewAccountsProps = {
  onClose: () => void;
};

function NewAccounts({ onClose }: NewAccountsProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactOwner: "",
    jobTitle: "",
    phoneNumber: "",
    lifeCycleStage: "",
    leadStatus: "",
  });
  const [isValid, setIsValid] = useState(false);
  const canContinue =
    isValid ||
    formData.firstName.trim() != "" ||
    formData.lastName.trim() != "";
  // const handleCreate = async () => {};
  const handleCreate = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create contact");
    }

    alert(data.message);
    onClose(); // Close the modal after successful creation
  } catch (error) {
    console.error(error);
    alert("Failed to create contact");
  }
};
  // console.log(canContinue);
  useEffect(() => {
    const timer = setTimeout(() => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      setIsValid(isValidEmail);
    }, 4000);

    return () => clearTimeout(timer);
  }, [formData.email]);

  //Input handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="fixed  max-w-none min-w-[300px]   
   inset-0 z-50 flex flex-col  bg-white w-150 ms-auto"
    >
      <header className="flex w-full  justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">New Account</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-black"
        >
          <MdCancel size={25} />
        </button>
      </header>
      <div className="h-120 flex flex-col overflow-x-auto">
        <div className="ms-auto pr-12 h-fit underline cursor-pointer">
          Edit this form
        </div>
        {/* Form --------------------------------------------------------------------- */}
        <form
          className="flex flex-col p-10 gap-7 [&_label]:font-bold
         text-gray-700"
        >
          <div className=" relative flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="h-8 border p-3"
              type="email"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            {formData.email && !isValid && (
              <p className="text-sm text-red-500 absolute  mt-16">
                Not a valid email address
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First name</label>
            <input
              className="h-8 border"
              type="text"
              id="firstName"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last name</label>
            <input
              className="h-8 border"
              type="text"
              id="lastName"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="relative mt-4">
            {!canContinue && (
              <div className="absolute inset-0 z-10 flex  justify-center bg-white/80">
                <p className=" w-auto h-auto text-wrap">
                  Start by entering a contact's email , name or both
                </p>
              </div>
            )}
            <div className="flex flex-col  gap-7">
              <div className="flex flex-col gap-2">
                <label htmlFor="contactOwner">Contact owner</label>
                <input
                  className="h-8 border"
                  type="text"
                  id="contactOwner"
                  value={formData.contactOwner}
                  name="contactOwner"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  className="h-8 border"
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  name="jobTitle"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  className="h-8 border"
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lifeCycleStage">Life Cycle Stage</label>
                <input
                  className="h-8 border"
                  type="text"
                  id="lifeCycleStage"
                  value={formData.lifeCycleStage}
                  name="lifeCycleStage"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="leadStatus">Lead Status</label>
                <input
                  className="h-8 border"
                  type="text"
                  id="leadStatus"
                  value={formData.leadStatus}
                  name="leadStatus"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* footer--------------------------------------------------------------------- */}
      <footer className="flex flex-row gap-10">
        <div>
          <button
            type="button"
            className={`p-3 border rounded-xl
           hover:bg-[#F0F0F0] ${
             canContinue
               ? "cursor-pointer hover:bg-[#F0F0F0]"
               : "cursor-not-allowed opacity-50 bg-gray-200"
           }`}
            disabled={!canContinue}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <div>
          <button
            className={`p-3 border rounded-xl 
           hover:bg-[#F0F0F0] 
           ${
             canContinue
               ? "cursor-pointer hover:bg-[#F0F0F0]"
               : "cursor-not-allowed opacity-50 bg-gray-200"
           }
           `}
            type="button"
            disabled={!canContinue}
          >
            Create and Add
          </button>
        </div>
        <div>
          <button
            type="button"
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

export default NewAccounts;
