import { useState } from 'react';
import Navbar from '../components/Navbar';
import MasonryGrid from '../components/MasonryGrid';
import { LOOKS_DATA } from '../data/mockData';

const GlobalLooksPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const getLooks = () => {
        if (!searchQuery) return LOOKS_DATA;
        const q = searchQuery.toLowerCase();
        return LOOKS_DATA.filter((look) => {
            const title = look.title || '';
            return title.toLowerCase().includes(q);
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar
                onSearch={setSearchQuery}
                placeholder="Search"
            />
            <main className="w-full pt-20"> {/* Add padding top for fixed navbar */}
                <MasonryGrid
                    products={getLooks()}
                    variant="look"
                />
            </main>
        </div>
    );
};

export default GlobalLooksPage;
