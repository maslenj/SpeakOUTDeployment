import HomeView from "@/app/(app)/main/home/HomeView";
import { getEngagements, getSelf } from "@/lib/db/utils";

export default async function Home() {
    const fullUser = await getSelf()
    const engagementsData = await getEngagements()
    if (fullUser == null) {
        throw new Error("User not found");
    }

    return <HomeView user={fullUser} engagementsData={engagementsData} />
}