import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import ProfileView from "./ProfileView";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const sessionUser: any = session?.user;
  const user = await prisma.user.findUnique({ where: { id: sessionUser.id } });
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <ProfileView user={user} />
  )
}