import Button from "@/components/Button";
import { Input } from "@/components/TextInput";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordForm({ setShowMessage } : { setShowMessage: (show: boolean) => void}) {
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({ email: '' })

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
        console.log(formData)
        const res = await fetch('/api/forgotpassword', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
        console.log(res)
        
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            if (data.error) {
                setError(data.error)
            } else {
                setShowMessage(true)
            }
        } else {
            setError(data.error || 'An unknown error occurred. Please try again.')
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
                    placeholder='Enter you email address'
                    value={formData['email']}
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
                    <Button type='submit' variant='primary'> Reset Password </Button>
                </div>
            </div>
        </form>
    )
}