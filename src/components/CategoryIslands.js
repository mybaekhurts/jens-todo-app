import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CategoryIslands({ title, tasks }) {
  const [page, setPage] = useState(0)
  const pageSize = 6
  const totalPages = Math.ceil(tasks.length / pageSize)

  const paginatedTasks = tasks.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="w-72 bg-white rounded-2xl shadow p-4 flex flex-col shrink-0">
      <div className="flex justify-between items-end mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <div className={`flex-1 space-y-2`} style={{minHeight: `${pageSize * 36}px`}}>
        {Array.from({ length: pageSize }).map((_, i) => {
          const task = paginatedTasks[i]
          return task ? (
            <div
              key={i}
              className="bg-pink-50 text-pink-800 p-2 rounded-md text-sm flex items-center gap-2 transition hover:bg-pink-100"
            >
              <span className="w-3 h-3 rounded-full border border-pink-500 shrink-0" />
              {task.name}
            </div>
          ) : (
            <div key={i} className="p-2 rounded-md opacity-0 pointer-events-none">
              &nbsp;
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-around mt-4 text-sm text-pink-600 font-medium">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="flex items-center gap-1 disabled:opacity-30 hover:text-pink-800 transition"
        >
          <ChevronLeft size={24} />
        </button>

        <span className="text-s text-gray-500">
          {Math.min((page + 1) * pageSize, tasks.length)} of {tasks.length}
        </span>

        <button
          onClick={() => setPage((p) => (p + 1) * pageSize < tasks.length ? p + 1 : p)}
          disabled={(page + 1) * pageSize >= tasks.length}
          className="flex items-center gap-1 disabled:opacity-30 hover:text-pink-800 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
