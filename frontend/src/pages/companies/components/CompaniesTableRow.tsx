import { useEffect, useState } from "react";
type company = {
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
    { id: 5, label: "Last Activity Date" },
    { id: 6, label: "City" },
    { id: 7, label: "Country/Region" },
    { id: 8, label: "Industry" },
  ];
  const [showData, setShowData] = useState<company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  // fetchData is used for fetching data from backend
  useEffect(()=> {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/companies`,
          {
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          throw new Error(`Server error (${response.status})`);
        }
        setShowData(await response.json());
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError("Couldn't load companies. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [reload]);

  
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border mt-4">
        <table className="min-w-375 w-full">
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
