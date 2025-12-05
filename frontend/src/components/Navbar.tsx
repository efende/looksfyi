import { Coins, Crown, ChevronDown } from 'lucide-react';

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

                <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors">
                    <Crown size={14} />
                    <span>Upgrade</span>
                </button>

                <div className="flex items-center gap-1 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                        {/* Placeholder generic avatar if no image provided yet, but user specifically asked for 'Kingdom Chen's avatar. 
                We'll use a placeholder for now that looks premium. */}
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
