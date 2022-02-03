import { Container, Row, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Footer.module.css';
import VISA from "../../img/VISA.png";
import MasCard from "../../img/MasCard.png";
import PayPal from "../../img/PayPal.png";
import bitcoin from "../../img/bitcoin.png";
import top from "../../img/top.svg";
import Facebook from "../../img/Facebook.svg";
import Twitter from "../../img/Twitter.svg";
import Instagram from "../../img/Instagram.svg";

function Footer() {
  return (
    <footer className={`${s.footer}`}>
      <Container >
        <Row>
          <div className="col-xl-7 mb-4 mb-xl-0">
            <Nav>
              <ul className={`${s.footerMenu} d-sm-flex`}>
                <li className={s.footerMenuItem}><NavLink to="/shop" className={s.footerMenuLink}>Shop</NavLink></li>
                <li className={s.footerMenuItem}><NavLink to="/aboutus" className={s.footerMenuLink}>About Us</NavLink></li>
                <li className={s.footerMenuItem}><NavLink to="/careers" className={s.footerMenuLink}>Careers</NavLink></li>
                <li className={s.footerMenuItem}><NavLink to="/faq" className={s.footerMenuLink}>FAQ</NavLink></li>
                <li className={s.footerMenuItem}><NavLink to="/blog" className={s.footerMenuLink}>Blog</NavLink></li>
                <li className={s.footerMenuItem}><NavLink to="/contacts" className={s.footerMenuLink}>Contacts</NavLink></li>
              </ul>
            </Nav>
          </div>
          <div className="col-lg-3 d-flex align-items-center">
            <span className={s.footerText}>Follow Us</span>
            <span className={`${s.footerSocial} d-inline-flex align-items-center`}>
              <a href="true" className={s.socialLink}><img src={Facebook} alt="Facebook"/></a>
              <a href="true" className={s.socialLink}><img src={Twitter} alt="Twitter"/></a>
              <a href="true" className={s.socialLink}><img src={Instagram} alt="Instagram"/></a>
            </span>
          </div>
          <div className="col-xl-2 col-lg-3 d-flex justify-content-lg-end mt-4 mt-lg-0">
            <span className={s.footerText}>© 2019 Universal UI Kit</span>
          </div>
        </Row>
        <hr className={`${s.footerLine} mt-4 mb-4`}/>
        <Row className="justify-content-between">
          <div className="col-lg-4 col-sm-9">
            <img className={s.paymentLogo} src={VISA} alt="VISA"/>
            <img className={s.paymentLogo} src={MasCard} alt="MasCard"/>
            <img className={s.paymentLogo} src={PayPal} alt="PayPal"/>
            <img className={s.paymentLogo} src={bitcoin} alt="bitcoin"/>
          </div>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer;