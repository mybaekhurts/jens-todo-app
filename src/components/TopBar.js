import { Search, Plus } from "lucide-react"

export default function TopBar({ title }) {
  return (
    <div className="h-28 px-6 py-4 flex border-b bg-white shadow-sm">
      {/* Left 2/3: heading + search */}
      <div className="w-2/3 flex flex-col justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-2.5 text-pink-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
          />
        </div>
      </div>

      {/* Right 1/3: Plus button centered */}
      <div className="w-1/3 flex justify-center items-center">
        <button className="p-2 bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200">
          <Plus size={20} />
        </button>
      </div>
    </div>
  )
}
