import { Search, Plus, ChevronDown, 
  Clock, ClockArrowUp, ClockArrowDown, 
  ListTodo, ListChecks, LayoutList } from "lucide-react"


const sortOptions = [
  { value: "custom", label: "Custom Order", icon: <Clock className="w-4 h-4" /> },
  { value: "asc", label: "Due Soonest", icon: <ClockArrowUp className="w-4 h-4" /> },
  { value: "desc", label: "Due Latest", icon: <ClockArrowDown className="w-4 h-4" /> },
]

const statusOptions = [
  { value: "all", label: "All Tasks", icon: <LayoutList className="w-4 h-4" /> },
  { value: "completed", label: "Completed", icon: <ListChecks className="w-4 h-4" /> },
  { value: "incomplete", label: "Incomplete", icon: <ListTodo className="w-4 h-4" /> },
]

export default function TopBar({ title, onAddTask, isTaskPanelOpen, searchTerm, setSearchTerm, statusFilter, setStatusFilter, itemsPerPage, setItemsPerPage, sortOrder, setSortOrder }) {
  return (
    <div className="h-34 px-6 py-4 flex border-b bg-white shadow-sm">
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                {statusOptions.find(o => o.value === statusFilter)?.icon}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none border border-pink-300 rounded-2xl px-3 py-1 pl-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {statusOptions.map(opt => (
                  <option value={opt.value} key={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                {sortOptions.find(o => o.value === sortOrder)?.icon}
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none border border-pink-300 rounded-2xl px-3 py-1 pl-7 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-gray-600">Show</label>
              <div className="relative">
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="appearance-none border rounded-2xl px-3 py-1 pr-5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  {Array.from({ length: 8 }, (_, i) => i + 3).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevronDown size={16} />
                </div>
              </div>
              <label className="text-sm text-gray-600">Tasks</label>
            </div>
          </div>
        </div>
      </div>

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
