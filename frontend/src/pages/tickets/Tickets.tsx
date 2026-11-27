import TicketsHeader from "./TicketsHeader";
import TicketsTable from "./TicketsTable";

function Tickets() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border-2 shadow-2xl">
      <TicketsHeader />
      <TicketsTable />
    </div>
  );
}

export default Tickets;
