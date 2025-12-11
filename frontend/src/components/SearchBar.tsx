import { Search, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface SearchBarProps {
    activeTab: string;
    onSearch: (query: string) => void;
}

const SearchBar = ({ activeTab, onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const getPlaceholder = () => {
        switch (activeTab) {
            case 'Models': return "Search your Models";
            case 'Items': return "Search your Items";
            case 'Looks': return "Search your Looks";
            default: return "Search";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
        inputRef.current?.focus();
    };

    return (
        <div
            className={`
                relative flex items-center bg-gray-100 rounded-full transition-all duration-300 ease-out h-8
                ${isFocused || query ? 'w-[320px]' : 'w-[220px] hover:bg-gray-200'}
            `}
        >
            <Search
                className={`ml-3 flex-shrink-0 transition-colors ${isFocused ? 'text-black' : 'text-gray-400'}`}
                size={14}
            />
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={getPlaceholder()}
                className="w-full h-full bg-transparent border-none outline-none text-sm px-3 text-gray-900 placeholder:text-gray-500 font-medium"
            />
            {query && (
                <button
                    onClick={clearSearch}
                    className="mr-2 p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-black transition-colors"
                >
                    <X size={12} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
