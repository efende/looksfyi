import { useState } from 'react';

type Tab = 'Models' | 'Items' | 'Looks';

const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Models');

    const tabs: Tab[] = ['Models', 'Items', 'Looks'];

    return (
        <div className="flex items-center justify-center gap-8 mb-12">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
            px-6 py-2 rounded-lg text-sm transition-all duration-300
            ${activeTab === tab
                            ? 'border border-black text-black font-medium'
                            : 'text-gray-400 hover:text-gray-600 border border-transparent'}
          `}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
