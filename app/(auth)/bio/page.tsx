"use client"

import { radialGradientBackground } from "@/lib/styles";
import BioForm from "./form";

export default function BioPage() {
    return (
        <div className="min-h-screen flex justify-center items-center" style={radialGradientBackground}>
            <div className="shadow-xl p-4 bg-white rounded-xl basis-[500px]">
                <BioForm />
            </div>
        </div>
    );
}