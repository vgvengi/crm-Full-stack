import DealsHeader from "./Deals-header";
import DealsFilter from "./DealsFilter";
import {
  FiBriefcase,
  FiCopy,
  FiExternalLink,
  FiRefreshCw,
  FiUpload,
} from "react-icons/fi";

const pipelineStages = [
  { name: "Appointment Scheduled", color: "bg-blue-600" },
  { name: "Qualified To Buy", color: "bg-orange-700" },
  { name: "Presentation Scheduled", color: "bg-pink-600" },
  { name: "Decision Maker Bought-In", color: "bg-violet-600" },
  { name: "Contract Sent", color: "bg-amber-400 text-gray-900" },
];

const Deals = () => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <DealsHeader />
      <DealsFilter />

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="grid min-w-[1640px] grid-cols-5 gap-3 px-7 pt-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.name}
              className="flex h-11 min-w-0 items-center gap-2 rounded-2xl bg-[#f0f1f2] px-3"
            >
              <span
                className={`truncate rounded-md px-2.5 py-1 text-sm font-semibold text-white ${stage.color}`}
              >
                {stage.name}
              </span>
              <span className="text-sm font-semibold text-gray-500">0</span>
            </div>
          ))}
        </div>

        <section className="flex min-h-85 items-center justify-center px-6 py-10">
          <div className="flex w-full max-w-175 flex-col items-center gap-8 sm:flex-row sm:gap-12">
            <div className="w-full max-w-110 text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                Build a winning sales process
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-600">
                Use <span className="font-semibold text-teal-700">Deals</span>{" "}
                <FiExternalLink className="inline" aria-hidden="true" /> to track
                opportunities across your custom sales pipeline and report on
                your revenue.
              </p>
              <p className="mt-5 text-base text-gray-600">
                Read: <a
                  href="https://blog.hubspot.com/sales/sales-process"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-teal-700 hover:underline"
                >
                  How to design your sales process in HubSpot
                </a>{" "}
                <FiExternalLink className="inline" aria-hidden="true" />
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                <button className="rounded-full bg-teal-800 px-7 py-3 text-sm font-semibold text-white hover:bg-teal-900">
                  Add deal
                </button>
                <button className="rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  Import data from a file
                </button>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative flex h-52 w-56 shrink-0 items-center justify-center"
            >
              <div className="absolute inset-x-0 bottom-2 h-24 bg-[#c9f0f2] [clip-path:polygon(25%_0,100%_100%,0_100%)]" />
              <div className="absolute bottom-8 right-6 h-28 w-36 rotate-[-8deg] rounded-xl bg-[#ca8241] shadow-[inset_0_0_0_8px_#334155]" />
              <div className="absolute bottom-[7.7rem] right-[4.7rem] h-8 w-14 rounded-t-xl border-[7px] border-b-0 border-[#334155]" />
              <FiBriefcase className="relative z-10 mb-5 ml-4 text-[#334155]" size={104} strokeWidth={1.5} />
            </div>
          </div>
        </section>
      </div>

      <footer className="flex min-h-15.5 shrink-0 items-center justify-between border-t border-gray-200 px-6">
        <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700">
          0 deals
        </span>
        <div className="flex items-center gap-2">
          <button aria-label="Refresh deals" className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:bg-gray-50">
            <FiRefreshCw size={16} />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <FiUpload size={15} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <FiCopy size={15} /> Clone
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Deals;