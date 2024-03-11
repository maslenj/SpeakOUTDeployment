import PopupModal from "@/components/EngagementPopup/PopupModal";
import Typography from "@/components/Typography";
import { useState } from "react";

export default function InviteSpeakersPopup({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({message: "Welcome to SpeakOUT Boston!", email: ""})
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch('/api/users/invite', {
            method: "POST",
            body: JSON.stringify(formData),
        })
    }

    return (
        <PopupModal onClose={onClose}>
            <Typography variant="h2"> Invite Speaker </Typography>
            <form onSubmit={onSubmit}>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-40 border-2 border-gray-300 rounded-md p-2"
                    placeholder="Invite message"
                />
                <div className="flex">
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded-md p-2 flex-grow"
                        placeholder="Email"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-800 text-white rounded-md p-2"
                    >
                        Invite
                    </button>
                </div>
            </form>
        </PopupModal>
    )
}