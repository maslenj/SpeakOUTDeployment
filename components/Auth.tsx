'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return <button className='p-3 bg-slate-400 m-2 rounded-md' onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className='p-3 bg-slate-400 m-2 rounded-md' onClick={() => signOut()}>Sign Out</button>
}