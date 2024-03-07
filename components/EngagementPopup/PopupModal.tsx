import { radialGradientBackground } from "@/lib/styles";

export default function PopupModal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center lg:min-w-[1400px], xs:w-full">
            <div className="absolute top-0 left-0 w-full h-full" style={radialGradientBackground}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-[#380D5A] border rounded-xl p-6 text-left w-[70%] flex flex-col overflow-y-auto h-800 max-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}