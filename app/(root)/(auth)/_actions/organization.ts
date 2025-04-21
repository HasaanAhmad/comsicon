'use server'

import { prisma } from "@/utils/prisma"
import { auth } from "@/utils/auth"
import { generateOrganizationCode } from "@/lib/utils"

export async function createOrganization(name: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const code = await generateOrganizationCode()

  const [organization] = await prisma.$transaction([
    prisma.organization.create({
      data: {
        name,
        code,
        members: {
          create: {
            userId: session.user.id!,
            role: "MANAGER"
          }
        }
      }
    }),
    prisma.user.update({
      where: { id: session.user.id! },
      data: { onboardingComplete: true }
    })
  ])

  return organization
}

export async function joinOrganization(code: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const organization = await prisma.organization.findUnique({
    where: { code }
  })

  if (!organization) {
    throw new Error("Invalid organization code")
  }

  const [member] = await prisma.$transaction([
    prisma.organizationMember.create({
      data: {
        userId: session.user.id!,
        organizationId: organization.id,
        role: "TEAM_MEMBER"
      }
    }),
    prisma.user.update({
      where: { id: session.user.id! },
      data: { onboardingComplete: true }
    })
  ])

  return member
} 