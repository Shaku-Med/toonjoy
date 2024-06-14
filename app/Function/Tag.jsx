import Link from "next/link";

let Tags = () => {
    return (
        <>
            <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {/*  */}
            <div className="text-center mt-8 w-full">
                <a title="Facebook" target="_blank" href="https://www.facebook.com/tooonjoy" className="text-blue-600 dark:text-blue-400 mx-2"><i className="bi bi-facebook text-2xl"></i></a>
                <a title="Facebook | Owner | Medzy Amara" target="_blank" href="https://www.facebook.com/medzy.amara.1" className="text-blue-400 dark:text-blue-300 mx-2"><i className="bi bi-person text-2xl"></i></a>
                <a title="Youtube" target="_blank" href="https://www.youtube.com/channel/UCbhgpkOtQDMPKxb62HCeFhg" className="text-pink-600 dark:text-pink-400 mx-2"><i className="bi bi-youtube text-2xl"></i></a>
                <a title="Spotify" target="_blank" href="https://open.spotify.com/artist/0n7maaPRkmcz9CEJupVCT1" className="text-pink-600 dark:text-pink-400 mx-2"><i className="bi bi-spotify text-2xl"></i></a>
                <Link title="Privacy & Security" href="../Privacy" className="text-pink-600 dark:text-pink-400 mx-2"><i className="bi bi-lock text-2xl"></i></Link>
                <Link title="About Us." href="../About" className="text-pink-600 dark:text-pink-400 mx-2"><i className="bi bi-emoji-smile text-2xl"></i></Link>
            </div>

            <div className="ropyR flex items-center justify-center gap-2 text-center w-full p-1">
                <i className="bi bi-c-circle" />
                <span>Copyright {new Date().getFullYear()} toonjoy.org. All rights reserved.</span>
            </div>

            <div className="moreInfos mt-2 flex w-full text-center items-center justify-center p-1 text-[#3a7dda]">
                <a href="http://toonjoy.org" target="_blank" rel="noopener noreferrer">Toonjoy.org</a>
            </div>
        </>
    )
};

export default Tags