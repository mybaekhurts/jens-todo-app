import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, ClockArrowUp, ClockArrowDown } from "lucide-react"

export default function CategoryIslands({ 
  title, tasks, onToggleTask, onEditTask, 
  itemsPerPage, sortOrder, setSortOrder 
}) {
  const [page, setPage] = useState(0)
  // const pageSize = 6
  // const visibleTasks = tasks.slice(0, itemsPerPage)
  const totalPages = Math.ceil(tasks.length / itemsPerPage)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "asc") return new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
    if (sortOrder === "desc") return new Date(b.dueDate || 0) - new Date(a.dueDate || 0)
    return a.originalIndex - b.originalIndex
  })
  const paginatedTasks = sortedTasks.slice(page * itemsPerPage, (page + 1) * itemsPerPage)


  return (
    <div className="w-72 bg-white rounded-2xl shadow p-4 flex flex-col shrink-0">
      <div className="flex justify-between items-end mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <div className={`flex-1 space-y-2`} style={{minHeight: `${itemsPerPage * 36}px`}}>
        {Array.from({ length: itemsPerPage }).map((_, i) => {
          const task = paginatedTasks[i]
          return task ? (
            <div
              key={task.id}
              className={`p-2 rounded-md text-sm flex items-center gap-2 transition ${
                task.completed
                  ? "bg-gray-100 text-gray-500 line-through opacity-60"
                  : "bg-pink-50 text-pink-800 hover:bg-pink-100"
              }`}
              onClick={() => onEditTask?.(task)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleTask(task.id)
                }}
                className={`w-3 h-3 rounded-full border shrink-0 ${
                  task.completed ? 'bg-gray-500 border-gray-500' : 'border-grey-500'
                }`}
              />
              <span className={task.completed ? 'line-through opacity-60' : ''}>{task.name}</span>
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
          {Math.min((page + 1) * itemsPerPage, tasks.length)} of {tasks.length}
        </span>

        <button
          onClick={() => setPage((p) => (p + 1) * itemsPerPage < tasks.length ? p + 1 : p)}
          disabled={(page + 1) * itemsPerPage >= tasks.length}
          className="flex items-center gap-1 disabled:opacity-30 hover:text-pink-800 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
