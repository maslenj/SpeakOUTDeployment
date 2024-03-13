import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";
import { Input } from "./Input"
import z from 'zod'
import { TextArea } from "./TextArea";

const BioDataSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    image: z.string().min(1),
    pronouns: z.string().min(1),
    about: z.string().min(1),
    tags: z.array(z.string())
})

type BioData = z.infer<typeof BioDataSchema>

export default function BioForm() {
    const router = useRouter()
    const [formData, setFormData] = useState<BioData>({
        firstname: '',
        lastname: '',
        image: '',
        pronouns: '',
        about: '',
        tags: []
    })
    const [error, setError] = useState("")
    const [zodError, setZodError] = useState<null | any>(null)

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
        // go through each validator and check if the value is empty
        const validationResult = BioDataSchema.safeParse(formData);
        if (!validationResult.success) {
            setError("Please fill out all required fields");
            setZodError(validationResult.error.format());
        } else {
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
                        <Input
                            placeholder="First Name"
                            name="firstname"
                            value={formData['firstname']}
                            onChange={handleChange}
                            error={ zodError && zodError['firstname'] }
                        />
                    </div>
                    <div className="my-3">
                        <Input
                            placeholder="Last Name"
                            name="lastname"
                            value={formData['lastname']}
                            onChange={handleChange}
                            error={ zodError && zodError['lastname'] }
                        />
                    </div>
                    <div className="my-3">
                        <Input
                            placeholder="Pronouns"
                            name="pronouns"
                            value={formData['pronouns']}
                            onChange={handleChange}
                            error={ zodError && zodError['pronouns'] }
                        />
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="my-3">
                        <TextArea
                            placeholder="Tell us about yourself"
                            name="about"
                            value={formData['about']}
                            onChange={handleChange}
                            error={ zodError && zodError['about'] }
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