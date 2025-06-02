import Image from "next/image"

export default function Unbox() {
  return (
    <section className="relative w-full h-screen overflow-hidden"
      id="unbox"
      style={{ scrollSnapAlign: 'start' }}>
      <video 
        src="https://thescaleagency.s3.amazonaws.com/innersmith_desktop.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden lg:block"
      />
      <div className="absolute top-0 left-0 w-full h-full  items-center justify-center bg-black block lg:hidden">
        <video 
          src="https://thescaleagency.s3.amazonaws.com/innersmith_mobile.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-auto max-h-full object-contain"
        />
      </div>
    </section>  
  )
}