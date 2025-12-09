export interface Product {
    id: string;
    image: string;
    brand: string;
    name: string;
    price: string;
    details: string;
}

const MODEL_IMAGES = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
];

const ITEM_IMAGES = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
];

const LOOK_IMAGES = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230946086-21e76a005902?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=800&auto=format&fit=crop',
];

// Helper to generate random product data
const BRANDS = ['Gucci', 'Prada', 'Zara', 'H&M', 'Uniqlo', 'Nike', 'Adidas', 'Chanel', 'Dior', 'Fendi'];
const NAMES = ['Silk Blouse', 'Cotton Tee', 'Denim Jacket', 'Wool Coat', 'Leather Bag', 'Summer Dress', 'Casual Pants', 'Sneakers', 'Evening Gown', 'Scarf'];
const DETAILS = [
    "Crafted from premium materials for a luxurious feel. Perfect for any occasion.",
    "A timeless design that blends classic elegance with modern chic. Essential for your wardrobe.",
    "Features intricate stitching and a comfortable fit. Designed to last season after season.",
    "Lightweight and breathable fabric, ideal for summer days. Effortlessly stylish.",
    "Bold and statement-making piece. Guaranteed to turn heads wherever you go."
];
const MODEL_NAMES = [
    "Bella Hadid", "Kendall Jenner", "Gigi Hadid", "Adut Akech", "Sora Choi",
    "Anok Yai", "Kaia Gerber", "Liu Wen", "Vittoria Ceretti", "Paloma Elsesser"
];

const createProducts = (images: string[], prefix: string, type: 'product' | 'model' = 'product'): Product[] => {
    // Generate 50 items by cycling through images and random text
    const result: Product[] = [];
    const nameSource = type === 'model' ? MODEL_NAMES : NAMES;

    for (let i = 0; i < 50; i++) {
        result.push({
            id: `${prefix}-${i}`,
            image: images[i % images.length],
            brand: BRANDS[Math.floor(Math.random() * BRANDS.length)],
            name: nameSource[Math.floor(Math.random() * nameSource.length)],
            price: `$${Math.floor(Math.random() * 200) + 20}`,
            details: DETAILS[Math.floor(Math.random() * DETAILS.length)],
        });
    }
    return result;
};

export const MODELS_DATA = createProducts(MODEL_IMAGES, 'model', 'model');
export const ITEMS_DATA = createProducts(ITEM_IMAGES, 'item', 'product');
export const LOOKS_DATA = createProducts(LOOK_IMAGES, 'look', 'model');
