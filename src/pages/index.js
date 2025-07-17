import { Geist, Geist_Mono } from "next/font/google";
import SideBar, { SideBarItem } from "../components/SideBar";
import TopBar from "../components/TopBar"
import CategoryIslands from "@/components/CategoryIslands"
import IslandGrid from "@/components/IslandGrid"
import TaskPanel from "@/components/TaskPanel"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { ClipboardList, Calendar, FileDown, FileUp } from "lucide-react"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // State management for task panel and tasks
  const [isTaskPanelOpen, setTaskPanelOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const stored = localStorage.getItem("tasks")
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      setTasks([
        {
          id: uuidv4(),
          name: "Find a life",
          completed: false,
          dueDate: "2025-07-18",
          category: "Personal",
          subtasks: [
            { id: "t1s1", name: "buy alarm clock", completed: false },
            { id: "t1s2", name: "touch mirror", completed: true },
          ],
        },
        {
          id: uuidv4(),
          name: "Check bus schedule",
          completed: false,
          dueDate: "2025-07-19",
          category: "School",
          subtasks: [
            { id: "t2s1", name: "find bus stop", completed: false },
            { id: "t2s2", name: "wait for bus", completed: false },
          ],
        },
        {
          id: uuidv4(),
          name: "Watch paint dry",
          completed: false,
          dueDate: null,
          category: "Entertainment",
          subtasks: [],
        },
      ])
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  const toggleTaskComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Tasks CRUD
  const handleOpenPanel = () => setTaskPanelOpen(true)
  const addTask = (task) => {
    setTasks(prev => [...prev, { id: uuidv4(), completed: false, subtasks: [], ...task }])
  }
  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }
  const [editingTask, setEditingTask] = useState(null)

  // Search and filter functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "completed") return task.completed
    if (statusFilter === "incomplete") return !task.completed
    return true
  }).filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const [itemsPerPage, setItemsPerPage] = useState(10)


  // const tasks = {
  //   urgent: ["RUN"],
  //   personal: [
  //     "find a life", "touch grass", "tidy bed", "clean baby", "pack for trip",
  //     "rethink life choices", "scroll on phone", "punch keyboard", "lick cat litter", "feed the laptop"
  //   ],
  //   school: [
  //     "check bus schedule", "skip class", "get lost in campus", "plagarize assignments",
  //     "catch toilet lizards", "sneak into blocked areas", "complain canteen food",
  //     "pet campus kitties", "rank in lecture", "follow lecturer around"
  //   ],
  //   entertainment: [
  //     "watch paint dry", "steal samples", "make baby cry"
  //   ],
  //   work: [
  //     "yell at customers", "find a job", "play with coffee machine"
  //   ],
  //   untagged: [
  //     "do something", "stock up fridge"
  //   ]
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar>
        <SideBarItem icon={<ClipboardList />} text="Tasks" active />
        <SideBarItem icon={<Calendar />} text="Calendar View" />
        <SideBarItem icon={<FileDown />} text="Import" />
        <SideBarItem icon={<FileUp />} text="Export" />
      </SideBar>


      <div className="flex flex-1 relative">
        <main className="flex-1 overflow-y-auto min-h-0 transition-all duration-300">
          <TopBar
            title="Dashboard"
            onAddTask={handleOpenPanel}
            isTaskPanelOpen={isTaskPanelOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <IslandGrid>
            <CategoryIslands
              title="Urgent"
              tasks={filteredTasks.filter(t => t.category === "Urgent")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
              itemsPerPage={itemsPerPage}
            />
            <CategoryIslands title="Personal"
              tasks={filteredTasks.filter(t => t.category === "Personal")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
              itemsPerPage={itemsPerPage}
            />
            <CategoryIslands title="School"
              tasks={filteredTasks.filter(t => t.category === "School")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
              itemsPerPage={itemsPerPage}
            />
            <CategoryIslands title="Entertainment"
              tasks={filteredTasks.filter(t => t.category === "Entertainment")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
              itemsPerPage={itemsPerPage}
            />
            <CategoryIslands title="Work"
              tasks={filteredTasks.filter(t => t.category === "Work")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="Untagged"
              tasks={filteredTasks.filter(t => t.category === "Untagged")}
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
              itemsPerPage={itemsPerPage}
            />
          </IslandGrid>
        </main>
        <TaskPanel
          isOpen={isTaskPanelOpen}
          onClose={() => {
            setTaskPanelOpen(false)
            setEditingTask(null)
          }}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
        />
      </div>
    </div>
  )
}
