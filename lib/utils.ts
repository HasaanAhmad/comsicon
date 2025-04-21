import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "@/lib/prisma"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateOrganizationCode(): Promise<string> {
  const length = 8
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code: string
  let exists = true

  while (exists) {
    code = Array.from(
      { length }, 
      () => chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')

    const orgExists = await prisma.organization.findUnique({
      where: { code }
    })

    exists = !!orgExists
  }

  return code
}
