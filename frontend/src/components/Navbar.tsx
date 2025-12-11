import { Coins, Crown } from 'lucide-react';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';

interface NavbarProps {
    activeTab: string;
    onSearch: (query: string) => void;
}

const Navbar = ({ activeTab, onSearch }: NavbarProps) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 flex items-center justify-center cursor-pointer text-black transition-opacity hover:opacity-70">
                        <span className="font-serif font-bold text-2xl tracking-tighter leading-none pb-0.5">K</span>
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar activeTab={activeTab} onSearch={onSearch} />
            </div>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-sm text-gray-500 gap-4 pointer-events-none opacity-50 hidden lg:flex">
                <span className="text-black font-normal">AI Try-On</span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="text-gray-500">Looks</span>
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
