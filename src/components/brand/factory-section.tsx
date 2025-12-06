export function FactorySection() {
    return (
        <section className="relative w-full py-32 overflow-hidden">
            {/* Background Image (Fixed for Parallax) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('/images/brand/story_factory.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Box */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-8 md:p-12 text-center border border-white/10">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-6 leading-snug">
                        우리에겐<br />
                        화려한 쇼룸이 없습니다.
                    </h2>
                    <p className="text-gray-100 leading-relaxed font-sans text-lg">
                        경기도 광주의 투박한 공장, 톱밥 날리는 이곳이<br className="hidden md:block" />
                        우리의 유일한 전시장입니다.<br /><br />
                        화려한 조명 대신 정직한 땀방울이,<br className="hidden md:block" />
                        값비싼 인테리어 대신 30년 묵은 기계 소리가<br className="hidden md:block" />
                        공간을 채우고 있습니다.<br /><br />
                        보여주기 위한 공간이 아닌,<br className="hidden md:block" />
                        제대로 만들기 위한 공간이기 때문입니다.
                    </p>
                </div>
            </div>
        </section>
    )
}
