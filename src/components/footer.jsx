import { Link } from "react-router-dom";
import Divider from "./divider";
import { serviceLinks, serviceMenu } from "./header";

function FooterServiceItem({ item }) {
  if (item.to) {
    return <Link to={item.to}>{item.label}</Link>;
  }

  return (
    <span className="footerSoonItem">
      <span className="footerSoonLabel">{item.label}</span>
      <span className="soonBadge">Coming soon</span>
    </span>
  );
}

function Footer() {
  return (
    <div className="footerCover">
      <div className="preFooter">
        <img className="decoration" src="https://ik.imagekit.io/growbrandz/preFooterIcon.svg" alt="Growbrandz Say Hi" />
        <div className="preFooterLead">You made it this far. Might as well </div>
        <Link to="/contact" className="CTAcover"><div className="bigCTA" data-text="Say Hi">Say Hi</div></Link>
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
              <Link to="/our-approach">Our Approach</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="footerServices">
            <span>SERVICES</span>
            <div className="linkCover">
              {serviceMenu.map((group) => (
                <div className="footerServiceGroup" key={group.label}>
                  <span className="footerServiceLabel">{group.label}</span>
                  {group.items.map((item) => (
                    <FooterServiceItem key={item.label} item={item} />
                  ))}
                </div>
              ))}
              {serviceLinks.map((item) => (
                <FooterServiceItem key={item.label} item={item} />
              ))}
            </div>
          </div>
          <div className="socials">
            <span>STALK US</span>
            <div className="linkCover footerSocialIcons">
              <a href="https://www.linkedin.com/company/growbrandz/" target="_blank" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/grow_brandz/" target="_blank" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.facebook.com/growbrandz.official/" target="_blank" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M14.2 21v-7.1h2.4l.36-2.77h-2.76V9.36c0-.8.22-1.35 1.37-1.35h1.46V5.53A19.4 19.4 0 0 0 15.1 5.4c-2.1 0-3.54 1.28-3.54 3.64v2.09H9v2.77h2.56V21h2.64z" />
                </svg>
              </a>
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
