import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Waypoint } from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/Header'
import Nav from '../components/Nav'
import pic01 from '../assets/images/pic01.jpg'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyNav: false,
    }
  }

  handleWaypointEnter() {
    this.setState(() => ({ stickyNav: false }))
  }

  handleWaypointLeave() {
    this.setState(() => ({ stickyNav: true }))
  }

  render() {
    const { stickyNav } = this.state
    return (
      <Layout>
        <Helmet title="Mariana's Portfolio" />

        <Header />

        <Waypoint
          onEnter={() => this.handleWaypointEnter()}
          onLeave={() => this.handleWaypointLeave()}
        />
        <Nav sticky={stickyNav} />

        <div id="main">
          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>About Me</h2>
                </header>
                <p>
                  Hi! My name is Mariana. I live in a nice city, called
                  Christchurch! I am a big fan of Lord of the Rings! What other
                  reason is there to live in New Zealand? I am joking, this
                  country is really beautiful and I love living here. My hobbies
                  include reading adventure and dystopian books, building
                  something using Lego, watching some NFL game and listening to
                  music. I cannot live without music. Devotion and
                  responsibility are some characteristics of my personality. I
                  believe in an easily accessible Web for everybody and in the
                  future, I would like to be part of the creation of an
                  inclusive web using my Front-end knowledge.
                </p>
              </div>
              <span className="image">
                <img src={pic01} alt="" />
              </span>
            </div>
          </section>

          <section id="projects" className="main special">
            <header className="major">
              <h2>Relevant Projects</h2>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style1 fas fa-address-book" />
                <h3>Contact App</h3>
                <p>
                  Developed a single-page application that is a Contact List.
                  Main features are to add a new contact on the list, favorite a
                  contact, display the contact list and update the contact
                  information.
                </p>
              </li>
              <li>
                <span className="icon major style3 fa fa-paw" />
                <h3>Husky Rescue Org. Website</h3>
                <p>
                  It was SPA using React, Bootstrap 4, Sass and Webpack. I also
                  developed the new website mockups using Photoshop. It was a
                  proposing to replace the old Husky Rescue website.
                </p>
              </li>
              <li>
                <span className="icon major style5 fab fa-magento" />
                <h3>Projects at Kathmandu</h3>
                <p>
                  I am currently working in internal projects at Kathmandu. The
                  main project is the Kathmandu Ecommerce website which uses
                  Magento 2.3, Knockout.js and Less.
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

          <section id="exp" className="main special">
            <header className="major">
              <h2>Experience</h2>
              <div style={{ textAlign: 'left' }}>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Phocas as Software Developer
                  </b>
                </h3>
                <h4>March/2020 - On going</h4>
                <p>
                  I’m working with a modern Frontend stack consisting of React,
                  Redux and Material UI. My main focus is on developing new
                  features to Phocas’ BI solution. As part of my
                  responsibilities, I’m following Scrum rules and interacting
                  with remote teams, including designers and other Frontend
                  developers.
                </p>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Kathmandu as Frontend Developer
                  </b>
                </h3>
                <h4>October/2018 - March/2020</h4>
                <p>
                  As a member of the Web Development team, my main role is to
                  code highly efficient and scalable software to maintain,
                  extend and enhance Kathmandu&apos;s eCommerce website. I am
                  currently working with HTML5, CSS3, Javascript and Magento 2.
                  I am also responsible for code review and development of tags
                  on Google Tag Manager. One of my recent achievements is a
                  website prototype, that is planned to released after
                  finalizing more features. Its main technologies are React,
                  GraphQL, Gatsby.js, and Netlify CMS.
                </p>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Chingu Cohorts Journey as Frontend Developer
                  </b>
                </h3>
                <h4>December/2017 - January/2018</h4>
                <p>
                  My main role was Frontend developer but also acted as Project
                  Manager. As a Frontend Developer, I designed and implemented
                  the Husky Rescue webpage. Its design was created using Adobe
                  Photoshop. It was developed using React, Bootstrap 4, SASS and
                  Webpack. On this project, I worked remotely with a mixed level
                  team using tools like Slack, Trello and Github.
                </p>
              </div>
            </header>
          </section>

          <section id="skills" className="main special">
            <header className="major">
              <h2>Skills &amp; Education</h2>
              <p>
                I like to code things from scratch,
                <br />
                and enjoy learning new tools to help me in my work.
              </p>
            </header>
            <ul className="statistics">
              <li className="style1">
                <span className="icon fab fa-html5" role="img" />
                <strong>HTML5</strong>
                &nbsp;2015
              </li>
              <li className="style2">
                <span className="icon fab fa-css3" role="img" />
                <strong>CSS3</strong>
                &nbsp;2015
              </li>
              <li className="style3">
                <span className="icon fab fa-js-square" role="img" />
                <strong>Javascript</strong>
                &nbsp;2015
              </li>
              <li className="style4">
                <span className="icon fab fa-react" role="img" />
                <strong>React</strong>
                &nbsp;2017
              </li>
              <li className="style5">
                <span className="icon fas fa-user-astronaut" role="img" />
                <strong>Gatsby</strong>
                &nbsp;2019
              </li>
            </ul>
            <p className="content">
              I have studied History at the Fluminense Federal University, in
              Rio. However, during my bachelor, I realized that the impact of my
              work in society did not satisfy me. So, I decided to try something
              completely different and I have no regrets about it. After
              finishing my bachelor degree, I started studying basics Web
              development subjects. Then, I discovered that my passion for
              Frontend development could be my profession in the future.
              Although I still enjoy reading about History, currently I am in
              love with the frontend development. In 2019, I started my studies
              about React when I participated in Chingu Cohorts journey. I am
              currently learning Gatsby while developing some internal projects
              for Kathmandu. I have also developed skills to use Sass, Bootstrap
              3 and 4, GraphQL and Webpack. My current interests are UX and
              accessibility.
            </p>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
