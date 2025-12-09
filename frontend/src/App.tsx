import { useState } from 'react';
import Navbar from './components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import TabNavigation from './components/TabNavigation';
import type { Tab } from './components/TabNavigation';
import MasonryGrid from './components/MasonryGrid';
import { MODELS_DATA, ITEMS_DATA, LOOKS_DATA } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Items');

  const getProductsForTab = (tab: Tab) => {
    switch (tab) {
      case 'Models':
        return MODELS_DATA;
      case 'Items':
        return ITEMS_DATA;
      case 'Looks':
        return LOOKS_DATA;
      default:
        return MODELS_DATA;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        <ProfileHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <MasonryGrid
          products={getProductsForTab(activeTab)}
          variant={activeTab === 'Models' ? 'model' : 'item'}
        />
      </main>
    </div>
  );
}

export default App;
