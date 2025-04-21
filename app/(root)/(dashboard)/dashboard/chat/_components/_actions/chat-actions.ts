import { prisma } from '@/utils/prisma'
import { auth } from '@/utils/auth'

export async function getOrganizationMembers(organizationId: string) {
  try {
    const members = await prisma.organizationMember.findMany({
      where: {
        organizationId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return members
  } catch (error) {
    throw new Error('Failed to fetch organization members')
  }
}

export async function sendMessage(content: string, receiverId: string) {
  try {
    const session = await auth()
    if (!session?.user) throw new Error('Not authenticated')

    const message = await prisma.directMessage.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return message
  } catch (error) {
    throw new Error('Failed to send message')
  }
}

export async function getMessages(userId1: string, userId2: string) {
  try {
    const messages = await prisma.directMessage.findMany({
      where: {
        OR: [
          { AND: [{ senderId: userId1 }, { receiverId: userId2 }] },
          { AND: [{ senderId: userId2 }, { receiverId: userId1 }] },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return messages
  } catch (error) {
    throw new Error('Failed to fetch messages')
  }
} 

export async function getUserOrganizationId(userId: string) {
    try {
        const membership = await prisma.organizationMember.findFirst({
            where: {
                userId,
            },
        })
    } catch (error) {
        throw new Error('Failed to fetch user organization ID')
    }
}

