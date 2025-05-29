import Image from "next/image"

export default function Journey() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-lg md:text-xl mb-4 text-green-600">A Journey That Fits You</h3>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-900">
              Be it heartache, loss, exhaustion, or just a rough day,
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">there's a path for you here.</p>
          </div>
          <div>
            <Image
              src="/images/journey-section.png"
              alt="Peaceful landscape with winding path"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
