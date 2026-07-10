import CompaniesFooter from "./components/CompaniesFooter";
import CompaniesHeader from "./components/CompaniesHeader";
import CompaniesTable from "./components/CompaniesTable";
import CompaniesTableRow from "./components/CompaniesTableRow";
function Companies() {
  return (
 <div className="flex w-full  ms-auto h-full flex-col py-1  bg-white">
      <CompaniesHeader />
      <CompaniesTable />
      <CompaniesTableRow />

      <div className="flex-1 overflow-hidden">
      </div>
      <div className="mb-2">
      <CompaniesFooter/>
      </div>
    </div>
  )
}

export default Companies