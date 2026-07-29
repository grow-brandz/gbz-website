import { Link } from "react-router-dom";
import Divider from "./divider";

function Footer() {
  return (
    <div className="footerCover">
      <div className="preFooter">
        <img className="decoration" src="https://ik.imagekit.io/growbrandz/preFooterIcon.svg" alt="Growbrandz Say Hi" />
        <h5>You made it this far. Might as well </h5>
        <Link to="/contact" className="CTAcover"><h5 className="bigCTA" data-text="Say Hi">Say Hi</h5></Link>
        <p>Let’s fix the bottlenecks holding back your growth.</p>
        <Link to="/contact" className="button2">Contact Us</Link>
      </div>
      <Divider
        bgColor="#6842EF"
        fillColor="#FFF2EC"
        boxStroke="#000000"
        gridStroke="#000000"
      />

      <div className="container footerSiteMap">
        <div className="leftColumn">
          <div className="explore">
            <span>EXPLORE</span>
            <div className="linkCover">
              <Link to="/about">About</Link>
              <Link to="/our-process">Our Process</Link>
              <Link to="/services">Services</Link>
              <Link to="/our-approach">Our Approach</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="socials">
            <span>STALK US</span>
            <div className="linkCover">
              <a href="https://www.linkedin.com/company/growbrandz/" target="_blank">LinkedIn</a>
              <a href="https://www.instagram.com/grow_brandz/" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
        <div className="rightColumn">
          <div className="explore">
            <span>SAY HELLO</span>
            <a href="mailto:hello@growbrandz.com" target="_blank">hello@growbrandz.com</a>
          </div>
          <div className="socials">
            <span>EXCEPTIONAL TALENT</span>
            <a href="mailto:apply@growbrandz.com" target="_blank">apply@growbrandz.com</a>
          </div>
          <div className="socials">
            <span>CALL US</span>
            <a href="tel:8012005000" target="_blank">+91 8012005000</a>
          </div>
        </div>
      </div>
      <Divider bgColor="#FFD703" fillColor="#6842EF" />
      <footer className="container">
        <img className="footerLogo" src="https://ik.imagekit.io/growbrandz/footerLogo.svg" alt="Growbrandz Logo" />
        <img className="decoration decoration1" src="https://ik.imagekit.io/growbrandz/footericon1.svg" alt="Growbrandz" />
        <img className="decoration decoration2" src="https://ik.imagekit.io/growbrandz/footericon2.svg" alt="Growbrandz" />
        <img className="decoration decoration3" src="https://ik.imagekit.io/growbrandz/footericon3.svg" alt="Growbrandz" />
        <div className="copyrights">
          <p>© All rights are reserved, Growbrandz</p>
          {/* <a href="http://onceadev.com/?ref=growbrandz" target="_blank">Onceadev made an another one</a> */}
        </div>

      </footer>
    </div>
  );
}

export default Footer;
