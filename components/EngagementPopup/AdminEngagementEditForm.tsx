import { EngagementWithSpeakers } from "@/lib/types";
import TagInput from "@/app/(auth)/bio/TagInput";
import StatusDropdown from "./StatusDropdown";
import ImageUpload from "./ImageUpload";
import { IoPeopleSharp } from "react-icons/io5";
import { MultilineInput } from "./MultilineInput";
import { Input } from "./Input";
import { LocationInput } from "./LocationInput";
import DateInput from "./DateInput";
import { CapacityInput } from "./CapacityInput";

export default function AdminEngagementEditForm({ engagement, setEngagement }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEngagement({ ...engagement, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="text-[#380D5A] font-medium my-4">
                <Input
                    name="title"
                    placeholder="Title"
                    value={engagement.title}
                    onChange={handleChange}
                    error="Please enter a title."
                />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm font-sans text-[#11173D] sm:space-x-2" >
                <LocationInput
                    placeholder="Location"
                    name="location"
                    value={engagement.location}
                    onChange={handleChange}
                    error="Please enter a location."
                />
                <DateInput
                    label="Start:"
                    selected={engagement.start}
                    onChange={(date : Date) => setEngagement({ ...engagement, start: date })}
                    error={"Start date must be before end date."}
                />
                <DateInput
                    label="End:"
                    selected={engagement.end}
                    onChange={(date : Date) => setEngagement({ ...engagement, end: date })}
                    error={"End date must be after start date."}
                />
                <StatusDropdown 
                    status={engagement.status} 
                    setStatus={(status: string) => { setEngagement({ ...engagement, status: status }) }} 
                />

                <CapacityInput
                    name="capacity"
                    value={engagement.capacity}
                    onChange={handleChange}
                    min={1}
                />
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Description</span>
            </div>
            <div className="mb-4">
                <MultilineInput
                    placeholder="Description"
                    name="description"
                    value={engagement.description}
                    onChange={handleChange}
                    rows={6}
                    error="Please enter a description."
                />
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Identity Tags</span>
            </div>
            <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]">
                <TagInput
                    tags={!!engagement['tags'] ? engagement['tags'] : []}
                    setTags={(tags: string[]) => { setEngagement({ ...engagement, tags: tags }) }}
                />
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Image</span>
            </div>
            <ImageUpload
                    image={engagement.image}
                    setImage={(image: string) => { setEngagement({ ...engagement, image: image }) }}
                    error={"Please upload an image."}
                />
            
        </>
    )
}