import { Filter } from "lucide-react";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function page() {
  return (
    <div className="space-y-12 relative w-full">
      <Header />
      {/* main */}
      <main className="container px-10 space-y-10 mx-auto">
        <div className="space-y-3">
          <h2 className="text-3xl text-start md:text-4xl ml-3 md:ml-0 font-sora font-bold">
            All Articles
          </h2>
          <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-0.5 max-w-2xs md:max-w-2xs mb-0.5"></div>
          <p className="text-muted leading-relaxed tracking-normal font-medium">
            Explore all posts and tutorials
          </p>
        </div>
        {/* search + filter */}
        <div className="flex gap-12">
          <div className="flex gap-0.5 flex-col relative">
            <input
              type="text"
              id="search"
              name="search"
              className="border peer z-30 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
              placeholder=""
            />
            <label
              for="search"
              className="transition-all duration-200 absolute peer-focus:px-1 peer-focus:-top-0.5 peer-focus:bg-accent peer-focus:text-xs z-70 peer-focus:rounded-lg peer-focus:text-gray-50 top-[50%] -translate-y-[50%] left-2 z-10 font-sora text-muted tracking-wide text-sm font-medium"
            >
              Search: Enter articles title..
            </label>
          </div>
          <div className="relative">
            <select
              name="cars"
              id="cars"
              className="border w-sm border-black peer z-30 text-sm rounded-md text-muted px-8 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
            >
              <option defaultChecked>Choose a filter</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <Filter className="absolute top-[50%] -translate-y-[50%] left-2 text-accent peer-focus:text-muted" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;
