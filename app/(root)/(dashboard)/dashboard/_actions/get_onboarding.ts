import { prisma } from "@/utils/prisma"
import { auth } from "@/utils/auth"

export const getOnboarding = async () => {
    const session = await auth()
    if (!session?.user) {
        return false
    }
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            onboardingComplete: true    
        }
    })
    return user?.onboardingComplete
}