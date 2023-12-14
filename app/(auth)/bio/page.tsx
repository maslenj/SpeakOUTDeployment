"use client"

export default function BioPage() {
    const elementStyle = {
        width: '100vw',
        height: '100vh',
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

    const formContainerStyle: React.CSSProperties = {
        position: "absolute",
        top: "20px",  // Adjust the top position as needed
        right: "10px",  // Adjust the right position as needed
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    };

    const inputStyle: React.CSSProperties = {
        width: "150%",
        height: "45px",
        backgroundColor: "white",
        borderRadius: "8px",
        border: "2px solid #475569",
        padding: "10px",
        marginBottom: "10px",
    };

    const largeInputStyle: React.CSSProperties = {
        width: "90%",
        height: "120px", // Adjust the height as needed
        backgroundColor: "white",
        borderRadius: "8px",
        border: "2px solid #475569",
        padding: "10px",
        marginBottom: "10px",
    };

    const avatarStyle = {
        width: '150px', // Set the desired width for your avatar
        height: '150px', // Set the desired height for your avatar
        border: '2px solid #000', // Add a border (adjust the styles as needed)
        borderRadius: '50%', // Make it circular
        overflow: 'hidden', // Clip the image within the circular container
    };

    const imageStyle = {
        width: '100%', // Make the image take up the full space of the container
        height: '100%', // Make the image take up the full space of the container
        borderRadius: '50%', // Ensure the image itself is circular
    };



    return (
        <div className="element flex justify-center items-center h-screen" style={elementStyle}>
            <div className="bg-white color-white border border-2 border-black rounded-lg w-2/5 h-4/6 flex flex-col relative">
                <div className="grid grid-cols-2 gap-4">
                    <div className="mt-10 ml-10 text-center">
                        <div className="avatar" style={avatarStyle}>
                            <div className="profile-image">
                                <img src={"./dummy.png"} alt="Profile" style={imageStyle} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto" style={formContainerStyle}>
                        <input
                            type="text"
                            className="bg-white rounded-lg border"
                            placeholder="First Name"
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            className="bg-white rounded-lg border"
                            placeholder="Last Name"
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            className="bg-white rounded-lg border"
                            placeholder="Pronouns"
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center mt-10 items-center">
                    <textarea
                        className="bg-white rounded-lg border border-slate-950 px-4 py-2"
                        placeholder="Tell us a little bit about yourself"
                        style={largeInputStyle}
                    ></textarea>
                    <textarea
                        className="bg-white rounded-lg border border-slate-950 px-4 py-2"
                        placeholder="Identities"
                        style={largeInputStyle}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}