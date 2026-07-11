import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-mark" aria-hidden="true" />
          <div>
            <p className="footer__title">Basera</p>
            <p className="footer__tag">A single ledger for every room, tenant and rupee.</p>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <p className="footer__heading">Product</p>
            <Link to="/">Find a room</Link>
            <Link to="/register">List a property</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <p className="footer__heading">Company</p>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <p className="footer__heading">Account</p>
            <Link to="/login">Log in</Link>
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Basera Rental Management System. Built as an academic project.</p>
      </div>
    </footer>
  )
}
