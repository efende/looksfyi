import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';
import type { Tab } from '../components/TabNavigation';
import MasonryGrid from '../components/MasonryGrid';
import { MODELS_DATA, ITEMS_DATA, LOOKS_DATA } from '../data/mockData';
import { Plus } from 'lucide-react';
import CreateItemModal from '../components/CreateItemModal';
import type { Product } from '../data/mockData';

const StudioPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Items');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [items, setItems] = useState<Product[]>(ITEMS_DATA);
    const [models, setModels] = useState<Product[]>(MODELS_DATA);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    const getProductsForTab = (tab: Tab) => {
        let data: any[] = [];
        switch (tab) {
            case 'Models':
                data = models;
                break;
            case 'Items':
                data = items;
                break;
            case 'Looks':
                data = LOOKS_DATA;
                break;
            default:
                data = models;
        }

        if (!searchQuery) return data;

        // Generic Safety Filter
        const q = searchQuery.toLowerCase();
        return data.filter((item) => {
            const name = item.name || item.title || '';
            const brand = item.brand || '';
            return name.toLowerCase().includes(q) || brand.toLowerCase().includes(q);
        });
    };

    const handleCreate = (newItem: Product) => {
        if (activeTab === 'Models') {
            setModels((prev) => [newItem, ...prev]);
        } else {
            setItems((prev) => [newItem, ...prev]);
        }
        setIsCreateModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar activeTab={activeTab} onSearch={setSearchQuery} />

            <main className="w-full">
                <ProfileHeader />
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                <MasonryGrid
                    products={getProductsForTab(activeTab)}
                    variant={activeTab === 'Models' ? 'model' : activeTab === 'Looks' ? 'look' : 'item'}
                />
            </main>

            {/* Floating Action Button - on Items and Models tabs */}
            {(activeTab === 'Items' || activeTab === 'Models') && (
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-40 group"
                >
                    <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            )}

            {/* Create Item Modal */}
            {isCreateModalOpen && (
                <CreateItemModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreate}
                    mode={activeTab === 'Models' ? 'model' : 'item'}
                />
            )}
        </div>
    );
};

export default StudioPage;
