import { notFound } from 'next/navigation'
import SpeakerView from "./SpeakerView"
import { getUsers, isAdmin } from "@/lib/db/utils";


export default async function SpeakerPage() {
  if (!(await isAdmin())) {
    return notFound()
  }
  const users = await getUsers();
  return (
    <SpeakerView users={users} />
  )
}