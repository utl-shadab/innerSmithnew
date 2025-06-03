
export default function Unbox() {
  return (
    <section className="relative w-full h-screen overflow-hidden"
      id="unbox"
      style={{ scrollSnapAlign: 'start' }}>
      <video 
        src="/videos/unbox.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden lg:block"
      />
      <div className="absolute top-0 left-0 w-full h-full  items-center justify-center bg-black block lg:hidden">
        <video 
          src="/videos/unbox.mp4"  
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>  
  )
}