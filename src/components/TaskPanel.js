import { Calendar, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function TaskPanel({ isOpen, onClose, onAddTask, onUpdateTask, editingTask }) {
  const [taskName, setTaskName] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [subtasks, setSubtasks] = useState(["", ""])
  const [category, setCategory] = useState("Untagged")

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name || "")
      setDueDate(editingTask.dueDate || "")
      setCategory(editingTask.category || "Untagged")
      setSubtasks(
        editingTask.subtasks?.map(s => s.name) || [""]
      )
    } else {
      setTaskName("")
      setDueDate("")
      setCategory("Untagged")
      setSubtasks([""])
    }
  }, [editingTask])

  const handleConfirm = () => {
    if (!taskName.trim()) return

    const newTask = {
      ...(editingTask || {}),
      name: taskName,
      dueDate: dueDate || null,
      category,
      subtasks: subtasks
        .filter(s => s.trim())
        .map((s, i) => ({
          id: `s${i}`,
          name: s,
          completed: editingTask?.subtasks?.[i]?.completed || false,
        })),
    }

    if (editingTask) {
      onUpdateTask?.(newTask)
    } else {
      onAddTask?.(newTask)
    }

    onClose()
  }

  const updateSubtask = (i, value) => {
    const updated = [...subtasks]
    updated[i] = value
    setSubtasks(updated)
  }

  const addSubtask = () => {
    setSubtasks([...subtasks, ""])
  }

  const removeSubtask = (i) => {
    const updated = subtasks.filter((_, idx) => idx !== i)
    setSubtasks(updated.length ? updated : [""])
  }

  return (
    <aside
    className={`h-full bg-white border-l shadow-lg transition-all duration-300 ${
        isOpen ? "w-96" : "w-0"
    }`}
    >
      <div className="flex flex-col h-full px-6 py-5">
        {/* Task Name Field */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {editingTask ? "Editing Task" : "Create New Task"}
        </h2>
        <hr className="my-2 border-t-2 border-pink-700" />
        <h3 className="text-md text-gray-700 mb-1">Task Name</h3>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        {/* Category Dropdown */}
        <div className="mb-4">
          <h3 className="text-md text-gray-700 mb-1">Category</h3>
          <select
            className="w-full border border-gray-300 rounded-2xl px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Untagged">Untagged</option>
            <option value="Urgent">Urgent</option>
            <option value="Personal">Personal</option>
            <option value="School">School</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Work">Work</option>
          </select>
        </div>

        {/* Due Date Field */}
        <div className="mb-4">
          <h3 className="text-md text-gray-700 mb-1">Due Date</h3>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-3 py-2 text-sm bg-gray-100 cursor-default"
            />
            {/* <button className="p-2 bg-pink-100 text-pink-800 rounded-2xl hover:bg-pink-200">
              <Calendar size={18} />
            </button> */}
          </div>
        </div>

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
          <button onClick={onClose} className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600">
            {editingTask ? "Confirm" : "Create"}
          </button>
        </div>
      </div>
    </aside>
  )
}
