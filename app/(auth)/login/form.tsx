'use client' 
import React, { useState } from 'react'
import Button from '@/components/Button'
import { Input } from '@/components/TextInput'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginData {
    email?: string,
    password?: string,
}

export const LoginForm = () => {
    const router = useRouter()
    const callbackUrl = '/main/home'
    const [formData, setFormData] = useState<LoginData>({email: '', password: ''})
    const [error, setError] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = formData
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl
            })
            if (!res?.error) {
                router.push(callbackUrl)
            } else {
                setError('Invalid email or password.')
            }
        } catch (error : any) {}
    }

    return (
        <form className="space-y-2 flex items-center justify-center" onSubmit={onSubmit}>
            <div className="flex-1 grid items-center gap-6 max-w-xs">
                <Input
                    required
                    icon='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={formData['email']}
                    onChange={handleChange}
                />
                <Input
                    required
                    icon='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={formData['password']}
                    onChange={handleChange}
                />

                {
                    error && (
                        <div className='p-2 rounded bg-red-200'>
                            {error}
                        </div>
                    )
                }

                <div className='flex justify-center'>
                    <Button type='submit' variant='primary'> Log In </Button>
                </div>
            </div>
        </form>
    )
}