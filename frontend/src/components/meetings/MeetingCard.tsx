
    export default function MeetingCard() {
  return (
    <div className="mx-auto flex h-85 max-w-6xl overflow-hidden rounded-xl border border-gray-300 bg-white">
      {/* Left Section */}
      <div className="w-[52%] border-r border-gray-300">
        {/* Timeline goes here */}
      </div>

      {/* Right Section */}
      <div className="flex w-[48%] flex-col justify-center px-8">
        <h2 className="text-[18px] font-semibold text-gray-900">
          Prep for your meetings that matter most
        </h2>

        <p className="mt-5 text-[14px] text-gray-500">
          Connect your calendar to highlight meetings that help you close deals.
        </p>

        <button className=" cursor-pointer mt-8 w-fit rounded-md bg-gray-900 px-3 py-2 text-white transition hover:bg-gray-800">
          Connect your calendar
        </button>
      </div>
    </div>
  );
}
