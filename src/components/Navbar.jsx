import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__logo">🚗</span>
          <span>DriveMatch</span>
        </NavLink>
        <nav className="navbar__nav" aria-label="Primary navigation">
          <NavLink to="/browse" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Browse Cars
          </NavLink>
          <NavLink to="/deals" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Deals
          </NavLink>
          <NavLink to="/survey" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Survey
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
