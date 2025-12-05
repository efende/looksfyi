

const ProfileHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-32 pb-8 px-4">
            {/* Avatar Container */}
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
                        alt="Kingdom Chen"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Verification Badge */}
                <div className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full border-2 border-white flex items-center justify-center w-6 h-6">
                    <span className="text-[10px] font-bold">K</span>
                </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-normal text-gray-900 mb-2 tracking-wide">Kingdom Chen</h1>

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="font-normal text-black">71</span>
                <span>followers</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                <span className="font-normal text-black">42</span>
                <span>following</span>
            </div>

            {/* Link */}
            <a href="#" className="text-sm text-gray-400 hover:text-black transition-colors hover:underline">
                abc.ai
            </a>
        </div>
    );
};

export default ProfileHeader;
