import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { User } from "@/components/User"
import { LoginButton, LogoutButton } from '@/components/Auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <main>
        <LoginButton />
        <LogoutButton />
        <h2>Server Session</h2>
        <pre>{JSON.stringify(session)}</pre>
        <h2>Client Call</h2>
        <User />
        <div className='my-4'>
          <p className='font-bold'> login info: </p>
          <p> email: admin@gmail.com </p>
          <p> password: test </p>
          <p className='italic'> or </p>
          <p> email: user@gmail.com </p>
          <p> password: test </p>
        </div>
      </main>
    </>
  )
}