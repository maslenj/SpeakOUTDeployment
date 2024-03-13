import { AiOutlineClose } from "react-icons/ai";
import PopupModal from "./PopupModal";
import AdminEngagementEditForm from "./AdminEngagementEditForm";
import { Dispatch, SetStateAction, useState } from "react";
import { EngagementWithSpeakers } from "@/lib/types";
import Button from "../Button";
import Typography from "../Typography";
import { Engagement } from "@prisma/client";

export default function AdminEngagementCreate({ onClose, setEngagements }: { onClose: () => void, setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | Engagement)[]>> }) {
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
                res.json().then(data => {
                    setEngagements(engagements => [...engagements, data])
                    onClose();
                })
            }
        })
    }

    return (
        <div>
            <div className="hidden sm:block">
                <PopupModal onClose={onClose}>
                    <Typography variant="h2">Create New Event</Typography>

                    <AdminEngagementEditForm engagement={engagement} setEngagement={setEngagement} />
                    <Button onClick={createEvent} variant="primary">Create</Button>
                </PopupModal>
            </div>
            <div className="sm:hidden block">
                <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-white overflow-hidden">
                    {/* Improved responsive container */}
                    <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
                        <Typography variant="h2">Create New Event</Typography>
                        <AdminEngagementEditForm engagement={engagement} setEngagement={setEngagement} />
                        <Button onClick={createEvent} variant="primary">Create</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}