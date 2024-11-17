
import './footer.css'
export default function Footer() {
  return <div className="footer">
    <div className="footer-content">
      <div className="footer-content-links">
        <div >Home</div>
        <div >About</div>
        <div >Services</div>
        <div >Contact</div>
      </div>

      <div className="footer-content-social">
        <div href="#"><img src="/images/facebook.png" alt="facebook" /></div>
        <div href="#"><img src="/images/twitter.png" alt="twitter" /></div>
        <div href="#"><img src="/images/instagram.png" alt="instagram" /></div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2024 All rights reserved</p>
    </div>
  </div>;
}
