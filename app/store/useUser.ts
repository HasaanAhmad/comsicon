import { create } from 'zustand'
import { UserRole } from '@prisma/client'

interface UserData {
  id: string
  name: string | null
  email: string
  image: string | null
  role: UserRole
  onboardingComplete: boolean
}

interface UserState {
  user: UserData | null
  setUser: (user: UserData | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useUser = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      
      if (data?.user) {
        set({ user: data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      set({ user: null });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
})) 