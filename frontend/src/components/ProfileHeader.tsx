import { Heading, Text, Link } from './ui/Typography';

interface ProfileHeaderProps {
    onUpload?: () => void;
    username?: string;
}

const ProfileHeader = ({ onUpload, username = "Kingdom Chen" }: ProfileHeaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center pt-32 pb-8 px-4">
            {/* Avatar Container */}
            <div
                className={`mb-6 relative group ${onUpload ? 'cursor-pointer' : ''}`}
                onClick={onUpload}
            >
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-100">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-12 h-12"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>

                {onUpload && (
                    <button
                        className="absolute -bottom-2 -right-4 bg-gray-100/50 backdrop-blur-sm hover:bg-gray-200/80 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full transition-all border border-white/50 shadow-sm"
                        title="Upload Avatar"
                    >
                        Upload
                    </button>
                )}
            </div>

            {/* Name */}
            <Heading level={1} className="mb-2">{username}</Heading>

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm mb-3">
                <Text>71</Text>
                <Text variant="muted">followers</Text>
                <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                <Text>42</Text>
                <Text variant="muted">following</Text>
            </div>

            {/* Link */}
            <Link href="#">
                abc.ai
            </Link>
        </div>
    );
};

export default ProfileHeader;
