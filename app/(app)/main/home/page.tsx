import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomeView from "@/app/(app)/main/home/HomeView";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions)
    const user: any = session?.user
    const fullUser = await prisma.user.findUnique({
        where: {
            id: parseInt(user.id)
        }
    })
    if (!fullUser) {
        throw new Error('User not found')
    }
    return <HomeView user={fullUser} />
}