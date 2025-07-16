import { Calendar, Plus, X } from "lucide-react"

export default function TaskPanel({ isOpen = true }) {
  return (
    <aside
      className={`h-screen bg-white border-l shadow-lg w-96 transition-all duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-40`}
    >
      <div className="flex flex-col h-full px-6 py-5">
        {/* Panel Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Create New Task
        </h2>

        {/* Divider */}
        <hr className="my-2" />

        {/* Task Name Heading */}
        <h3 className="text-md text-gray-500 mb-1">Task Name</h3>
        <input
          type="text"
          placeholder="Enter task name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        {/* Due Date Field */}
        <div className="mb-4">
          <h3 className="text-md text-gray-700 mb-1">Due Date</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="No date selected"
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 cursor-default"
            />
            <button className="p-2 bg-pink-100 text-pink-800 rounded-md hover:bg-pink-200">
              <Calendar size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-2" />

        {/* Subtasks Section */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md text-gray-700">Subtasks</h3>
          <button className="p-1 rounded hover:bg-gray-100">
            <Plus size={18} />
          </button>
        </div>

        {/* Subtask Input List (static placeholder) */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-1">
          <input
            type="text"
            placeholder="Subtask 1"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Subtask 2"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600">
            Create
          </button>
        </div>
      </div>
    </aside>
  )
}
