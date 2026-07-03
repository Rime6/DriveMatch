import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__group footer__group--left">
          <p className="footer__brand">🚗 DriveMatch</p>
          <p className="footer__text">123 Motor Lane, Ottawa, ON</p>
        </div>
        <div className="footer__group footer__group--right">
          <p className="footer__text">+1 (613) 123-5678</p>
          <p className="footer__text footer__note">Designed by Rime Nasser Eddine</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
