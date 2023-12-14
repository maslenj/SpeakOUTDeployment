import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      tags: true,
    },
  });
  return NextResponse.json(users);
}

const harcoded_accesscode = "speakOutBoston"; // TO DO: CHANGE THE HARCODED ACCESSCODE

/* Create a New User */
export async function POST(request: Request) {
  const url = new URL(request.url);
  // const accesscode = url.searchParams.get("accesscode");

  const body = await request.json();
  const { email, password, accesscode } = body;

  if (accesscode != harcoded_accesscode) {
    return new NextResponse(JSON.stringify({error: "Accesscode is not valid!"}), { status: 400 });
  }

  // Make sure the essential user information exists!
  if (!email || !password) {
    return new NextResponse(JSON.stringify({error: "Missing username or password"}), {
      status: 400,
    });
  }

  // Hash the user's password.
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = # salt rounds

  // Create a user in the user db with the provided details.
  let newUser = null;
  try {
    newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      },
    });
  } catch (error) {
    return new NextResponse("An error occurred while creating the user.", {
      status: 500,
    });
  }
  return new NextResponse(JSON.stringify(newUser), { status: 200 });
}

/* Update an Existing User */
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const user_Id = url.searchParams.get("id");
  const body = await request.json();
  const { email, password, tags } = body;

  // Make sure the essential user information exists!
  if (!user_Id || !email || !password || !tags) {
    return new NextResponse("Missing information about the user!", {
      status: 400,
    });
  }

  // Hash the user's password.
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = # salt rounds

  // Update the user information.
  let updatedUser = null;
  try {
    updatedUser = await prisma.user.update({
      where: {
        id: parseInt(user_Id),
      },
      data: {
        email: email,
        password: hashedPassword,
        tags: tags || [],
      },
    });
  } catch (error) {
    return new NextResponse("An error occurred while updating the user.", {
      status: 500,
    });
  }
  return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
}

/* Delete ajn Existing User and its Notifications */
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const user_Id = url.searchParams.get("id");

  if (!user_Id) {
    return new NextResponse("No ID provided for deletion of a user!", {
      status: 400,
    });
  }

  // Delete the notifications of the user and then the user itself.
  try {
    const deleteUser = prisma.user.delete({
      where: {
        id: parseInt(user_Id),
      },
    });
    const deleteNotifications = prisma.notification.deleteMany({
      where: {
        userId: parseInt(user_Id),
      },
    });
    const transaction = await prisma.$transaction([
      deleteNotifications,
      deleteUser,
    ]);
  } catch (error) {
    return new NextResponse(
      "An error occurred while deleting the user and its notifications.",
      {
        status: 500,
      }
    );
  }
  return new NextResponse(null, { status: 204 });
}
