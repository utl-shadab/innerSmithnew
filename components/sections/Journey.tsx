import Image from "next/image";

export default function Journey() {
  return (
    <section className="h-screen relative overflow-hidden bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Text Content - Left Half */}
        <div className="w-1/2 flex items-center justify-center px-8 xl:px-16">
          <div className="max-w-lg space-y-6">
            <h3 className="text-lg xl:text-xl font-medium text-green-600 uppercase tracking-wide">
              A JOURNEY THAT FITS YOU
            </h3>
            <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-light leading-tight text-gray-900">
              Be it heartache, loss, exhaustion, or just a rough day,
            </h2>
            <p className="text-xl xl:text-2xl text-gray-600 font-light">
              there's a path for you here.
            </p>
          </div>
        </div>

        {/* Image - Right Half, No Gaps */}
        <div className="w-1/2 relative">
          <Image
            src="/images/rightImage2.png"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Text Content - Top */}
        <div className="flex-1 flex items-center px-6 md:px-8 py-8">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-base md:text-lg font-medium text-green-600 uppercase tracking-wide">
              A JOURNEY THAT FITS YOU
            </h3>
            <h2 className="text-2xl md:text-3xl font-light leading-tight text-gray-900">
              Be it heartache, loss, exhaustion, or just a rough day,
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-light">
              there's a path for you here.
            </p>
          </div>
        </div>

        {/* Image - Bottom, Full Width No Gaps */}
        <div className="flex-1 relative -mx-0">
          <Image
            src="/images/rightImage2.png"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
