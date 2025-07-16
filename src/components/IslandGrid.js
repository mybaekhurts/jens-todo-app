export default function IslandGrid({ children }) {
  return (
    <div className="px-6 py-6 w-full">
      <div
        className="
          grid gap-6 transition-all duration-300
          grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
        ">
        {children}
      </div>
    </div>
  )
}
