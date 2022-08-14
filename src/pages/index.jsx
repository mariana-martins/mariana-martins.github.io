import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Waypoint } from 'react-waypoint'

import { Icon } from '@iconify/react'
import Html5Icon from '@iconify/icons-cib/html5-shield'
import Css3Icon from '@iconify/icons-cib/css3'
import JsIcon from '@iconify/icons-cib/javascript'
import ReactIcon from '@iconify/icons-cib/react'
import ReduxIcon from '@iconify/icons-cib/redux'
import GatsbyIcon from '@iconify/icons-cib/gatsby'
import TypescriptIcon from '@iconify/icons-cib/typescript'

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
                <span className="icon major style5 fas fa-question" />
                <h3>Would You Rather?</h3>
                <p>
                  The goal here is to implement an App to lets a user play the
                  Would You Rather? game. A question is displayed and a user
                  needs answer it. It was developed using React, Redux and
                  Material UI.
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
                    &nbsp; Remote as Frontend Engineer
                  </b>
                </h3>
                <h4>July/2021 - ongoing </h4>
                <p>
                  Working on the Onboarding team, focused on providing the best
                  experience for new users on Remote. Our team is fully async
                  and distributed across the world. A few highlights I
                  contributed are: the rework of how Remote prices its
                  customers, ensuring the process aligns with different
                  countries&apos; legislation, and refactoring code for better
                  code practices and components reusability. I also support our
                  design system, which is widely used on our systems. The Tech
                  stack is React, React Query, Jest, React Testing Library, and
                  Styled Components.
                </p>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Phocas as Software Developer (Frontend Dev)
                  </b>
                </h3>
                <h4>February/2021 - June/2021</h4>
                <p>
                  Working on web development using jQuery, React, Typescript,
                  Redux, Sass, Enzyme, and Bootstrap. I am designing the new
                  grid layout for the main finance product in collaboration with
                  the design team. I am also involved in creating a Design
                  System using Figma and Storybook. I am following Scrum rules
                  and working in a remote team across NZ, AUS, and the UK.
                </p>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Phocas as Junior Software Developer (Frontend Dev)
                  </b>
                </h3>
                <h4>March/2020 - January/2021</h4>
                <p>
                  Worked on web development using React, Redux, Mobx,
                  Typescript, Material UI, Jest and React Testing Library. Also,
                  my responsibilities were to define and implement the layout
                  for the project in collaboration with Phocas designers. We
                  followed Scrumban rules and interacted with remote teams,
                  including designers and other developers.
                </p>
                <h3>
                  <b>
                    <i className="fas fa-hashtag" />
                    &nbsp; Kathmandu as Junior Frontend Developer
                  </b>
                </h3>
                <h4>October/2018 - March/2020</h4>
                <p>
                  As a member of the Web Development team, my main role was to
                  code highly efficient and scalable software to maintain,
                  extend and enhance Kathmandu&apos;s eCommerce website. I
                  worked on web development using HTML5, CSS3, Javascript,
                  jQuery, Figma and Magento 2. I was also responsible for
                  development code review of tags on Google Tag Manager.
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
                <div className="statistics-row">
                  <div className="row-item">
                    <Icon icon={Html5Icon} className="icon" />
                    <strong>HTML5</strong>
                  </div>
                  <div className="row-item">
                    <Icon icon={Css3Icon} className="icon" />
                    <strong>CSS3</strong>
                  </div>
                  <div className="row-item">
                    <Icon icon={JsIcon} className="icon" />
                    <strong>Javascript</strong>
                  </div>
                </div>
                <div>&nbsp;2015</div>
              </li>
              <li className="style2">
                <Icon icon={ReactIcon} className="icon" />
                <strong>React</strong>
                &nbsp;2017
              </li>
              <li className="style3">
                <Icon icon={GatsbyIcon} className="icon" />
                <strong>Gatsby</strong>
                &nbsp;2019
              </li>
              <li className="style4">
                <div className="statistics-row">
                  <div className="row-item">
                    <Icon icon={ReduxIcon} className="icon" />
                    <strong>Redux</strong>
                  </div>
                  <div className="row-item">
                    <Icon icon={TypescriptIcon} className="icon" />
                    <strong>Typescript</strong>
                  </div>
                </div>
                <div>&nbsp;2020</div>
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
              Although I still enjoy reading about History, I am in love with
              the frontend development. In 2019, I started my studies about
              React when I participated in Chingu Cohorts journey. I learned
              Gatsby while developing some internal projects for Kathmandu. I
              have also developed skills to use Sass, Bootstrap 3 and 4, GraphQL
              and Material UI. In 2020, I decided to do a Nano Degree in React
              to improve my skills. On that degree I also learned about Redux.
              It was really handy, because I am using React, Redux and
              Typescript on my current job position.
            </p>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
