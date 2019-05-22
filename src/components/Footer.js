import React from 'react'
import { Link } from 'gatsby'

import logo from '../assets/images/logo.svg';

const Footer = (props) => (
    <footer id="footer">
        <section>
            <h2>Interested in doing a project together?</h2>
            <p>Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.</p>
            <ul className="actions">
                <li><Link to="/generic" className="button">Learn More</Link></li>
            </ul>
        </section>
        <section>
            <h2>Follow Me</h2>
            <dl className="alt">
                <dt>Address</dt>
                <dd>St. Albans - Christchurch - New Zealand</dd>
                <dt>Phone</dt>
                <dd>+64 27 431 5548</dd>
                <dt>Email</dt>
                <dd><a href="#">marianamartinsmenezes@gmail.com</a></dd>
            </dl>
            <ul className="icons">
                {/* TODO: Gatsby link poderia ser usado aqui? */}
                <li><a href="#" className="icon fa-linkedin alt"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon fa-facebook alt"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon fa-instagram alt"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon fa-github alt"><span className="label">GitHub</span></a></li>
            </ul>
        </section>
        <p className="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
    </footer>
)

export default Footer
