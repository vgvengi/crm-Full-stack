// import { MoreVertical, Compass } from "lucide-react";
import { FaRegCompass } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function SalesPipeline() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center ">
            <FaRegCompass />
          </div>

          <h2 className="text-[14px] font-semibold text-gray-900">
            Grow your sales pipeline
          </h2>
        </div>

        <button className="text-lg font-medium text-teal-700 underline">
          See what's next →
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Left Card */}
        <div className=" w-fit rounded-2xl border border-gray-200 bg-white p-8">
          <p className="text-sm text-gray-500">About 2 minutes</p>

          <h3 className="mt-3 text-3xl font-semibold text-gray-900">
            Create a new contact
          </h3>
          <div className="w-full">
            <p className="mt-2 text-lg text-gray-500">
              See all their details and interactions you've had in one place.
            </p>
          </div>

          <div className="mt-12 flex items-center">
            <button
              className="rounded-md bg-black px-7 py-3 text-base 
            font-medium text-white hover:bg-gray-900 cursor-pointer"
            >
              Create contact
            </button>
            <button className="rounded-md p-2 cursor-pointer ml-2">
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className=" rounded-2xl border border-gray-200 bg-white ">
          <div className="w-full py-2 px-4">
            <p className="text-sm text-gray-500">About 3 minutes</p>

            <p className=" mt-3  text-xl font-semibold text-nowrap text-gray-900">
              Set up your deals pipeline
            </p>

            <p className="mt-2 text-base text-gray-500 text-wrap">
              In three easy steps, you'll hit the ground running with a custom
              deals pipeline.
            </p>

            <div className=" mt-16 flex items-center">
              <button
                className="rounded-md border border-gray-300 px-2 py-2 
            font-medium text-gray-800 hover:bg-gray-50 cursor-pointer"
              >
                Set up deals pipeline
              </button>

              <button className="rounded-md p-2 ml-2 cursor-pointer ">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
