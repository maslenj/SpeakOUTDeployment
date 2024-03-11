import { radialGradientBackground } from "@/lib/styles";
import { AiOutlineClose } from "react-icons/ai";

export default function PopupModal({ onClose, children }: { onClose: () => void, children: React.ReactNode }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center lg:min-w-[1400px], xs:w-full">
            <div className="absolute top-0 left-0 w-full h-full" style={radialGradientBackground}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-[#380D5A] border rounded-xl p-6 text-left w-[70%] flex flex-col overflow-y-auto h-800 max-h-screen">
                    <div className="flex justify-end">
                        <AiOutlineClose className="cursor-pointer" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}