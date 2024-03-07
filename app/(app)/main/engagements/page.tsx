import { getServerSession } from "next-auth";
import EngagementsView from "./EngagementsView";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function Engagements() {
    const engagements = await prisma.engagement.findMany({
        include: {
            confirmedSpeakers: true,
            pendingSpeakers: true
        }
    })
    const session = await getServerSession(authOptions)
    const sessionUser : any = session?.user
    const user = await prisma.user.findUnique({where: {id: parseInt(sessionUser?.id)}})
    if (!user) {
        throw new Error("User not found")
    }

    return (
        <EngagementsView 
            engagemnts={engagements}
            user={user}
        />
    )
}