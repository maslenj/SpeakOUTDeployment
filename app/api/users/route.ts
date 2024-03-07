import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Role } from "@prisma/client";

const harcoded_accesscode = "speakOutBoston"; // TO DO: CHANGE THE HARCODED ACCESSCODE

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  const users = await prisma.user.findMany({
    select: {
      firstname: true,
      lastname: true,
      pronouns: true,
      about: true,
      id: true,
      email: true,
      role: true,
      tags: true,
      image: true,
    },
  });
  return NextResponse.json(users);
}

/* Create a New User */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || session.user.role !== Role.ADMIN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  const { email, password, accesscode } = body;
  if (accesscode != harcoded_accesscode) {
    return new NextResponse(
      JSON.stringify({ error: "Accesscode is not valid." }),
      { status: 400 }
    );
  }

  // Make sure the essential user information exists!
  if (!email || !password) {
    return new NextResponse(JSON.stringify({ error: "Missing username or password" }), {
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
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while creating the user." }),
      { status: 500, }
    );
  }
  return new NextResponse(JSON.stringify(newUser), { status: 200 });
}

/* Update an Existing User */
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const user_Id = url.searchParams.get("id");
  if (user_Id == null) {
    return new NextResponse(
      JSON.stringify({ "error": "No ID provided for updating the user!" }),
      { status: 400, }
    );
  }

  const session = await getServerSession(authOptions)
  if (!session || !session.user || !(session.user.role === Role.ADMIN || session.user.id === user_Id)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  delete body.password;
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;
  delete body.role;

  // Update the user information.
  let updatedUser = null;
  try {
    updatedUser = await prisma.user.update({
      where: {
        id: parseInt(user_Id),
      },
      data: body,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse(
        JSON.stringify({ error: "No user with the provided id was found." }),
        { status: 404, }
      );
    } else if (error instanceof PrismaClientValidationError) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid fields in body for user update." }),
        { status: 500, }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "An unknown error occurred while updating the user." }),
        { status: 500, }
      );
    }
  }
  return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
}

/* Delete an Existing User and its Notifications */
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || session.user.role !== "ADMIN") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const url = new URL(request.url);
  const user_Id = url.searchParams.get("id");

  if (!user_Id) {
    return new NextResponse(
      JSON.stringify({ error: "No ID provided for deletion of a user!" }),
      { status: 400, }
    );
  }

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
    await prisma.$transaction([
      deleteNotifications,
      deleteUser,
    ]);
    return new NextResponse(
      JSON.stringify("success"),
      { status: 204 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code == "P2025") {
      return new NextResponse(
        JSON.stringify({ error: "User not found with the provided ID" }),
        { status: 404, }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "An unknown error occurred while deleting the user." }),
        { status: 500, }
      );
    }

  }

}

