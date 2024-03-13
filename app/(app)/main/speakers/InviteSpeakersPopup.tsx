import Button from "@/components/Button";
import PopupModal from "@/components/EngagementPopup/PopupModal";
import Typography from "@/components/Typography";
import { useState } from "react";

export default function InviteSpeakersPopup({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({message: "Welcome to SpeakOUT Boston!", email: ""})
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('/api/users/invite', {
            method: "POST",
            body: JSON.stringify(formData),
        })
        if (res.ok) {
            onClose()
        }
    }

    return (
        <PopupModal onClose={onClose}>
            <Typography variant="h2"> Invite Speaker </Typography>
            <form onSubmit={onSubmit}>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-40 border border-black rounded-md p-2"
                    placeholder="Invite message"
                />
                <div className="flex">
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded-md p-2 border border-black flex-grow mr-2"
                        placeholder="Email"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Invite
                    </Button>
                </div>
            </form>
        </PopupModal>
    )
}