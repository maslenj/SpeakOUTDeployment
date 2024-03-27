import UploadIcon from '@/components/icons/UploadIcon';
import React from 'react';

const base_classes = "mt-3 flex flex-wrap border border-black w-full rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]"
const error_classes = "mt-3 flex flex-wrap border-2 border-red-500 w-full rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]"

const ImageUpload = ({ image, setImage, error }: { image: string, setImage: (image: string) => void, error?: string }) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = typeof reader.result === 'string' ? reader.result.replace("data:", "").replace(/^.+,/, "") : '';
                setImage(`data:image/jpeg;base64,${base64String}`);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <>
            <div className={error? error_classes : base_classes}>
                <div className="w-full flex align-center justify-center py-4">
                    <div className='flex items-center justify-center max-h-[200px]'>
                        <input
                            type="file"
                            className='opacity-0 cursor-pointer absolute w-[144px] h-[144px]'
                            onChange={handleImageChange}
                        />
                        {!!image ?
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                            :
                            <span className='p-2 rounded-lg bg-[#E4E4E4]'> Upload Image <UploadIcon /> </span>
                        }
                    </div>
                </div>
            </div>
            {error && <span className="text-red-500"> {error} </span >}
        </>
    );
};

export default ImageUpload;
