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

  const handleOpenPanel = () => setTaskPanelOpen(true)

  const [searchTerm, setSearchTerm] = useState("")

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
          />
          <IslandGrid>
            <CategoryIslands title="Urgent" 
              tasks={tasks.filter(t => t.category === "Urgent")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="Personal" 
              tasks={tasks.filter(t => t.category === "Personal")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="School" 
              tasks={tasks.filter(t => t.category === "School")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="Entertainment" 
              tasks={tasks.filter(t => t.category === "Entertainment")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="Work" 
              tasks={tasks.filter(t => t.category === "Work")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />
            <CategoryIslands title="Untagged" 
              tasks={tasks.filter(t => t.category === "Untagged")
                .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
              } 
              onToggleTask={toggleTaskComplete}
              onEditTask={(task) => {
                setEditingTask(task)
                setTaskPanelOpen(true)
              }}
            />

            {/* <CategoryIslands title="Urgent" tasks={tasks.urgent} />
            <CategoryIslands title="Personal" tasks={tasks.personal} />
            <CategoryIslands title="School" tasks={tasks.school} />
            <CategoryIslands title="Entertainment" tasks={tasks.entertainment} />
            <CategoryIslands title="Work" tasks={tasks.work} />
            <CategoryIslands title="Untagged" tasks={tasks.untagged} /> */}
          </IslandGrid>
          {/* <div className="p-6 flex gap-4 overflow-x-auto">
            <CategoryIslands title="Urgent" tasks={tasks.urgent} />
            <CategoryIslands title="Personal" tasks={tasks.personal} />
            <CategoryIslands title="School" tasks={tasks.school} />
            <CategoryIslands title="Entertainment" tasks={tasks.entertainment} />
            <CategoryIslands title="Work" tasks={tasks.work} />
            <CategoryIslands title="Untagged" tasks={tasks.untagged} />
          </div> */}
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
