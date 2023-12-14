import Typography from '@/components/Typography'
import { LoginForm } from './form'
import Link from 'next/link'
const elementStyle = {
    background: `
    radial-gradient(
        farthest-corner at bottom left,
        rgba(255, 0, 0, 0.5),
        transparent 600px
    ),
    radial-gradient(
        farthest-side at top right,
        rgba(100, 0, 255, 0.5),
        transparent
    ),
    radial-gradient(
        farthest-corner at bottom right,
        rgba(0, 100, 50, 0.5),
        transparent 600px
    ),
    radial-gradient(
        farthest-side at top left,
        rgba(255, 255, 0, 0.5),
        transparent
    )`,
};

export default function Login() {
    return (
        <div className="min-h-screen flex justify-center items-center" style={elementStyle}>
            <div className="shadow-xl p-4 bg-white rounded-xl basis-[500px]">
                <div className="flex justify-left items-left w-full rounded-lg">
                    <img src="images/SpeakOUTLogo.svg" />
                </div>
                <div className='mb-8 text-center'>
                    <Typography variant='h2'> Sign In </Typography>
                </div>
                <LoginForm />
                <div className='mt-12 flex items-center justify-center'>
                    <Typography variant="p1"> Don't have an account? <Link className='font-medium text-[#140222] hover:underline' href='/register'>Sign Up.</Link></Typography>
                </div>

            </div>
        </div>
    )
}