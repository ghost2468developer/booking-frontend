import "./globals.css"

export const metadata = {
  title: "Mechanic Booking System",
  description: "Booking system for mechanics"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}