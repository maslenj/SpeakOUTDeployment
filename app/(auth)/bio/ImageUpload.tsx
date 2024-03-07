import UploadIcon from '@/components/icons/UploadIcon';
import React from 'react';

const ImageUpload = ({ image, setImage }: { image: string, setImage: (image: string) => void }) => {
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
        <div className="w-full flex align-center justify-center pt-4">
            <div className='w-[144px] h-[144px] flex items-center justify-center bg-[#E4E4E4] border-2 border-[#61646D] rounded-full'>
                <input
                    type="file"
                    className='opacity-0 cursor-pointer absolute w-[144px] h-[144px]'
                    onChange={handleImageChange}
                />
                {!!image ?
                    <img src={image} alt="Preview" className="w-full h-full object-cover rounded-full" />
                    :
                    <span className="text-white text-3xl"> <UploadIcon /> </span>
                }
            </div>
        </div>
    );
};

export default ImageUpload;
