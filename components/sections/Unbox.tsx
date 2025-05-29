import Image from "next/image"

export default function Unbox() {
  return (
    <section className="w-full bg-white py-10 px-0 h-screen">
      <video src="https://thescaleagency.s3.amazonaws.com/innersmith_desktop.mp4" autoPlay loop muted className="w-full h-full"></video>
    </section>
  )
}
