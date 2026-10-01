import { useState, useEffect } from "react";
import DealsHeader from "./Deals-header";
import DealsFilter from "./DealsFilter";
import StageOptions from "./stageOptions/StageOptions";
import CreateDeals, { type NewDeal } from "./createDeals/CreateDeals";
import {
  FiBriefcase,
  FiCopy,
  FiExternalLink,
  FiRefreshCw,
  FiUpload,
} from "react-icons/fi";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip";

const API_URL = import.meta.env.VITE_API_URL;

type Deal = NewDeal & { id: number };
interface DealStage {
  id: number;
  stages: string;
  stages_position: number;
  deal_stage_color: string;
}
    // This stageColors will map the mysql deal_stage_color to the Tailwind Class 
    // like bg-blue for blue 
const stageColors: Record<string, string> = {
  blue: "bg-blue-600",
  orange: "bg-orange-700",
  pink: "bg-pink-600",
  violet: "bg-violet-600",
  amber: "bg-amber-400 text-gray-900",
  red: "bg-red-700",
};

const Deals = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);

  const [dealPipeLine, setDealPipeLine] = useState<DealStage[]>([]);

  // here stageOption true or false
  const [openStageOption, setOpenStageOption] = useState<string | null>(null);
  // to get the deal stages from backend

  useEffect(() => {
    fetch(`${API_URL}/dealsStages/deals-stage`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load deal stages: ${response.status}`);
        }
        return response.json();
      })
      .then((data: DealStage[]) => setDealPipeLine(data))
      .catch((error: unknown) => {
        console.error("Failed to load deal stages:", error);
      });
  }, []);

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border
     border-gray-200 bg-white shadow-sm"
    >
      <DealsHeader onCreateDeal={() => setCreateOpen(true)} />
      <DealsFilter />

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="px-6 pt-4 pb-2">
          <div className="grid min-w-[1640px] grid-cols-6 gap-3">
            {dealPipeLine.map((value) => (
              <div
                key={value.id}
                // group is a className
                className="flex group  relative h-9 min-w-0 items-center gap-2 rounded-2xl 
                bg-[#f0f1f2] px-2 py-0 "
              >
                <span
                  className={`truncate rounded-md px-2.5 py-0 text-sm 
                    font-semibold cursor-pointer text-white ${stageColors[value.deal_stage_color]}`}
                >
                  {value.stages}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  {deals.filter((deal) => deal.stage === value.stages).length}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="invisible group-hover:visible cursor-pointer"
                      onClick={() => setOpenStageOption(value.stages)}
                    >
                      <HiOutlineDotsCircleHorizontal
                        className="flex justify-end"
                        size={22}
                        color="gray"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Stage Options</TooltipContent>
                </Tooltip>
                {openStageOption === value.stages && <StageOptions />}
              </div>
            ))}
          </div>
        </div>

        <div>
          {deals.length === 0 ? (
            <section className="flex min-h-85 items-center justify-center px-6 py-10">
              <div className="flex w-full max-w-180 flex-col items-center gap-8 sm:flex-row sm:gap-12">
                <div className="w-full max-w-110 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Build a winning sales process
                  </h2>
                  <p className="mt-5 text-base leading-7 text-gray-600">
                    Use{" "}
                    <span className="font-semibold text-teal-700">Deals</span>{" "}
                    <FiExternalLink className="inline" aria-hidden="true" /> to
                    track opportunities across your custom sales pipeline and
                    report on your revenue.
                  </p>
                  <p className="mt-5 text-base text-gray-600">
                    Read:{" "}
                    <a
                      href="https://blog.hubspot.com/sales/sales-process"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      How to design your sales process in HubSpot
                    </a>{" "}
                    <FiExternalLink className="inline" aria-hidden="true" />
                  </p>
                  <div className="mt-8  flex flex-wrap justify-center gap-3 sm:justify-start">
                    <button
                      onClick={() => setCreateOpen(true)}
                      className="rounded-full cursor-pointer
                 hover:bg-teal-800 px-7 py-3 text-sm  
                 font-semibold text-white bg-teal-900"
                    >
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
                  <FiBriefcase
                    className="relative z-10 mb-5 ml-4 text-[#334155]"
                    size={104}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </section>
          ) : (
            <div className="grid min-w-[1640px] grid-cols-6 gap-3 px-7 py-4">
              {dealPipeLine.map((value) => (
                <div key={value.stages} className="space-y-3">
                  {deals
                    .filter((deal) => deal.stage === value.stages)
                    .map((deal) => (
                      <article
                        key={deal.id}
                        className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <h3 className="font-medium text-gray-800">
                          {deal.name}
                        </h3>
                        {deal.amount && (
                          <p className="mt-2 text-sm text-gray-500">
                            ${deal.amount}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                          Close date: {deal.closeDate}
                        </p>
                      </article>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="flex min-h-15.5 shrink-0 items-center justify-between border-t border-gray-200 px-6">
        <span className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700">
          {deals.length} {deals.length === 1 ? "deal" : "deals"}
        </span>
        <div className="flex items-center gap-2">
          <button
            aria-label="Refresh deals"
            className="rounded-full border border-gray-300 p-2.5 text-gray-600 hover:bg-gray-50"
          >
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
      {createOpen && (
        <CreateDeals
          onClose={() => setCreateOpen(false)}
          onCreate={(deal) =>
            setDeals((currentDeals) => [
              ...currentDeals,
              { ...deal, id: Date.now() },
            ])
          }
        />
      )}
    </div>
  );
};

export default Deals;
