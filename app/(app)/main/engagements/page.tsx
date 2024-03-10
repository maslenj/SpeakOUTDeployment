import EngagementsView from "./EngagementsView";
import { getEngagements } from "@/lib/db/utils";

export default async function Engagements() {
    const engagements = await getEngagements()
    return (
        <EngagementsView engagemnts={engagements} />
    )
}