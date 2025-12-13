
import { TabButton } from './ui/TabButton';

export type Tab = 'Models' | 'Items' | 'Looks'; // Keep for legacy support if needed, or better, make it generic string

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: any) => void;
    tabs?: string[];
}

const TabNavigation = ({
    activeTab,
    onTabChange,
    tabs = ['Models', 'Items', 'Looks']
}: TabNavigationProps) => {
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
