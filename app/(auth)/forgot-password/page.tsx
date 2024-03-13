"use client"

import Typography from "@/components/Typography";
import { radialGradientBackground } from "@/lib/styles";
import { useSearchParams } from "next/navigation";
import ForgotPasswordForm from "./form";
import { useState } from "react";


export default function ResetPassword() {
    const [showMessage, setShowMessage] = useState(false)
    const searchParams = useSearchParams()

    const code = searchParams.get("code");

    return (
        <div className="min-h-screen flex justify-center items-center" style={radialGradientBackground}>
            <div className="shadow-xl p-4 bg-white rounded-xl basis-[500px]">
                <div className="flex justify-left items-left w-full rounded-lg">
                    <img src="images/SpeakOUTLogo.svg" />
                </div>
                <div className='mb-8 text-center'>
                    <Typography variant='h2'> Forgot Password </Typography>
                </div>
                {
                    showMessage ?
                        <div className='p-2 rounded bg-green-200'>
                            A password reset link has been sent to your email.
                        </div>
                        :
                        <ForgotPasswordForm
                            setShowMessage={setShowMessage}
                        />
                }
            </div>
        </div>
    )
}