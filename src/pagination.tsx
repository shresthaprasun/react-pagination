import React, {useContext} from "react";
import { PaginationContext } from "./pagination-context";
export function Pagination(): React.ReactElement {
  const {setCurrentUrl, prevUrl, nextUrl,firstUrl,lastUrl} = useContext(PaginationContext);
  const handlePrevPage = () => {
    console.log("prev url", prevUrl);
    setCurrentUrl(prevUrl);
  };

  const handleNextPage = () => {
    console.log("next url", nextUrl);

    setCurrentUrl(nextUrl)
  };

  const handlefirstPage = () => {
    console.log("first url", firstUrl);

   setCurrentUrl(firstUrl)
  };

  const handlelastPage = () => {
    console.log("last url", lastUrl);

    setCurrentUrl(lastUrl)
   };

  return (
    <div>      
      <div className="flex justify-center gap-0.5">
        <button
          className="basis-24 min-w-200 p-2 border-2 border-indigo-300 rounded-md disabled:border-slate-300 enabled:hover:bg-indigo-600"
          onClick={handlePrevPage}
          disabled={prevUrl === ""}
        >
          Previous
        </button>
        <button
          className="basis-24 p-2 border-2 border-indigo-300 rounded-md disabled:border-slate-300 enabled:hover:bg-indigo-600"
          disabled={firstUrl === ""}
          onClick={handlefirstPage
          }
        >
          First
        </button>
        <button
          className="basis-24 p-2 border-2 border-indigo-300 rounded-md disabled:border-slate-300 enabled:hover:bg-indigo-600"
          disabled={lastUrl === ""}
          onClick={handlelastPage}
        >
          Last
        </button>

        <button
          className="basis-24 p-2 border-2 border-indigo-300 rounded-md disabled:border-slate-300 enabled:hover:bg-indigo-600"
          disabled={nextUrl === ""}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
