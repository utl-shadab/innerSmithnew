import Image from "next/image"
import "./MobileSlider.css"
export default function Journey() {
  return (
    <section className="h-screen relative overflow-hidden bg-white"
      id="journey"
      style={{ scrollSnapAlign: 'start' }}>
      <div className="hidden lg:flex h-full">
        <div className="w-3/5 flex items-center justify-center px-8 xl:px-16">
          <div className="max-w-5xl space-y-6">
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
        
        <div className="w-2/5 relative">
          <Image
            src="/images/rightImage2.svg"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      <div className="lg:hidden h-full flex flex-col">
        <div className="flex-1 flex items-center px-6 md:px-8 py-8">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-base md:text-lg title font-medium text-green-600 uppercase tracking-wide">
              A JOURNEY THAT FITS YOU
            </h3>
            <h2 className="text-2xl md:text-3xl font-light para leading-tight text-gray-900">
              Be it heartache, loss, exhaustion, or just a rough day,
            </h2>
            <p className="text-2xl md:text-3xl font-light para leading-tight">
              there's a path for you here.
            </p>
          </div>
        </div>
        
        <div className="flex-1 relative -mx-0">
          <Image
            src="/images/rightImagePhone.png"
            alt="Peaceful landscape with winding path through rolling hills"
            fill
            className="object-cover w-full h-full smallFit"
           style={{ bottom: 0, objectFit: "cover", }}
            priority
          />
        </div>
      </div>
    </section>
  )
}