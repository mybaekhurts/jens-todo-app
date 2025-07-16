import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"

const SideBarContext = createContext()

export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="top-0 left-0 h-screen w-[sidebarWidth] bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/caticon.png"
            className={`overflow-hidden transition-all ${expanded ? "w-12" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <ul className="px-3">{children}</ul>
        </SideBarContext.Provider>
      </div>
      <div className="border-t flex p-3">
        <img src="/caticon.png" alt="" className="w-10 h-10 rounded-md" />
        <div
          className={`
            flex justify-between items-center
            overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
        >
          <div className="leading-4">
            <h4 className="font-semibold">jen.</h4>
            <span className="text-xs text-gray-600">jenelle906@gmail.com</span>
          </div>
          <MoreVertical size={20} />
        </div>
      </div>
    </aside>
  )
}

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SideBarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-pink-200 to-pink-100 text-pink-800"
            : "hover:bg-pink-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-pink-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-pink-100 text-pink-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all z-50
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}