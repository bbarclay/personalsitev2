import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center">
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}