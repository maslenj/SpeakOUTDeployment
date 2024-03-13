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
        <div>
            <div className="hidden sm:block"> {/* This hides the component on screens smaller than 640px, and shows it on larger screens */}
                <PopupModal onClose={onClose}>
                    <div>
                        {editMode ? (
                            <AdminEngagementEdit engagement={engagement} setEngagement={setEngagement} toggleEditMode={toggleEditMode} />
                        ) : (
                            <AdminEngagementView engagement={engagement} toggleEditMode={toggleEditMode} />
                        )}
                    </div>
                </PopupModal>
            </div>
            <div className="sm:hidden block">
                <div className="fixed inset-0 w-screen h-screen z-50 flex justify-center items-center bg-white overflow-hidden">
                    {/* Improved responsive container */}
                    <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
                        {editMode ? (
                            <AdminEngagementEdit engagement={engagement} setEngagement={setEngagement} toggleEditMode={toggleEditMode} />
                        ) : (
                            <AdminEngagementView engagement={engagement} toggleEditMode={toggleEditMode} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}