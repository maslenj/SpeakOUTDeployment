import { AiOutlineClose } from "react-icons/ai";
import PopupModal from "./PopupModal";
import AdminEngagementEditForm from "./AdminEngagementEditForm";
import { useState } from "react";
import { EngagementWithSpeakers } from "@/lib/types";
import Button from "../Button";
import { Engagement } from "@prisma/client";
import Typography from "../Typography";

export default function AdminEngagementCreate({ onClose }: { onClose: () => void }){
    const [engagement, setEngagement] = useState<EngagementWithSpeakers>({
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "",
        start: new Date(),
        end: new Date(),
        image: "",
        status: "in-person",
        tags: [],
        location: "",
        description: "",
        capacity: 0,
        confirmedSpeakers: [],
        pendingSpeakers: [],
    })

    const createEvent = () => {
        const { id, createdAt, updatedAt, confirmedSpeakers, pendingSpeakers, ...rest } = engagement;
        fetch('/api/engagements', {
            method: 'POST',
            body: JSON.stringify(rest),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                onClose();
            }
        })
    }

    return (
        <PopupModal>
            <div className="flex justify-end">
                <AiOutlineClose className="cursor-pointer" onClick={onClose} />
            </div>

            <Typography variant="h2">Create New Event</Typography>

            <AdminEngagementEditForm engagement={engagement} setEngagement={setEngagement}/>
            <Button onClick={createEvent} variant="primary">Create</Button>
        </PopupModal>
    )
}