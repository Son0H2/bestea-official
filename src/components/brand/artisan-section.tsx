import Image from "next/image"

export function ArtisanSection() {
    return (
        <section className="w-full bg-[#1a1a1a] text-white">
            <div className="flex flex-col md:flex-row h-auto md:h-screen">
                {/* Image Side */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
                    <div className="absolute inset-0 bg-gray-800">
                        {/* Placeholder for story_artisan.jpg */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/brand/story_artisan.jpg')" }}
                        />
                    </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20">
                    <div className="max-w-lg">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-white">
                            기계는 흉내 낼 수 없는<br />
                            온도
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-lg">
                            <p>
                                40년 경력 장인의 거친 손끝에서 완성되는 금장 장식은
                                단순한 가구가 아닌 하나의 작품이 됩니다.
                            </p>
                            <p>
                                0.1mm의 오차도 허용하지 않는 예리한 눈썰미와
                                수천 번의 붓질로 완성되는 깊이 있는 색감.
                            </p>
                            <p>
                                빠르게 찍어내는 공산품에서는 느낄 수 없는,
                                사람의 온기가 담긴 가구를 만듭니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
