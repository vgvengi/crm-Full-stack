import { FiExternalLink, FiDownload } from "react-icons/fi";
import { PiPhoneCallFill } from "react-icons/pi";

export default function Callings() {
  return (
    <div className="max-w-3xl">
      <p className="text-sm text-gray-500 mt-4 pb-4 border-b">
        These preferences only apply to you. For account level calling
        defaults go to{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          account call settings
        </a>
        .
      </p>

      <div className="border rounded-lg mt-6 p-6 flex items-center justify-between gap-6">
        <div className="max-w-md">
          <h2 className="text-lg font-semibold">
            Use HubSpot Calling to streamline your communication and keep all
            your conversations in one place
          </h2>

          <p className="text-sm text-gray-600 mt-3">
            Get started with a new{" "}
            <a
              href="#"
              className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
            >
              HubSpot number <FiExternalLink />
            </a>{" "}
            or{" "}
            <a
              href="#"
              className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
            >
              port an existing number <FiExternalLink />
            </a>{" "}
            to make and receive calls with automatic call logging.
          </p>

          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium mt-4 hover:opacity-95 cursor-pointer">
            Get started
            <FiDownload />
          </button>
        </div>

        <div className="w-32 h-32 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
          <PiPhoneCallFill className="text-5xl text-blue-400" />
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-8">Connect an integration</h2>
      <div className="flex items-start gap-3 mt-3">
        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <div className="w-4 h-4 rounded-full border-2 border-red-500" />
        </div>
        <div>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign up or connect your Twilio account
          </a>
          <p className="text-sm text-gray-500 mt-0.5">
            Get more calling minutes and access additional supported countries
          </p>
        </div>
      </div>
    </div>
  );
}
