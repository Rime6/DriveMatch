import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <p className="footer__brand">🚗 DriveMatch</p>
          <p>123 Motor Lane, Ottawa, ON</p>
          <p>+1 (613) 555-0199</p>
        </div>
        <div className="footer__links">
          <Link to="/browse">Browse</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/survey">Survey</Link>
        </div>
      </div>
      <p className="footer__note">Designed by [Your Name]</p>
    </footer>
  );
}

export default Footer;
