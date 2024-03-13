import { getSelf, getUser } from "@/lib/db/utils"
import { notFound } from "next/navigation"
import SelfView from "./SelfView"
import UserView from "./UserView"

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getUser(parseInt(params.id))
    const self = await getSelf()
    if (!user) {
        notFound()
    }

    return (
        <>
            {
                user.id === self?.id ?
                    <SelfView
                        user={user}
                    /> :
                    <UserView
                        user={user}
                    />
            }
        </>

    )
}