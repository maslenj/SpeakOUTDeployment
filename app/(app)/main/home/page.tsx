import { EngagementCard } from "@/components/EngagementCard";
import { NotifCard } from "@/components/NotifCard";
import Typography from '@/components/Typography'


export default async function Homepage() {
  return (
    <div className="w-full ml-20">
      <div className="mb-2 mt-5"> <Typography variant="h1" > Welcome, Ellyn! </Typography> </div>
      <div className="my-4"><Typography variant="h2" > Upcoming Engagements</Typography></div>
      <div className="grid grid-cols-1 gap-4">
        <div className="w-[80%]"><EngagementCard image={"./pfp.png"} location="Beebe Library, Wakefield" startTime='10:00am' endTime='5:00pm' date='9/24/24' full={false} /></div>
        <div className="w-[80%]"><EngagementCard image={"./pfp.png"} location="Beebe Library, Wakefield" startTime='10:00am' endTime='5:00pm' date='9/24/24' full={false} /></div>
        <div className="w-[80%]"><EngagementCard image={"./pfp.png"} location="Beebe Library, Wakefield" startTime='10:00am' endTime='5:00pm' date='9/24/24' full={true} /></div>
        <div className="w-[80%]"><EngagementCard image={"./pfp.png"} location="Beebe Library, Wakefield" startTime='10:00am' endTime='5:00pm' date='9/24/24' full={true} /></div>
      </div>

      <div className="my-4"> <Typography variant="h2" > Notifications </Typography></div>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="w-[80%]"><NotifCard image="" name="Courtney Kreitzer" description="Completed her training"/></div>
        <div className="w-[80%]"><NotifCard image="" name="Aidan Banerjee" description="Completed his training"/></div>
        <div className="w-[80%]"><NotifCard image="" name="Jimmy Maslen" description="Completed his training"/></div>
      </div>
    </div>
  )
}