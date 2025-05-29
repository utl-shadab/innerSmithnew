import Image from "next/image"

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-lg md:text-xl mb-4 text-blue-500">Inside The App</h3>
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-gray-900">Wellness, simplified.</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Holistic and personalized tools designed to help you feel better, anytime, anywhere.
            </p>

            {/* Pagination dots */}
            <div className="flex mt-8 space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/app-section.png"
              alt="Mobile app interface"
              width={400}
              height={600}
              className="w-auto h-auto max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
