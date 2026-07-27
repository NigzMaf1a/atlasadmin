export default function FancyLoad({
    loading,
}: {
    loading: boolean;
}) {
    if (!loading) return null;

    const BAR_COUNT = 7;

    return (
        <>
            <style>{`
                @keyframes equalizer {
                    0%, 100% {
                        transform: scaleY(0.25);
                    }
                    50% {
                        transform: scaleY(1);
                    }
                }

                .equalizer-bar {
                    animation: equalizer 0.65s ease-in-out infinite;
                    transform-origin: bottom;
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="min-w-[220px] rounded-xl bg-white px-6 py-8 shadow-xl flex flex-col items-center">

                    <div className="flex items-end justify-center h-14 mb-4">
                        {Array.from({ length: BAR_COUNT }).map((_, index) => (
                            <div
                                key={index}
                                className="equalizer-bar w-[7px] h-11 mx-[3px] rounded-full bg-blue-600"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            />
                        ))}
                    </div>

                    <p className="text-gray-500 text-base">
                        Loading...
                    </p>
                </div>
            </div>
        </>
    );
}