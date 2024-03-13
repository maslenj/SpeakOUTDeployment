import Typography from "@/components/Typography";
import { UserNoPassword } from "@/lib/types";

export default function ProfileData({ user } : { user: UserNoPassword}) {
    return (
        <>
            <div className="flex items-center my-2 space-x-1">
                <div className="pl-2 font-semibold"><Typography variant="p1"> Email:  </Typography></div>
                {user && <Typography variant="p1"> {user["email"]} </Typography>}
            </div>
            <div className="flex items-center my-2 space-x-1">
                <div className="pl-2 font-semibold"><Typography variant="p1"> Phone Number: </Typography></div>
                {user && <Typography variant="p1"> {user["phonenum"]} </Typography>}
            </div>
            <div className="flex items-center my-2 space-x-1">
                <div className="pl-2 font-semibold"><Typography variant="p1"> Password:  </Typography></div>
                <div className="pl-1"><Typography variant="p1"> ************ </Typography></div>
            </div>
            <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > About </Typography></div>
            {user && <div className="pl-2"> <Typography variant="p1" > {user["about"]} </Typography></div>}
            <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > Identities </Typography></div>

            <div className="flex">
                {user.tags && user.tags.map((tag, index) => (
                    <div key={index} className="text-[#000000] rounded-full bg-[#EBEEFF] border border-black flex items-center justify-center w-[fit-content] h-[fit-content] p-2 text-bold ml-2">
                        <Typography variant="p1">{tag}</Typography>
                    </div>
                ))}
            </div>
        </>
    )
}