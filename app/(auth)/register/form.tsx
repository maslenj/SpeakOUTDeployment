'use client'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { Input } from '@/components/TextInput'
import { signIn } from 'next-auth/react'

interface RegistrationData {
    email?: string,
    password?: string,
    accesscode?: string
}

export const RegisterForm = () => {
    const [formData, setFormData] = useState<RegistrationData>({})
    const [error, setError] = useState(null)
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

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (res.ok) {
                signIn()
            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
        }
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
                <Input
                    required
                    icon='key'
                    name='accesscode'
                    type='text'
                    placeholder='Access Code'
                    value={formData['accesscode']}
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
                    <Button type='submit' variant='primary'> Sign Up </Button>
                </div>
            </div>
        </form>
    )
}