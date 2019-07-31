import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Waypoint } from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/Header'
import Nav from '../components/Nav'
import pic01 from '../assets/images/pic01.jpg'

const pStyle = {
  textAlign: 'left',
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyNav: false,
    }
  }

  _handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }))
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }))
  }

  render() {
    return (
      <Layout>
        <Helmet title="Mariana's Portfolio" />

        <Header />

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        />
        <Nav sticky={this.state.stickyNav} />

        <div id="main">
          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>About Me</h2>
                </header>
                <p>
                  Hi! My name is Mariana. I live in a nice city, called Christchurch! I'm a big fan of Lord of the Rings! What other reason is there to live in New Zealand? I'm joking, this country is really beautiful and I love living here. My hobbies include reading adventure and dystopian books, building something using Lego, watching some NFL game and listening to music. I can't live without music. Devotion and responsibility are some characteristics of my personality. I believe in an easily accessible Web for everybody and in the future I would like to be part of the creation of an inclusive web using my Front-end knowledge.
                </p>
              </div>
              <span className="image">
                <img src={pic01} alt="" />
              </span>
            </div>
          </section>

          <section id="first" className="main special">
            <header className="major">
              <h2>Relevant Projects</h2>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style1 fa fa-map-signs" />
                <h3>Neighborhood Map App</h3>
                <p>
                  I ​developed a SPA that loads a list of restaurants located in Christchurch on a map. I used Zomato API to get the restaurant list and Google Maps API to visualize them on a map as markers.
                </p>
              </li>
              <li>
                <span className="icon major style3 fa fa-paw" />
                <h3>Husky Rescue Org. Website</h3>
                <p>
                  It was SPA using React, Bootstrap 4, Sass and Webpack. I also developed the new website mockups using Photoshop. It was a proposing to replace the old Husky Rescue website.
                </p>
              </li>
              <li>
                <span className="icon major style5 fas fa-lock" />
                <h3>Projects at Kathmandu</h3>
                <p>
                  I'm currently working in internal projects using React, Gatsby.js and Netlify at Kathmandu. The main project is the Kathmandu Ecommerce website which use Magento 2.2.9, Knockout.js and Less.
                </p>
              </li>
            </ul>
            <footer className="major">
              <ul className="actions">
                <li>
                  <Link to="/projects" className="button">
                    Learn More
                  </Link>
                </li>
              </ul>
            </footer>
          </section>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Experience</h2>
              <div style={{ textAlign: 'left' }}>
                <h3><b><i class="fas fa-hashtag"></i> Kathmandu as Junior Frontend Developer</b></h3>
                <h4>October/2018 - On going</h4>
                <p>
                  As a member of the Web Development team, my main role is to code highly efficient and scalable software to maintain, extend and enhance Kathmandu’s eCommerce website. I am currently working with HTML5, CSS3, Javascript and Magento 2. I’m also responsible for code review and development of tags on Google Tag Manager. One of my recent achievements is a website prototype, that is planned to released after finalising more features. Its main technologies are React, GraphQL, Gatsby.js, and Netlify CMS.
                </p>
                <h3><b><i class="fas fa-hashtag"></i> Chingu Cohorts Project as Frontend Developer</b></h3>
                <h4>December/2017 - January/2018</h4>
                <p>
                  My main role was Frontend developer but also acted as Project Manager. As a Frontend Developer, I designed and implemented the Husky Rescue webpage. Its design was created using Adobe Photoshop. It was developed using React, Bootstrap 4, SASS and Webpack.
                </p>
              </div>
            </header>
          </section>

          <section id="second" className="main special">
            <header className="major">
              <h2>Skills & Education</h2>
              <p>
                I like to code things from scratch,
                <br /> I and enjoy learning new tools to help me in my work.{' '}
              </p>
            </header>
            <ul className="statistics">
              <li className="style1">
                <span className="icon fab fa-html5" />
                <strong>HTML5</strong> 2015
              </li>
              <li className="style2">
                <span className="icon fab fa-css3" />
                <strong>CSS3</strong> 2015
              </li>
              <li className="style3">
                <span className="icon fab fa-js-square" />
                <strong>Javascript</strong> 2015
              </li>
              <li className="style4">
                <span className="icon fab fa-react" />
                <strong>React</strong> 2017
              </li>
              <li className="style5">
                <span className="icon fas fa-user-astronaut" />
                <strong>Gatsby</strong> 2019
              </li>
            </ul>
            <p className="content">
              I've studied History at the Fluminense Federal University, in Rio. However, during my bachelor, I realized that the impact of my work in society didn't satisfy me. So, I decided to try something completely different and I have no regrets about it. After finishing my bachelor degree, I started studying basics Web development subjects. Then, I discovered that my passion for Frontend development could be my profession in the future. Although I still enjoy reading about History, currently I am in love with the frontend development. In 2019, I started my studies about React when I participated in Chingu Cohorts journey. After that, I'm currently learning Gatsby while developing some internal projects for Kathmandu. I've also developed skills to use Sass, Bootstrap 3 & 4, GraphQL and Webpack. My current interests are more about UX and accessibility.
            </p>
          </section>


        </div>
      </Layout>
    )
  }
}

export default Index
