const ButtonPreview = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-8 max-w-xl w-full mx-auto space-y-8 text-center my-8">
                <h2 className="text-2xl font-bold mb-2">Final Design: Clean Silver Prism</h2>
                <p className="text-gray-500 mb-8">No Icon • No Border • Full Coverage</p>

                <div className="flex justify-center items-center py-12">

                    {/* Final Clean Silver Prism Button */}
                    <button className="relative px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95
                    bg-gradient-to-r from-[#E2E2E2] via-[#E2E2E2] to-[#E2E2E2]
                    text-black shadow-lg overflow-hidden group">

                        {/* Full Prism Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF0080]/30 to-[#7928CA]/30 opacity-70 group-hover:opacity-100 transition-opacity"></div>

                        {/* Shining Glint */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                        <span className="relative z-10 flex items-center gap-2 tracking-wide">
                            AI Try-On
                        </span>
                    </button>

                </div>

                <p className="text-sm text-gray-400 mt-8">Click background to close</p>
            </div>
        </div>
    )
}

export default ButtonPreview;
