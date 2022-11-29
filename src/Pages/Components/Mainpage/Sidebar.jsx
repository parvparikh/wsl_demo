import React from "react";
//Sidebar HTML and css
const Sidebar = (props) => {
  let custom_css =
    props.hide === "true"
      ? "w-64 absolute sm:relative bg-green shadow md:h-full flex-col justify-between flex hidden"
      : "w-64 absolute sm:relative bg-green shadow md:h-full flex-col justify-between flex rounded-xl";
  return (
    <div className="flex flex-no-wrap pr-4 ">
      {/* Sidebar starts */}
      {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
      <div className={custom_css}>
        <div className="px-8">
          <ul className="mt-12">
            <button
              className="text-white mb-2"
              onClick={() => {
                props.back_handler();
              }}
            >
              {" "}
              {"<"}{" "}
            </button>
            <li className="flex w-full justify-between text-white hover:text-gray-100 items-center mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-grid"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={4} y={4} width={6} height={6} rx={1} />
                  <rect x={14} y={4} width={6} height={6} rx={1} />
                  <rect x={4} y={14} width={6} height={6} rx={1} />
                  <rect x={14} y={14} width={6} height={6} rx={1} />
                </svg>
                <span className="text-sm  ml-2">Name:</span>
              </div>
            </li>
            <li className="mb-6">
              <div className="overflow-scroll break-all py-1 px-3 bg-white rounded text-black flex items-center justify-center text-xs">
                {props.data
                  ? props.type === "learner"
                    ? props.data["Learner Id"]
                    : props.data["name"]
                  : "null"}
              </div>
            </li>
            <li className="flex w-full justify-between text-white  hover:text-gray-100 items-center mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-puzzle"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                </svg>
                <span className="text-m  ml-2">
                  {props.type === "learner"
                    ? "Top 3 competencies"
                    : "Top 3 topics:"}
                </span>
              </div>
            </li>
            <li className="mb-6">
              <div className="py-1 px-3 bg-white rounded text-black  flex items-center text-xs">
                <ul>
                  <li>1. {props.top3 ? props.top3[0] : "Null"}</li>
                  <li>2. {props.top3 ? props.top3[1] : "Null"}</li>
                  <li>3. {props.top3 ? props.top3[2] : "Null"}</li>
                </ul>
              </div>
            </li>
            {props.type === "learner" ? (
              <></>
            ) : (
              <>
                <li className="flex w-full justify-between text-white  hover:text-gray-100 items-center mb-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-stack"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 4 4 8 12 12 20 8 12 4" />
                      <polyline points="4 12 12 16 20 12" />
                      <polyline points="4 16 12 20 20 16" />
                    </svg>
                    <span className="text-sm  ml-2">Resource Description:</span>
                  </div>
                </li>
                <li className="mb-6">
                  <div className="py-1 px-3 bg-white rounded text-black flex items-center justify-center text-xs">
                    {props.data ? props.data.resource_summary : "Null"}
                  </div>
                </li>
                <li className="flex w-full justify-between text-white  hover:text-gray-100 items-center mb-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-stack"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 4 4 8 12 12 20 8 12 4" />
                      <polyline points="4 12 12 16 20 12" />
                      <polyline points="4 16 12 20 20 16" />
                    </svg>
                    <span className="text-sm  ml-2">Resource Type:</span>
                  </div>
                </li>
                <li className="mb-6">
                  <div className="py-1 px-3 bg-white rounded text-black flex items-center justify-center text-xs">
                    {props.data ? props.data.resource_type : "Null"}
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
