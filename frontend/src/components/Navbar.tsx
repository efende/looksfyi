
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
    const isLooks = location.pathname === '/';

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
                    to="/"
                    className={`font-normal pointer-events-auto transition-colors ${isLooks ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Looks
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">


                <div className="flex items-center gap-4">
                    <Link to="/pricing" className="text-sm font-normal uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
                        Upgrade
                    </Link>
                    <CreditDisplay />
                    <div className="flex items-center gap-1 cursor-pointer">
                        {useLocation().pathname === '/' ? <div className="mr-[26px]"><LoginButton /></div> : <UserDropdown />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const CreditDisplay = () => {
    const credits = 15;
    return (
        <Link to="/profile" className="flex items-center gap-2 text-sm font-normal text-black px-2 hover:opacity-70 transition-opacity">
            <span className="text-base">✦</span>
            <span>{credits}</span>
        </Link>
    );
};

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Mock User Data
    const user = {
        name: "Kingdom Chen",
        email: "kingdomchen@gmail.com",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
    };

    return (
        <div className="relative flex items-center gap-1" ref={dropdownRef}>
            {/* Avatar - Links to Studio Page */}
            <Link to="/studio" className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:opacity-80 transition-opacity">
                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            </Link>

            {/* Chevron - Toggles Dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${isOpen ? 'bg-gray-100' : ''}`}
            >
                <ChevronDown size={14} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 border-b border-gray-50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>

                    <div className="p-2">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                        >
                            View Profile
                        </Link>
                        <button
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
