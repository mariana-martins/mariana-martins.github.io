import React from 'react'

function Footer() {
  return (
    <footer id="footer">
      <section>
        <h2>Would like to know more about me?</h2>
        <p>
          I&apos;ve written some articles to share my experiences and opinions.
          For me, be a developer, doesn&apos;t means stop to write!
        </p>
        <ul className="actions">
          <li>
            <a href="https://medium.com/@mmartinsmenezes" className="button">
              Check my Medium profile
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Follow Me</h2>
        <dl className="alt">
          <dt>Address</dt>
          <dd>St. Albans - Christchurch - New Zealand</dd>
          <dt>Email</dt>
          <dd>
            <a href="mailto:marianamartinsmenezes@gmail.com">
              marianamartinsmenezes@gmail.com
            </a>
          </dd>
        </dl>
        <ul className="icons">
          <li>
            <a
              href="https://www.linkedin.com/in/marianamenezes/"
              className="icon fab fa-linkedin-in alt"
            >
              <span className="label" aria-labelledby="LinkedIn" role="img">
                LinkedIn
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/x2003k"
              className="icon fab fa-facebook-f alt"
            >
              <span className="label" aria-labelledby="Facebook" role="img">
                Facebook
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/marianamartinsmenezes/"
              className="icon fab fa-instagram alt"
            >
              <span className="label" aria-labelledby="Instagram" role="img">
                Instagram
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mariana-martins"
              className="icon fab fa-github alt"
            >
              <span className="label" aria-labelledby="Github" role="img">
                GitHub
              </span>
            </a>
          </li>
        </ul>
      </section>
      <p className="copyright">
        &copy; Untitled. Design:&nbsp;
        <a href="https://html5up.net">HTML5 UP</a>
        &nbsp;&amp;&nbsp;Implementation:&nbsp;
        <a href="https://github.com/mariana-martins">Mariana Martins Menezes</a>
      </p>
    </footer>
  )
}

export default Footer
