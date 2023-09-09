import { NavLink } from "react-router-dom"

export default function AppHeader() {
  return (
    <header className="app-header">
        <section className="container">
            <h1>misterEmail</h1>
            <nav className="header-nav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/mail">Email</NavLink>
            </nav>
        </section>
    </header>
  )
}
