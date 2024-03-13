import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserNoPassword, userNoPasswordFields } from "../types";

export const isAdmin = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user || sessionUser.role !== "ADMIN") {
        return false;
    }
    return true;
}

export const getUsers = async () => {
    if (!(await isAdmin())) {
        return [];
    }
    const users = await prisma.user.findMany({
        select: userNoPasswordFields,
    });
    return users;
}

export const getSelf = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user) {
        return null;
    }
    const user: UserNoPassword | null = await prisma.user.findUnique({
        select: userNoPasswordFields,
        where: {
            id: parseInt(sessionUser.id)
        }
    });
    return user;
}

export const getUser = async (id: number) => {
    // ensure that user is admin or the user is the same as the one being requested
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!id || !session || !session.user || (sessionUser.role !== "ADMIN" && parseInt(sessionUser.id) !== id)) {
        return null;
    }
    const user = await prisma.user.findUnique({
        select: userNoPasswordFields,
        where: {
            id: id
        }
    });
    return user;
}

export const getEngagements = async () => {
    if (await isAdmin()) {
        return await prisma.engagement.findMany({
            include: {
                pendingSpeakers: true,
                confirmedSpeakers: true,
            }
        });
    } else {
        return await prisma.engagement.findMany();
    }
}

export const getFutureEngagements = async () => {
    if (await isAdmin()) {
        return await prisma.engagement.findMany({
            where: {
                start: {
                    gte: new Date()
                }
            },
            include: {
                pendingSpeakers: true,
                confirmedSpeakers: true,
            }
        });
    } else {
        return await prisma.engagement.findMany({
            where: {
                start: {
                    gte: new Date()
                }
            },
        });
    }
}

export const getNotifications = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user) {
        return [];
    }
    const notifications = await prisma.notification.findMany({
        where: {
            userId: parseInt(sessionUser.id)
        }
    });
    return notifications;
}