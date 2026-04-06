import { ArrowLeftCircleIcon } from "lucide-react";

function page() {
  return (
    <div className="conatainer mx-auto px-2 flex gap-8 flex-col items-center justify-center py-12">
      {/* form body */}
      <div className="self-start">
        <button className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200">
          <ArrowLeftCircleIcon size={23} />
          <span>Back to blogs</span>
        </button>
      </div>
      <div className="border-1 border-black rounded-xl p-4 shadow-sm">
        <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-accent mb-8 font-sora">
          Create your Article
        </h2>
        <form className="flex flex-col gap-4 md:min-w-3xl">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="title"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Title
            </label>
            <input
              type="text"
              className="p-1 border-black/80 border-2 rounded-lg w-full text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="title"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Description
            </label>
            <textarea
              type="text"
              className="p-1 border-black/80 border-2 rounded-lg w-full text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="title"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Content
            </label>
            <textarea
              type="text"
              className="p-1 border-black/80 border-2 rounded-lg w-full text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div className="ml-auto flex gap-2">
            <button className="px-2 py-1 tracking-wider border bg-white shadow rounded-lg hover:opacity-70 transition-all duration-200 active:scale-103">
              Reset
            </button>
            <button className="px-2 py-1 tracking-wider border bg-black text-gray-50 shadow rounded-lg hover:opacity-70 transition-all duration-200 active:scale-103">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
