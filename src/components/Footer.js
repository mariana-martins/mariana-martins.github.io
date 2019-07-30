import React from 'react'

const Footer = (props) => (
    <footer id="footer">
        <section>
            <h2>Would like to know more about me?</h2>
            <p>I've written some articles to share my experiences and opinions. For me, be a developer, doesn't means stop to write!</p>
            <ul className="actions">
                <li><a href="https://medium.com/@mmartinsmenezes" className="button">Check my Medium profile</a></li>
            </ul>
        </section>
        <section>
            <h2>Follow Me</h2>
            <dl className="alt">
                <dt>Address</dt>
                <dd>St. Albans - Christchurch - New Zealand</dd>
                <dt>Email</dt>
                <dd><a href="#">marianamartinsmenezes@gmail.com</a></dd>
            </dl>
            <ul className="icons">
                <li>
                    <a href="https://www.linkedin.com/in/marianamenezes/" className="icon fa-linkedin alt">
                        <span className="label">LinkedIn</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/x2003k" className="icon fa-facebook alt">
                        <span className="label">Facebook</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/marianamartinsmenezes/" className="icon fa-instagram alt">
                        <span className="label">Instagram</span>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/mariana-martins" className="icon fa-github alt">
                        <span className="label">GitHub</span>
                    </a>
                </li>
            </ul>
        </section>
        <p className="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
    </footer>
)

export default Footer
