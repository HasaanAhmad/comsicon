import { auth } from "@/utils/auth"
import { signOut, signIn } from "@/utils/auth"

const page = async () => {
  const session = await auth()

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  const handleSignIn = async () => {
    'use server'
    await signIn('google')
  }

  return (  
    <div>
      {session?.user ? (
        <div>
          <h1>Welcome {session.user.name}</h1>
          <form action={handleSignOut}>
            <button type="submit">Sign Out</button>
          </form>
        </div>
      ) : (
        <div>
          <div>Not Logged In</div>
          <form action={handleSignIn}>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  )
} 

export default page