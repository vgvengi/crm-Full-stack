import React from "react";
import TicketsHeader from "./TicketsHeader";

function Tickets() {
  return (
    <div className={`h-full min-h-0 w-full rounded-2xl border-2 shadow-2xl`}>
      <div>
        <TicketsHeader />
      </div>
      Tickets
    </div>
  );
}

export default Tickets;
