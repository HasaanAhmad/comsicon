'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from '@/utils/auth'
import { prisma } from '@/utils/prisma'

// Project status enum to match Prisma schema
enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

// Project schema validation
const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  organizationId: z.string().min(1, 'Organization ID is required'),
  startDate: z.string().default(new Date().toISOString().split('T')[0]), // Default to today
  endDate: z.string().transform(str => new Date(str)).optional(),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.ACTIVE),
  progress: z.number().min(0).max(100).default(0),
  dueDate: z.string().transform(str => new Date(str)).optional(),
  members: z.array(z.string()).default([]), // Array of user IDs to add as members
})

export type CreateProjectInput = z.infer<typeof projectSchema>

/**
 * Server action to create a new project
 */
export async function createProject(input: CreateProjectInput) {
  try {
    // Get current user session
    const session = await auth()
    
    if (!session?.user) {
      return {
        error: 'Unauthorized. Please sign in to create a project.'
      }
    }
    
    // Validate input data
    const validatedData = projectSchema.safeParse(input)
    
    if (!validatedData.success) {
      return {
        error: validatedData.error.issues.map(issue => issue.message).join(', ')
      }
    }
    
    const { members, ...projectData } = validatedData.data
    
    // Create the project in database
    const project = await prisma.project.create({
      data: {
        ...projectData,
        tasksCount: 0,
        completedTasks: 0,
        views: 0,
        
        // Add current user as a project member with OWNER role
        members: {
          create: [
            {
              userId: session.user.id,
              role: 'OWNER',
            },
            // Add additional members if provided
            ...members.map(userId => ({
              userId,
              role: 'MEMBER',
            }))
          ]
        },
        
        // Create default kanban columns as tasks
        tasks: {
          create: [
            {
              title: 'To Do',
              description: 'Tasks that need to be done',
              status: 'TODO',
              userId: session.user.id,
              order: 0,
            },
            {
              title: 'In Progress',
              description: 'Tasks that are being worked on',
              status: 'IN_PROGRESS',
              userId: session.user.id,
              order: 1,
            },
            {
              title: 'Completed',
              description: 'Tasks that have been completed',
              status: 'COMPLETED',
              userId: session.user.id,
              order: 2,
            }
          ]
        },
        
        // Create a default chat channel for the project
        chatChannels: {
          create: {
            name: `${projectData.name} General`,
            type: 'GROUP',
          }
        }
      },
      include: {
        members: true,
        tasks: true,
        chatChannels: true,
      }
    })
    
    // Revalidate projects pages
    revalidatePath('/dashboard/projects')
    
    return { project }
  } catch (error) {
    console.error('Error creating project:', error)
    return {
      error: 'Failed to create project. Please try again.'
    }
  }
}

/**
 * Server action to generate a project from AI description
 */
export async function generateProjectFromAI(prompt: string) {
  try {
    // Get current user session
    const session = await auth()
    
    if (!session?.user) {
      return {
        error: 'Unauthorized. Please sign in to create a project.'
      }
    }
    
    // Get the user's organization
    const userOrg = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
      select: { organizationId: true }
    })
    
    if (!userOrg) {
      return {
        error: "You don't belong to any organization"
      }
    }
    
    // Here you would integrate with an AI service
    // For demo purposes, we'll create a project with basic info
    
    // Extract project details from prompt
    const name = prompt.split(' ').slice(0, 4).join(' ') + '...'
    
    // Calculate dates - start now, due in 30 days
    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + 30)
    
    // Mock project data based on the prompt
    const projectData = {
      name,
      description: `Generated from prompt: "${prompt}"`,
      organizationId: userOrg.organizationId,
      startDate: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: ProjectStatus.ACTIVE,
      progress: 0,
      members: [], // Will add current user as owner in createProject
    }
    
    return { project: projectData }
  } catch (error) {
    console.error('Error generating project from AI:', error)
    return {
      error: 'Failed to generate project. Please try again.'
    }
  }
}