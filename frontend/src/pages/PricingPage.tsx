
import { useState } from 'react';
import Navbar from '../components/Navbar';

const PLANS = [
    {
        id: 0,
        name: 'TryOn',
        price: '$0',
        tagline: 'Just a taste. 體驗試穿樂趣',
        credits: '10 Credits (≈ 2 Looks)',
        features: [
            'Collect items for AI Try-on',
            'Watermarked Looks',
            'Standard Visibility on Looks Wall',
            'Standard Generation'
        ],
        video: "https://cdn.coverr.co/videos/coverr-fashion-model-posing-2696/1080p.mp4",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 1,
        name: 'Lookbook',
        price: '$10',
        period: '/ mo',
        tagline: 'Curate your daily style. 策展你的日常風格',
        credits: '400 Credits/mo (≈ 80 Looks)',
        features: [
            'Collect items for AI Try-on',
            'Watermark-free HD Looks',
            'Enhanced Visibility on Looks Wall',
            'Fast Generation',
            'Full Commercial Use',
            'Early access to new features'
        ],
        video: "https://cdn.coverr.co/videos/coverr-walking-in-boots-4636/1080p.mp4",
        image: "https://images.unsplash.com/photo-1509631168930-b1c41d62c76e?q=80&w=1978&auto=format&fit=crop"
    },
    {
        id: 2,
        name: 'Runway',
        price: '$60',
        period: '/ mo',
        tagline: 'Own the spotlight. 擁抱聚光燈',
        credits: '4000 Credits/mo (≈ 800 Looks)',
        features: [
            'Collect items for AI Try-on',
            'Watermark-free HD Looks',
            'Prime Visibility on Looks Wall',
            'Fast Generation',
            'Full Commercial Use',
            'Early access to new features'
        ],
        video: "https://cdn.coverr.co/videos/coverr-creating-a-dress-8566/1080p.mp4", // Or https://cdn.coverr.co/videos/coverr-fashion-photoshoot-5867/1080p.mp4
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop"
    }
];

const PricingPage = () => {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

    // Default Media (When not hovering any plan)
    const DEFAULT_MEDIA = {
        type: 'image',
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
        title: "Premiere",
        subtitle: "PRICING 2024"
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
            <Navbar onSearch={() => { }} searchPlaceholder="Search..." />

            <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-6 max-w-[1600px] w-full h-[650px]"> {/* Increased height slightly to fit all features */}

                    {/* --- LEFT: Dynamic Media Column --- */}
                    <div className="hidden lg:block w-[400px] relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 bg-black shrink-0">
                        {/* Default Image Layer */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${hoveredPlan === null ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={DEFAULT_MEDIA.src} className="w-full h-full object-cover grayscale" />
                            <div className="absolute bottom-12 left-8 text-white mix-blend-difference z-10">
                                <h2 className="font-serif italic text-5xl mb-2">{DEFAULT_MEDIA.title}</h2>
                                <p className="text-xs font-bold tracking-[0.3em] uppercase">{DEFAULT_MEDIA.subtitle}</p>
                            </div>
                        </div>

                        {/* Video Layers */}
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`absolute inset-0 transition-opacity duration-700 bg-black ${hoveredPlan === plan.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <video
                                    src={plan.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-12 left-8 text-white z-20 translate-y-0 transition-transform duration-700">
                                    <h2 className="font-serif italic text-4xl mb-2">{plan.name}</h2>
                                    <p className="text-[10px] font-bold tracking-widest uppercase">View Details</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- RIGHT: Pricing Plans --- */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                className={`
                                    bg-white p-10 flex flex-col h-full relative transition-all duration-500 cursor-default rounded-2xl overflow-hidden
                                    ${hoveredPlan === plan.id ? 'shadow-2xl translate-y-[-8px] ring-1 ring-black' : 'shadow-sm hover:shadow-md'}
                                    ${hoveredPlan !== null && hoveredPlan !== plan.id ? 'opacity-50 blur-[1px]' : 'opacity-100'}
                                `}
                            >
                                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-8">{plan.name}</h3>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <div className="text-7xl font-light tracking-tight text-black">{plan.price}</div>
                                        {plan.period && <div className="text-sm text-gray-400 font-medium">{plan.period}</div>}
                                    </div>
                                    <p className="font-serif italic text-gray-500 text-sm">{plan.tagline}</p>
                                </div>

                                {/* Divider */}
                                <div className={`w-8 h-[2px] bg-black mb-8 transition-all duration-500 ${hoveredPlan === plan.id ? 'w-full' : ''}`}></div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-[2px] h-4 bg-black"></div>
                                        <span className="font-bold text-sm text-black">{plan.credits}</span>
                                    </div>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-10 flex-1">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="text-xs text-gray-500 font-medium">{f}</li>
                                        ))}
                                    </ul>

                                    <button className={`
                                        w-full py-4 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 mt-auto relative
                                        ${hoveredPlan === plan.id
                                            ? 'bg-black text-white rounded-full'
                                            : 'bg-transparent text-black rounded-none after:content-[""] after:absolute after:bottom-0 after:left-6 after:right-6 after:h-[2px] after:bg-black'
                                        }
                                    `}>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PricingPage;
