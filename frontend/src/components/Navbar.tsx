import { Coins, Crown } from 'lucide-react';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
    activeTab?: string;
    onSearch: (query: string) => void;
    searchPlaceholder?: string;
}

const Navbar = ({ activeTab, onSearch, searchPlaceholder }: NavbarProps) => {
    const location = useLocation();
    const isTryOn = location.pathname === '/try-on';
    const isLooks = location.pathname === '/looks';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 flex items-center justify-center cursor-pointer text-black transition-opacity hover:opacity-70">
                        <span className="font-serif font-bold text-2xl tracking-tighter leading-none pb-0.5">K</span>
                    </div>
                </Link>

                {/* Search Bar */}
                <SearchBar activeTab={activeTab || ''} onSearch={onSearch} placeholder={searchPlaceholder} />
            </div>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-sm gap-4 pointer-events-none hidden lg:flex">
                <Link
                    to="/try-on"
                    className={`font-normal pointer-events-auto transition-colors ${isTryOn ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    AI Try-On
                </Link>
                <span className="w-px h-4 bg-gray-300"></span>
                <Link
                    to="/looks"
                    className={`font-normal pointer-events-auto transition-colors ${isLooks ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Looks
                </Link>
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
