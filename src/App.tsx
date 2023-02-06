import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { PaginationContext } from "./pagination-context";
import { Pagination } from "./pagination";
import { useDebounce } from "./useDebounce";

interface IRepoInfo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  url: string;
  html_url: string;
}

interface IRepoInfos {
  items: IRepoInfo[];
  total_count: number;
}

function App() {
  const {
    perPageCount,
    currentUrl,
    setCurrentUrl,
    setFirstUrl,
    setLastUrl,
    setNextUrl,
    setPrevUrl,
    setPerPageCount,
  } = useContext(PaginationContext);
  const [repos, setRepos] = useState<IRepoInfo[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [query, setQuery] = useState("");

  const parselinks = (
    links: string
  ): { prev: string; next: string; first: string; last: string } => {
    const result = {
      prev: "",
      next: "",
      first: "",
      last: "",
    };

    const linkArray = links.split(",");
    linkArray.forEach((linkdata) => {
      const link_rel = linkdata.split(";");
      for (const key in result) {
        if (link_rel[1].trim() === `rel="${key}"`) {
          const match = link_rel[0].match(/<(.*?)>/);
          (result as any)[key] = match ? match[1] : "";
        }
      }
    });
    return result;
  };

  const fetchData = useCallback(
    useDebounce(async (url: string) => {
      try {
        console.log("loading", url);
        const result = await axios.get(url);
        const repoInfos = result.data as IRepoInfos;
        const links = result.headers.link || "";
        const { prev, next, first, last } = parselinks(links);
        setPrevUrl(prev);
        setNextUrl(next);
        setFirstUrl(first);
        setLastUrl(last);
        setRepos(repoInfos.items);
        setItemsCount(repoInfos.total_count);
        console.log("loading complete");
      } catch (e) {
        console.warn("fetch error");
        setRepos([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    const completeQueryUrl = `https://api.github.com/search/repositories?q=${query}&per_page=${perPageCount}`;
    setCurrentUrl(completeQueryUrl);
  }, [query, perPageCount]);

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="prose mb-5 mt-5">
        <h2>React Pagination Sample App</h2>
      </div>
      <div className="flex flex-row w-full">
        <label className="relative block grow">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.8"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for github repositories..."
            type="text"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="flex flex-row items-center">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-24 border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Items per page"
            type="number"
            name="itemsPerPage"
            value={perPageCount}
            onChange={(e) => setPerPageCount(parseInt(e.target.value, 10))}
          />          
        </div>
      </div>
      <p className="italic font-medium text-sm text-slate-500 font-mono mb-3 dark:text-slate-400">
        {currentUrl}
      </p>

      <div className="flex flex-col gap-5 relative rounded-xl overflow-auto p-8">
        <span>Total results: {itemsCount}</span>
        {repos.map((repo, i) => (
          <div
            className="p-4 border rounded prose-sm w-full max-w-full"
            key={repo.id}
          >
            <h3>
              <span>{i + 1}</span>. {repo.name}
            </h3>
            <p className="mb-0">
              <span>Full Name : </span> {repo.full_name}
            </p>
            <p className="mt-0">
              <span>Description : </span> {repo.description}
            </p>
          </div>
        ))}
      </div>
      <Pagination></Pagination>
    </div>
  );
}

export default App;
