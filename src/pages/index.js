import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import SideBar, { SideBarItem } from "../components/SideBar";
import TopBar from "../components/TopBar"
import CategoryIslands from "@/components/CategoryIslands"
import IslandGrid from "@/components/IslandGrid"
import TaskPanel from "@/components/TaskPanel"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { ClipboardList, Calendar, FileDown, FileUp } from "lucide-react"
import * as XLSX from "xlsx"

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
      setTasks(JSON.parse(stored).map((t, i) => ({ ...t, originalIndex: i })))
    } else {
      setTasks([
        {
          id: uuidv4(),
          name: "Find a life",
          completed: false,
          dueDate: "2025-07-18",
          category: "Personal",
          originalIndex: 0,
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
          originalIndex: 1,
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
          originalIndex: 2,
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
      prev.map(task => {
        if (task.id !== id) return task;

        const newCompleted = !task.completed;
        return {
          ...task,
          completed: newCompleted,
          subtasks: task.subtasks?.map(st => ({
            ...st,
            completed: newCompleted ? true : st.completed,
          })) || [],
        };
      })
    );
  };

  // Tasks CRUD
  const handleOpenPanel = () => setTaskPanelOpen(true)
  const addTask = (task) => {
    setTasks(prev => [
      ...prev, 
      { 
        id: uuidv4(), 
        completed: false, 
        subtasks: [], 
        originalIndex: prev.length,
        ...task }])
  }
  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }
  const [editingTask, setEditingTask] = useState(null)
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

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
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sortOrder, setSortOrder] = useState("custom"); // "custom", "asc", "desc"

  // Export and Import tasks to Excel
  const handleExport = () => {
    const data = tasks.map(task => ({
      Name: task.name,
      Completed: task.completed ? "Yes" : "No",
      DueDate: task.dueDate || "None",
      Category: task.category || "Untagged",
      Subtasks: task.subtasks.map(st => `${st.name} [${st.completed ? "x" : " "}]`).join(", ")
    }));

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks")

    XLSX.writeFile(workbook, "todo-export.xlsx")
  }
  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(worksheet)

      const importedTasks = json.map((row, index) => ({
        id: uuidv4(),
        name: row.Name || `Untitled ${index}`,
        completed: row.Completed?.toLowerCase() === "yes",
        dueDate: row.DueDate === "None" ? null : row.DueDate,
        category: row.Category || "Untagged",
        originalIndex: tasks.length + index,
        subtasks: (row.Subtasks || "")
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
          .map((s, i) => {
            const match = s.match(/^(.*?)\s*\[(x|\s)\]$/i)
            return {
              id: `import-${index}-${i}`,
              name: match ? match[1].trim() : s,
              completed: match ? match[2].toLowerCase() === "x" : false
            }
          })
      }))

      setTasks(prev => [...prev, ...importedTasks])
    }
    reader.readAsArrayBuffer(file)
  }

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
    <>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/caticon.png" />
      </Head>
      <div className="flex h-screen overflow-hidden">
        <SideBar>
          <SideBarItem icon={<ClipboardList />} text="Tasks" active />
          <SideBarItem icon={<Calendar />} text="Calendar View" />
          <SideBarItem icon={<FileDown />} text="Import" onClick={() => document.getElementById("file-import").click()}/>
          <input
            id="file-import"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            style={{ display: "none" }}
          />
          <SideBarItem icon={<FileUp />} text="Export" onClick={handleExport} />
        </SideBar>


        <div className="flex flex-1 relative">
          <main className="flex-1 overflow-y-auto min-h-0 transition-all duration-300">
            <TopBar
              title="Todo List"
              isTaskPanelOpen={isTaskPanelOpen}
              onAddTask={handleOpenPanel}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
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
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <CategoryIslands title="Personal"
                tasks={filteredTasks.filter(t => t.category === "Personal")}
                onToggleTask={toggleTaskComplete}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setTaskPanelOpen(true)
                }}
                itemsPerPage={itemsPerPage}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <CategoryIslands title="School"
                tasks={filteredTasks.filter(t => t.category === "School")}
                onToggleTask={toggleTaskComplete}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setTaskPanelOpen(true)
                }}
                itemsPerPage={itemsPerPage}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <CategoryIslands title="Entertainment"
                tasks={filteredTasks.filter(t => t.category === "Entertainment")}
                onToggleTask={toggleTaskComplete}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setTaskPanelOpen(true)
                }}
                itemsPerPage={itemsPerPage}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <CategoryIslands title="Work"
                tasks={filteredTasks.filter(t => t.category === "Work")}
                onToggleTask={toggleTaskComplete}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setTaskPanelOpen(true)
                }}
                itemsPerPage={itemsPerPage}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <CategoryIslands title="Untagged"
                tasks={filteredTasks.filter(t => t.category === "Untagged")}
                onToggleTask={toggleTaskComplete}
                onEditTask={(task) => {
                  setEditingTask(task)
                  setTaskPanelOpen(true)
                }}
                itemsPerPage={itemsPerPage}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
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
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </>
  )
}
