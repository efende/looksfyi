import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';

import ChangePasswordModal from '../components/ChangePasswordModal';
import AvatarCropModal from '../components/AvatarCropModal';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [username, setUsername] = useState('kingdom69');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAvatarCropModalOpen, setIsAvatarCropModalOpen] = useState(false);
    const tabs = ['Profile', 'Credit History', 'Billing History'];

    return (
        <div className="min-h-screen bg-white">
            <Navbar onSearch={() => { }} />

            <main className="w-full">
                <ProfileHeader
                    onUpload={activeTab === 'Profile' ? () => setIsAvatarCropModalOpen(true) : undefined}
                    username={username}
                />
                <TabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabs}
                />

                <div className="max-w-7xl mx-auto px-6 pb-8">
                    {activeTab === 'Profile' && (
                        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Name</label>
                                <input
                                    type="text"
                                    defaultValue="Kingdom Chen"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Email</label>
                                <div className="text-gray-500 font-normal px-1">kingdomchen@gmail.com</div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-900">Password</label>
                                    <button
                                        onClick={() => setIsPasswordModalOpen(true)}
                                        className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline decoration-gray-300 hover:decoration-black underline-offset-4"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                                />
                                <div className="text-xs text-gray-400 px-1">www.looksfyi.com/{username}</div>
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Website</label>
                                <input
                                    type="url"
                                    placeholder="https://"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
                                />
                                <div className="text-xs text-gray-400 px-1">Share your site</div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Story about you or your website"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300 resize-none"
                                />
                            </div>

                            {/* Language */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Language</label>
                                <div className="relative">
                                    <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white text-gray-900 cursor-pointer">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="zh-TW">Traditional Chinese</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-4">
                                <button className="w-full bg-black text-white font-medium py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-[0.99] duration-200">
                                    Save
                                </button>
                            </div>

                            <ChangePasswordModal
                                isOpen={isPasswordModalOpen}
                                onClose={() => setIsPasswordModalOpen(false)}
                            />

                            <AvatarCropModal
                                isOpen={isAvatarCropModalOpen}
                                onClose={() => setIsAvatarCropModalOpen(false)}
                            />

                        </div>
                    )}
                    {activeTab === 'Credit History' && (
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                            {/* Summary Box */}
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.45-3.32-3.2h2.13c.12.82.74 1.48 1.47 1.48.92 0 1.54-.73 1.54-1.7s-.79-1.57-2.32-2.12c-2.1-.73-3.15-2.07-3.15-3.79 0-1.87 1.47-3.13 3.32-3.53V3h2.67v1.89c1.4.32 2.57 1.34 2.87 2.76h-2.16c-.19-.71-.78-1.29-1.43-1.29-.86 0-1.41.6-1.41 1.48 0 .97.8 1.47 2.45 2.06 2.03.73 3 2.09 3 3.86 0 1.93-1.57 3.25-3.39 3.53z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">5</span>
                                </div>
                                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                                    </svg>
                                    Upgrade
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-gray-200">
                                        <tr>
                                            <th className="py-4 font-medium text-gray-500 w-1/4">Date</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/4">Event</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/6">Detail</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/4">Expiry Date</th>
                                            <th className="py-4 font-medium text-gray-500 text-right">Credit Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { date: '2025-11-25 21:16:46 UTC+8', event: 'AI Try-On', detail: '-10', expiry: '-', balance: 5 },
                                            { date: '2025-11-25 21:10:23 UTC+8', event: 'New Member', detail: '+25', expiry: '2025-12-25 21:10:23 UTC+8', balance: 25 },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 text-gray-900">{row.date}</td>
                                                <td className="py-4 text-gray-900 font-medium">{row.event}</td>
                                                <td className={`py-4 font-medium ${row.detail.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {row.detail}
                                                </td>
                                                <td className="py-4 text-gray-500">{row.expiry}</td>
                                                <td className="py-4 text-gray-900 text-right font-medium">{row.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Billing History' && (
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-gray-200">
                                        <tr>
                                            <th className="py-4 font-medium text-gray-500 w-1/4">Date</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/3">Event</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/6">Amount</th>
                                            <th className="py-4 font-medium text-gray-500 w-1/6">Status</th>
                                            <th className="py-4 font-medium text-gray-500 text-right">Transaction Number</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { date: '2025-11-25 21:16:46 UTC+8', event: 'Plus Plan Subscription', amount: '20', status: 'Paid', transaction: '1493721894' },
                                        ].map((row, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 text-gray-900">{row.date}</td>
                                                <td className="py-4 text-gray-900 font-medium">{row.event}</td>
                                                <td className="py-4 text-gray-900">${row.amount}</td>
                                                <td className="py-4">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-gray-500 text-right font-mono text-xs">{row.transaction}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
