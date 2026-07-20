import { useEffect, useState, useRef } from "react";

import { FiMoreVertical } from "react-icons/fi";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

import useClickOutSide from "@/hooks/useClickOutSide";
import initialMoreFilterList from "./top-bar-lists/more-filter-lists";

export default function SearchInput() {
  // this state is for change the name in the search placeHolder
  const [currentIndex, setCurrentIndex] = useState(0);
  // this more filter state is for option in search
  const [moreFilter, setMoreFilter] = useState(false);
  // this one is for more filter list selection
  // const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [moreFilterList, setMoreFilterList] = useState(initialMoreFilterList);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const placeHolderContent = [
    {
      id: 1,
      label: "Search HubSpot",
    },
    {
      id: 2,
      label: "Type / for commands",
    },
    {
      id: 3,
      label: "Ask Brezze anything",
    },
  ];

  useEffect(() => {
    const intervel = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % placeHolderContent.length);
    }, 3000);
    return () => clearInterval(intervel);
  });

  useClickOutSide(handleRef, () => {
    setMoreFilter(false);
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="h-12 w-full mt-2  border-b-1 shadow-3xl">
          <input
            className="h-7 w-140 mt-2 px-5 ml-2 pl-5 outline-0 "
            placeholder={placeHolderContent[currentIndex].label}
          />
        </div>
        <div className="flex flex-row relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="border p-1 cursor-pointer"
                onClick={() => setMoreFilter((prev) => !prev)}
              >
                <FiMoreVertical />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>More Filter</p>
            </TooltipContent>
          </Tooltip>
          {moreFilter && (
            <div className="absolute  top-full left-0 mt-2 w-80 rounded-lg border bg-white shadow-lg z-50">
              <div className="max-h-80 overflow-y-auto p-2" ref={handleRef}>
                {moreFilterList.map((filterList) => {
                  const Icon = filterList.icon;
                  return (
                    <div
                      className={`flex p-1 flex-row gap-2 items-center
                   hover:bg-[#EDEDED] cursor-pointer
                   `}
                      key={filterList.id}
                      onClick={() =>
                        setMoreFilterList((prev) =>
                          prev.map((item) =>
                            item.id === filterList.id
                              ? { ...item, shown: !item.shown }
                              : item,
                          ),
                        )
                      }
                    >
                      {/* <p>Shown</p> */}
                      <Icon className="ml-2" />
                      {filterList.label}
                      <input
                        className="ms-auto mr-2 h-5 w-5"
                        type="checkbox"
                        // checked={moreFilterList.includes(filterList.id)}
                        checked={filterList.shown}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
