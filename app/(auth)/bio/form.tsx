import Button from "@/components/Button";
import UploadIcon from "@/components/icons/UploadIcon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";

interface BioData {
    firstname?: string,
    lastname?: string,
    image?: string,
    pronouns?: string,
    about?: string,
    tags?: string[],
}

export default function BioForm() {
    const router = useRouter()
    const [formData, setFormData] = useState<BioData>({})
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    const submitForm = async () => {        
        fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(formData) })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    router.push('/main/home')
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-5 w-full p-4">
                <div className="col-span-2">
                    <ImageUpload
                        image={!!formData['image'] ? formData['image'] : ""}
                        setImage={(image: string) => { setFormData(formData => ({ ...formData, image: image })) }}
                    />
                </div>
                <div className="col-span-3">
                    <div className="my-3">
                        <input
                            placeholder="First Name"
                            className={'w-full py-2 px-3 inline-block border placeholder-[#1E2A78] border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 text-base flex-center'}
                            name="firstname"
                            value={formData['firstname']}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-3">
                        <input
                            placeholder="Last Name"
                            className={'w-full py-2 px-3 inline-block border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base flex-center'}
                            name="lastname"
                            value={formData['lastname']}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-3">
                        <input
                            placeholder="Pronouns"
                            className={'w-full py-2 px-3 inline-block border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base flex-center'}
                            name="pronouns"
                            value={formData['pronouns']}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="my-3">
                        <textarea
                            placeholder="Tell us about yourself"
                            className="mt-1 py-2 px-3 block w-full border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base overflow-y-auto text-med font-inter text-slate-950 min-h-[100px]"
                            name="about"
                            value={formData['about']}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-3">
                        <div className="mt-1 py-2 pl-2 pr-3 block w-full border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base overflow-y-auto text-med font-inter text-slate-950 min-h-[100px]">
                            <div className="text-[#1E2A78] pl-1">Identities</div>
                            <TagInput
                                tags={!!formData['tags'] ? formData['tags'] : []}
                                setTags={(tags: string[]) => { setFormData(formData => ({ ...formData, tags: tags })) }}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="flex-row flex items-center justify-center w-full">
                <Button type="button" onClick={submitForm}>Finish</Button>
            </div>
        </form>
    )
}