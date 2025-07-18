import { Calendar, Plus, X, Trash } from "lucide-react"
import { useEffect, useState } from "react"

export default function TaskPanel({ isOpen, onClose, onAddTask, onUpdateTask, editingTask, onDeleteTask}) {
  const [taskName, setTaskName] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [subtasks, setSubtasks] = useState([])
  const [category, setCategory] = useState("Untagged")

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name || "")
      setDueDate(editingTask.dueDate || "")
      setCategory(editingTask.category || "Untagged")
      setSubtasks(
        editingTask.subtasks?.map(s => ({
          name: s.name,
          completed: s.completed || false,
        })) || []
      )
    } else {
      setTaskName("")
      setDueDate("")
      setCategory("Untagged")
      setSubtasks([])
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
        .filter(s => s.name.trim())
        .map((s, i) => ({
          id: `s${i}`,
          name: s.name.trim(),
          completed: s.completed,
        })),
    }
    if (editingTask) {
      onUpdateTask?.(newTask)
    } else {
      onAddTask?.(newTask)
      setTaskName("")
      setDueDate("")
      setSubtasks([])
    }
    onClose()
  }

  // Subtask management functions
  const toggleSubtaskComplete = (i) => {
    const updated = [...subtasks]
    updated[i].completed = !updated[i].completed
    setSubtasks(updated)
  }
  const addSubtask = () => {
    setSubtasks([...subtasks, { name: "", completed: false }])
  }
  const updateSubtask = (i, value) => {
    const updated = [...subtasks]
    updated[i].name = value
    setSubtasks(updated)
  }
  const removeSubtask = (i) => {
    const updated = subtasks.filter((_, idx) => idx !== i)
    setSubtasks(updated.length ? updated : [])
  }

  return (
    <aside
    className={`h-full bg-white border-l shadow-lg transition-all duration-300 ${
        isOpen ? "w-96" : "w-0"
    }`}
    >
      
      <div className="flex flex-col h-full p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingTask ? "Editing Task" : "Create New Task"}
          </h2>
          {editingTask && (
            <button
              onClick={() => {
                if (confirm("Delete this task?")) {
                  onDeleteTask?.(editingTask.id);
                  onClose();
                }
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash size={20} />
            </button>
          )}    
        </div>
        <hr className="my-2 border-t-2 border-pink-700" />
        {/* Task Name Field */}
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
            <option value="Work">Work</option>
            <option value="Entertainment">Entertainment</option>
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
          </div>
        </div>

        <hr className="my-2" />

        {/* Subtasks Section */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md text-gray-700">Subtasks</h3>
          <button onClick={addSubtask} className="p-1 rounded hover:bg-gray-100">
            <Plus size={18} />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {subtasks.map((sub, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="accent-pink-500"
                type="checkbox"
                checked={sub.completed}
                onChange={() => toggleSubtaskComplete(i)}
              />
              <input
                type="text"
                value={sub.name}
                onChange={(e) => updateSubtask(i, e.target.value)}
                placeholder={`Subtask ${i + 1}`}
                className={`w-full border border-gray-200 rounded-md px-3 py-2 text-sm 
                  ${sub.completed ? "line-through text-gray-400" : ""}`}
              />
              <button
                onClick={() => removeSubtask(i)}
                className="text-gray-400 hover:text-red-400"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto flex justify-between">
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
