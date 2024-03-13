import { UserNoPassword } from "@/lib/types";
import ProfileData from "./ProfileData";
import Avatar from "@/components/Avatar";
import Typography from "@/components/Typography";

export default function UserView({ user }: { user: UserNoPassword }) {
    return (
        <div className="w-full md:px-20 px-5">
            <div className="mb-1 mt-5 flex items-center">
                <Avatar image={user.image} />
                <div className="ml-2 flex flex-row">
                    <div className="pl-3 font-medium">
                        <Typography variant="h1">
                            {user["firstname"]} {user["lastname"]}
                        </Typography>
                    </div>
                    <div className="pl-3 pt-4 font-semibold">
                        <Typography variant="h3">{user["pronouns"]}</Typography>
                    </div>
                </div>
            </div>
            <ProfileData user={user} />
        </div>
    )
}