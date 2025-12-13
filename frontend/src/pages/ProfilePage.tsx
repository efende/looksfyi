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
                        <div className="text-center py-20 text-gray-500">
                            Credit History Content Needs Implementation
                        </div>
                    )}
                    {activeTab === 'Billing History' && (
                        <div className="text-center py-20 text-gray-500">
                            Billing History Content Needs Implementation
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
