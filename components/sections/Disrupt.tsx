import Image from "next/image"

export default function Disrupt() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-lg md:text-xl mb-4 text-blue-500">Let's Disrupt The Spiral</h3>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-900">
              What if support showed up the moment the tension set in?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              What if something helped you feel better in minutes?
            </p>
          </div>
          <div>
            <Image
              src="/images/disrupt-section.png"
              alt="Person carrying tangled thoughts illustration"
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
