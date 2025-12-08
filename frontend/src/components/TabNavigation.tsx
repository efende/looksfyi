

import { TabButton } from './ui/TabButton';

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
                <TabButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </TabButton>
            ))}
        </div>
    );
};

export default TabNavigation;
