import SpeakerView from "./SpeakerView"
import { getUsers } from "@/lib/db/utils";

export default async function SpeakerPage() {
  const users = await getUsers();
  return (
    <SpeakerView users={users} />
  )
}