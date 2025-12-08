

import { Avatar, AvatarBadge } from './ui/Avatar';
import { Heading, Text, Link } from './ui/Typography';

const ProfileHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-32 pb-8 px-4">
            {/* Avatar Container */}
            <div className="mb-6">
                <Avatar
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
                    alt="Kingdom Chen"
                    size="lg"
                >
                    <AvatarBadge>
                        <span className="text-[10px] font-bold">K</span>
                    </AvatarBadge>
                </Avatar>
            </div>

            {/* Name */}
            <Heading level={1} className="mb-2">Kingdom Chen</Heading>

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
