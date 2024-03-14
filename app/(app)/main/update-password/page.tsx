"use client"

import Button from "@/components/Button";
import { Input } from "@/components/TextInput";
import Typography from "@/components/Typography";
import { useState } from "react";

export default function UpdatePassword() {
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert("Passwords do not match")
        } else {
            const res = await fetch('/api/updatepassword', {
                method: "POST",
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                alert("Password updated")
            }
        }
    }

    return (
        <>
            <form className="m-4" onSubmit={onSubmit}>
                <div>
                    <Typography variant="h2"> Update Password </Typography>
                </div>
                <div className="max-w-[500px] space-y-2 my-2">
                    <div>
                        <Input
                            icon="password"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            type="password"
                            name="oldPassword"
                            placeholder="Current Password"
                        />
                    </div>
                    <div>
                        <Input
                            icon="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <Input
                            icon="password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                        />
                    </div>
                </div>

                <div>
                    <Button type="submit">Update Password</Button>
                </div>
            </form>

        </>


    )
}