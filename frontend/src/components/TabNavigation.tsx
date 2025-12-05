

export type Tab = 'Models' | 'Items' | 'Looks';

interface TabNavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
    const tabs: Tab[] = ['Models', 'Items', 'Looks'];

    return (
        <div className="sticky top-[64px] z-40 bg-white/70 backdrop-blur-md border-b border-gray-100/50 flex items-center justify-center gap-12 py-4 mb-8 transition-all duration-300 w-full">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`
            relative py-2 text-sm font-normal transition-colors duration-200
            ${activeTab === tab
                            ? 'text-black'
                            : 'text-gray-500 hover:text-black'}
          `}
                >
                    {tab}
                    {/* Active Underline */}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
