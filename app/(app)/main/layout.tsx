import Avatar from "@/components/Avatar"
import Sidebar from "@/components/Sidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="border-2 border-[#9D9FA2] h-[90px] w-screen bg-white flex justify-between items-center">
        <img className="mx-4" src="../images/SpeakOUTLogo.svg" />

        <div className="mx-4 hover:cursor-pointer">
          <Avatar image="../images/download.jpg" />
        </div>

      </div>
      <div className="flex bg-[#F3F4F6]">
        <div className="w-64 min-h-screen border-r-2 border-[#9D9FA2] bg-white">
          <Sidebar
          />
        </div>
        <div className="w-full">
          {children}
        </div>

      </div>
    </>
  )
}
