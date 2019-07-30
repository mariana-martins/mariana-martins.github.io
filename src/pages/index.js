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
                  Right now I’m mainly focusing on Front-End User Experience
                  technologies. Devotion and responsibility are only some
                  characteristics of my personality and I'm looking for
                  opportunities to share my knowledge and to show my work. I
                  believe in an easily accessible Web for everybody and in the
                  future I would like to be part of the creation of an inclusive
                  web using my Front-end knowledge.
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
                <span className="icon major style1 fas fa-store" />
                <h3>Kathmandu Holdings Website</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li>
              <li>
                <span className="icon major style3 fa fa-paw" />
                <h3>Husky Rescue Org. Website</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
                </p>
              </li>
              <li>
                <span className="icon major style5 fa fa-map-signs" />
                <h3>Neighborhood Map App</h3>
                <p>
                  Sed lorem amet ipsum dolor et amet nullam consequat a feugiat
                  consequat tempus veroeros sed consequat.
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
          {/* TODO: Escrever texto sobre educação */}
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
              Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl
              eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum
              ac arcu sit amet, fermentum pellentesque et purus. Integer maximus
              varius lorem, sed convallis diam accumsan sed. Etiam porttitor
              placerat sapien, sed eleifend a enim pulvinar faucibus semper quis
              ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer
              eget purus nec nulla mattis et accumsan ut magna libero. Morbi
              auctor iaculis porttitor. Sed ut magna ac risus et hendrerit
              scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras
              eu ornare dui curabitur lacinia.
            </p>
          </section>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Experience</h2>
              <div style={{ textAlign: 'left' }}>
                <h3><b>Kathmandu as Frontend Developer</b></h3>
                <p>
                  Cep risus aliquam gravida cep ut lacus amet. Adipiscing
                  faucibus nunc placerat. Tempus adipiscing turpis non blandit
                  accumsan eget lacinia nunc integer interdum amet aliquam ut
                  orci non col ut ut praesent. Semper amet interdum mi.
                  Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae
                  ante vestibulum ante. Blandit. Ante accumsan nisi eu placerat
                  gravida placerat adipiscing in risus fusce vitae ac mi
                  accumsan nunc in accumsan tempor blandit aliquet aliquet
                  lobortis. Ultricies blandit lobortis praesent turpis.
                  Adipiscing accumsan adipiscing adipiscing ac lacinia cep. Orci
                  blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio
                  vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id.
                  Vis in blandit. Nascetur ultricies blandit ac. Arcu aliquam.
                  Accumsan mi eget adipiscing nulla. Non vestibulum ac interdum
                  condimentum semper commodo massa arcu.
                </p>
                <h3><b>Chingu Cohorts as Frontend Developer</b></h3>
                <p>
                  Cep risus aliquam gravida cep ut lacus amet. Adipiscing
                  faucibus nunc placerat. Tempus adipiscing turpis non blandit
                  accumsan eget lacinia nunc integer interdum amet aliquam ut
                  orci non col ut ut praesent. Semper amet interdum mi.
                  Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae
                  ante vestibulum ante. Blandit. Ante accumsan nisi eu placerat
                  gravida placerat adipiscing in risus fusce vitae ac mi
                  accumsan nunc in accumsan tempor blandit aliquet aliquet
                  lobortis. Ultricies blandit lobortis praesent turpis.
                  Adipiscing accumsan adipiscing adipiscing ac lacinia cep. Orci
                  blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio
                  vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id.
                  Vis in blandit. Nascetur ultricies blandit ac. Arcu aliquam.
                  Accumsan mi eget adipiscing nulla. Non vestibulum ac interdum
                  condimentum semper commodo massa arcu.
                </p>
              </div>
            </header>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
