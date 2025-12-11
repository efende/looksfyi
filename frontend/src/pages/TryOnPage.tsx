import { useState } from 'react';
import Navbar from '../components/Navbar';
import TryOnWorkspace from '../components/TryOnWorkspace';
import TabNavigation from '../components/TabNavigation';
import type { Tab } from '../components/TabNavigation';
import MasonryGrid from '../components/MasonryGrid';
import { MODELS_DATA, ITEMS_DATA, LOOKS_DATA } from '../data/mockData';
import type { Product } from '../data/mockData';
import { Plus } from 'lucide-react';
import CreateItemModal from '../components/CreateItemModal';

const TryOnPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Items');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Mock Data State (managed locally per page for simplicity as data is static/mock)
    const [items, setItems] = useState<Product[]>(ITEMS_DATA);
    const [models, setModels] = useState<Product[]>(MODELS_DATA);
    const [looks, setLooks] = useState<Product[]>(LOOKS_DATA);

    const [searchQuery, setSearchQuery] = useState('');

    // Try-On Workspace State
    const [workspaceModel, setWorkspaceModel] = useState<Product | null>(null);
    const [workspaceItems, setWorkspaceItems] = useState<Product[]>([]);
    const [prompt, setPrompt] = useState('');

    const getProductsForTab = (tab: Tab) => {
        let data: any[] = [];
        switch (tab) {
            case 'Models': data = models; break;
            case 'Items': data = items; break;
            case 'Looks': data = looks; break;
            default: data = models;
        }

        if (!searchQuery) return data;

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

    const handleAddToWorkspace = (product: Product, isModel: boolean) => {
        if (isModel) {
            setWorkspaceModel(product);
        } else {
            // Check if it's a Look with related products
            if (product.relatedProducts && product.relatedProducts.length > 0) {
                setWorkspaceItems((prev) => {
                    const availableSlots = 8 - prev.length;
                    if (availableSlots <= 0) return prev;

                    // Take only as many related items as fit
                    const itemsToAdd = product.relatedProducts!.slice(0, availableSlots);
                    return [...prev, ...itemsToAdd];
                });
            } else {
                // Regular Item
                setWorkspaceItems((prev) => {
                    if (prev.length >= 8) return prev;
                    return [...prev, product];
                });
            }
        }
    };

    const handleRemoveItem = (index: number) => {
        setWorkspaceItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleGenerate = () => {
        setActiveTab('Looks');

        const placeholder: Product = {
            id: `gen-${Date.now()}`,
            name: 'Generating...',
            brand: 'System',
            brandAvatar: '',
            price: '',
            image: '', // Not used by custom renderer
            details: '',
            isGenerating: true,
        };

        setLooks((prev) => [placeholder, ...prev]);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar activeTab={activeTab} onSearch={setSearchQuery} />

            <main className="w-full relative">
                <TryOnWorkspace
                    model={workspaceModel}
                    items={workspaceItems}
                    prompt={prompt}
                    onSetPrompt={setPrompt}
                    onRemoveItem={handleRemoveItem}
                    onRemoveModel={() => setWorkspaceModel(null)}
                    onAddProduct={handleAddToWorkspace}
                    onGenerate={handleGenerate}
                />

                <div className="bg-white">
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                    <MasonryGrid
                        products={getProductsForTab(activeTab)}
                        variant={activeTab === 'Models' ? 'model' : activeTab === 'Looks' ? 'look' : 'item'}
                        onAddToWorkspace={handleAddToWorkspace}
                    />
                </div>
            </main>

            {(activeTab === 'Items' || activeTab === 'Models') && (
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-40 group"
                >
                    <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            )}

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

export default TryOnPage;
