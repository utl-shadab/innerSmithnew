import type React from "react"
import type { Metadata } from "next"
import { Inter, Albert_Sans } from "next/font/google"
import "./globals.css"
import MusicComp from "../components/ui/music"

const inter = Inter({ subsets: ["latin"] })
const albertSans = Albert_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InnerSmith - Find Your Center",
  description: "A meditative journey through mindful breathing, inner peace, and natural harmony.",
  keywords: "meditation, mindfulness, breathing, inner peace, wellness",
  icons: {
    icon: '/favicon.ico',
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${albertSans.className} antialiased`}>
      <MusicComp src="/musicbg.mp3" autoPlay={false} />
        {children}</body>
    </html >
  )
}