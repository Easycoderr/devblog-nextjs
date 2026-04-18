import { Filter, Search } from "lucide-react";

function SearchFilterSort() {
  return (
    <div className="flex md:gap-x-10 md:gap-y-0 gap-y-4 flex-col md:flex-row">
      <div className="flex gap-0.5 flex-col relative w-full">
        <input
          type="text"
          id="search"
          name="search"
          className="border pl-8 w-full peer z-20 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
          placeholder=" "
        />
        <label
          htmlFor="search"
          className="transition-all duration-200 absolute peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-accent peer-[:not(:placeholder-shown)]:rounded-lg peer-[:not(:placeholder-shown)]:text-gray-50 peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 peer-focus:-top-0.5 peer-focus:bg-accent peer-focus:text-xs z-40 peer-focus:rounded-lg peer-focus:text-gray-50 top-[50%] -translate-y-[50%] left-8 peer-focus:left-2 font-sora text-text-muted tracking-wide text-sm font-medium"
        >
          Search: Enter articles title..
        </label>
        <span className="absolute left-1 top-[50%] -translate-y-[50%] peer-focus:text-accent">
          <Search />
        </span>
      </div>
      <div className="relative w-full">
        <select
          name="cars"
          id="cars"
          className="border w-full border-black peer z-30 text-sm rounded-md text-text-muted px-8 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
        >
          <option defaultChecked>Choose a filter</option>
          <option value="saab">C++</option>
          <option value="mercedes">HTML</option>
          <option value="audi">React</option>
        </select>
        <Filter className="absolute top-[50%] -translate-y-[50%] left-2 peer-focus:text-accent" />
      </div>
    </div>
  );
}

export default SearchFilterSort;
