import { Coins, Crown } from 'lucide-react';
import LoginButton from './LoginButton';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                    {/* Simple Grid/Logo Icon Placeholder */}
                    <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                    </div>
                </div>
                <span className="font-normal text-gray-900">Kingdom</span>
            </div>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-sm text-gray-500 gap-4">
                <span className="text-black font-normal">AI Try-On</span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="text-gray-500 cursor-pointer hover:text-black transition-colors">Looks</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-gray-600 hover:text-black cursor-pointer transition-colors">
                    <Coins size={16} />
                    <span className="text-sm font-normal">15</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors">
                        <Crown size={14} />
                        <span>Upgrade</span>
                    </button>
                    <LoginButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
