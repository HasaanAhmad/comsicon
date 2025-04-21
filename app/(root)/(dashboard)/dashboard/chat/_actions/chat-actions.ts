"use server"

import { prisma } from '@/utils/prisma'

export async function getUserOrganizationId(userId: string) {
  const membership = await prisma.organizationMember.findFirst({
    where: {
      userId: userId
    },
    select: {
      organizationId: true
    }
  });
  
  if (!membership) {
    throw new Error("User is not a member of any organization");
  }
  
  return membership.organizationId;
}

export async function getOrganizationMembers(organizationId: string) {
  return prisma.organizationMember.findMany({
    where: { organizationId },
    include: { user: true }
  });
}

export async function sendMessage(content: string, receiverId: string) {
  const message = await prisma.directMessage.create({
    data: {
      content,
      receiverId,
      senderId: receiverId // This should be the current user's ID, will need to be fixed
    },
    include: {
      sender: true
    }
  });
  return message;
}

export async function getMessages(userId: string, otherUserId: string) {
  return prisma.directMessage.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    },
    include: {
      sender: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
}