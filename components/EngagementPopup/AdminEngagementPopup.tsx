// This is the component that handles the toggling between the Admin Event Popup 
// when it is editable and non-editable. 
// Created by Benji and Riddhi -- Touched up by Aidan

'use client'
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AdminEngagementEdit } from './AdminEngagementEdit';
import { AdminEngagementView } from './AdminEngagementView';
import { EngagementWithSpeakers } from '@/lib/types';
import PopupModal from './PopupModal';


export function AdminEngagementPopup({ engagement, setEngagement, onClose }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void, onClose: () => void }) {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(editMode => !editMode);
    };

    return (
        <PopupModal onClose={onClose}>
            <div>
                {editMode ? (
                    <AdminEngagementEdit engagement={engagement} setEngagement={setEngagement} toggleEditMode={toggleEditMode} />
                ) : (
                    <AdminEngagementView engagement={engagement} toggleEditMode={toggleEditMode} />
                )}
            </div>
        </PopupModal>
    )
}