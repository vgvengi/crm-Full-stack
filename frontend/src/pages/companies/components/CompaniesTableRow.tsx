import { useEffect, useState } from "react";
type dataType = {
  id: number;
  companyName: string;
  companyOwner: string;
  dateCreated: string;
  phoneNumber: string;
  lastActivityDate: string;
  city: string;
  CountryRegion: string;
  industry: string;
};
export default function CompaniesTableRow() {
  const fields = [
    { id: 1, label: "Company name" },
    { id: 2, label: "Company owner" },
    { id: 3, label: "Create date" },
    { id: 4, label: "Phone number" },
    { id: 5, label: "Last activity date" },
  ];
  const [showData, setShowData] = useState<dataType[]>([]);
  // fetchData is used for fetching data from backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/companies");
      if(!response.ok){
        throw new Error("Failed to fetch companies")
      }
      const data = await response.json();
      setShowData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border mt-4">
        <table className="min-w-[1500px] w-full">
          <thead className="bg-[#cccccc]">
            <tr className="border-b">
              {fields.map((field) => (
                <th key={field.id}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showData.map((show) => (
              <tr key={show.id}>
                <td>{show.companyName}</td>
                <td>{show.companyOwner}</td>
                <td>{show.dateCreated}</td>
                <td>{show.phoneNumber}</td>
                <td>{show.lastActivityDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
