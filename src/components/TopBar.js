import { Search, Plus } from "lucide-react"

export default function TopBar({ title, onAddTask, isTaskPanelOpen, searchTerm, setSearchTerm, statusFilter, setStatusFilter, itemsPerPage, setItemsPerPage }) {
  return (
    <div className="h-32 px-6 py-4 flex border-b bg-white shadow-sm">
      <div className="w-2/3 flex flex-col justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-2.5 text-pink-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
          />
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="all"
              checked={statusFilter === "all"}
              onChange={() => setStatusFilter("all")}
              className="accent-pink-500"
            />
            <label>All</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="completed"
              checked={statusFilter === "completed"}
              onChange={() => setStatusFilter("completed")}
              className="accent-pink-500"
            />
            <label>Completed</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="status"
              value="incomplete"
              checked={statusFilter === "incomplete"}
              onChange={() => setStatusFilter("incomplete")}
              className="accent-pink-500"
            />
            <label>Incomplete</label>
          </div>
          <div className="flex items-center gap-1">
            <label>Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 8 }, (_, i) => i + 3).map(n => (
                <option key={n} value={n}>Show {n} tasks</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right 1/3: Plus button centered */}
      <div className="w-1/3 flex justify-center items-center">
        <div
          className={`transition-transform duration-300${
            isTaskPanelOpen ? " opacity-0" : "opacity-100"
          }`}
        >
          <button onClick={onAddTask} className="p-2 bg-pink-100 text-pink-800 z-49 rounded-lg hover:bg-pink-200">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
