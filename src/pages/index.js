import { Geist, Geist_Mono } from "next/font/google";
import SideBar, { SideBarItem } from "../components/SideBar";
import TopBar from "../components/TopBar"
import CategoryIslands from "@/components/CategoryIslands"
import IslandGrid from "@/components/IslandGrid"
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
  const tasks = {
    urgent: ["RUN"],
    personal: [
      "find a life", "touch grass", "tidy bed", "clean baby", "pack for trip",
      "rethink life choices", "scroll on phone", "punch keyboard", "lick cat litter", "feed the laptop"
    ],
    school: [
      "check bus schedule", "skip class", "get lost in campus", "plagarize assignments",
      "catch toilet lizards", "sneak into blocked areas", "complain canteen food",
      "pet campus kitties", "rank in lecture", "follow lecturer around"
    ],
    entertainment: [
      "watch paint dry", "steal samples", "make baby cry"
    ],
    work: [
      "yell at customers", "find a job", "play with coffee machine"
    ],
    untagged: [
      "do something", "stock up fridge"
    ]
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar>
        <SideBarItem icon={<ClipboardList />} text="Tasks" active />
        <SideBarItem icon={<Calendar />} text="Calendar View" />
        <SideBarItem icon={<FileDown />} text="Import" />
        <SideBarItem icon={<FileUp />} text="Export" />
      </SideBar>

      <main className="flex-1">
        <TopBar title="To-Do List" />

        <IslandGrid>
          <CategoryIslands title="Urgent" tasks={tasks.urgent} />
          <CategoryIslands title="Personal" tasks={tasks.personal} />
          <CategoryIslands title="School" tasks={tasks.school} />
          <CategoryIslands title="Entertainment" tasks={tasks.entertainment} />
          <CategoryIslands title="Work" tasks={tasks.work} />
          <CategoryIslands title="Untagged" tasks={tasks.untagged} />
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
    </div>
  )
}
