import HomeView from "@/app/(app)/main/home/HomeView";
import { getFutureEngagements, getNotifications, getSelf, isAdmin } from "@/lib/db/utils";

export default async function Home() {
    const fullUser = await getSelf()
    const engagementsData = await getFutureEngagements()
    const notifications = await getNotifications()
    if (fullUser == null) {
        throw new Error("User not found");
    }

    return (
        <HomeView 
            user={fullUser} 
            engagementsData={engagementsData} 
            notificationData={notifications}
        />
    )
}