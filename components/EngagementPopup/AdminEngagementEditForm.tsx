import { GoLocation } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import DatePicker from "react-datepicker";
import { EngagementWithSpeakers } from "@/lib/types";
import TagInput from "@/app/(auth)/bio/TagInput";
import StatusDropdown from "./StatusDropdown";
import ImageUpload from "./ImageUpload";
import { IoPeopleSharp } from "react-icons/io5";

export default function AdminEngagementEditForm({ engagement, setEngagement }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEngagement({ ...engagement, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="text-[#380D5A] font-medium my-4">
                <input
                    name="title"
                    placeholder="Title"
                    value={engagement.title}
                    onChange={handleChange}
                    className="text-[#380D5A] font-medium font-serif text-[20px] w-full border border-black rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6]"
                />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm font-sans text-[#11173D] sm:space-x-2" >
                <span className="border border-black w-[100%] mb-2 sm:w-[20%] rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row">
                    <GoLocation className="pr-1 text-xl" />
                    <input
                        placeholder="Location"
                        name="location"
                        value={engagement.location}
                        onChange={handleChange}
                        className="w-full pl-1 pr-1"
                    />
                </span>
                <span className="border border-black rounded-xl mb-2 px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row">
                    <IoMdTime className="text-xl mr-2" />
                    <DatePicker selected={engagement['start']} onChange={(date: Date) => setEngagement({ ...engagement, start: date })} />
                </span>
                <StatusDropdown status={engagement.status} setStatus={(status: string) => { setEngagement({ ...engagement, status: status }) }} />
                <span className="border border-black rounded-xl mb-2 px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row">
                    <IoPeopleSharp />
                    <input className="ml-2 w-[30px]" type="number" name="capacity" value={engagement.capacity} onChange={handleChange} />
                </span>
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Description</span>
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Description"
                    name="description"
                    value={engagement.description}
                    onChange={handleChange}
                    rows={6}
                    className="border border-black block w-full rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6] resize-none"
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
            <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]">
                <ImageUpload
                    image={engagement.image}
                    setImage={(image: string) => { setEngagement({ ...engagement, image: image }) }}
                />
            </div>
        </>
    )
}