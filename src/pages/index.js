import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/Header'
import Nav from '../components/Nav'
import pic01 from '../assets/images/pic01.jpg'

const pStyle = {
  textAlign: 'left'
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyNav: false
    }
  }

  _handleWaypointEnter= () => {
    this.setState(() => ({ stickyNav: false }));
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
  }

  render() {

    return (
      <Layout>
        <Helmet title="Mariana's Portfolio" />

        <Header />

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        >
        </Waypoint>
        <Nav sticky={this.state.stickyNav} />

        <div id="main">

          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>About Me</h2>
                </header>
                <p>Right now I’m mainly focusing on Front-End User Experience technologies. Devotion and responsibility are only some characteristics of my personality and I'm looking for opportunities to share my knowledge and to show my work. I believe in an easily accessible Web for everybody and in the future I would like to be part of the creation of an inclusive web using my Front-end knowledge.</p>
                <ul className="actions">
                  <li><Link to="/generic" className="button">Learn More</Link></li>
                </ul>
              </div>
              <span className="image"><img src={pic01} alt="" /></span>
            </div>
          </section>

          <section id="first" className="main special">
            <header className="major">
              <h2>Relevant Projects</h2>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style1 fa-bar-chart"></span>
                <h3>Kathmandu Holdings Website</h3>
                <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
              </li>
              <li>
                <span className="icon major style3 fa-paw"></span>
                <h3>Husky Rescue Organization Website</h3>
                <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
              </li>
              <li>
                <span className="icon major style5 fa-map-signs"></span>
                <h3>Neighborhood Map</h3>
                <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
              </li>
            </ul>
            <footer className="major">
              <ul className="actions">
                <li><Link to="/generic" className="button">Learn More</Link></li>
              </ul>
            </footer>
          </section>

          <section id="second" className="main special">
            <header className="major">
              <h2>Skills</h2>
              <p>I like to code things from scratch,<br /> I and enjoy learning new tools to help me in my work. </p>
            </header>
            <ul className="statistics">
              <li className="style1">
                <span className="icon fa-html5"></span>
                <strong>HTML5</strong> 2015
              </li>
              <li className="style2">
                <span className="icon fa-css3"></span>
                <strong>CSS3</strong> 2015
              </li>
              <li className="style3">
                <span className="icon fa-terminal"></span>
                <strong>Javascript</strong> 2015
              </li>
              <li className="style4">
                <span className="icon fa-laptop"></span>
                <strong>React</strong> 2017
              </li>
              <li className="style5">
                <span className="icon fa-diamond"></span>
                <strong>Gatsby</strong> 2019
              </li>
            </ul>
            <p className="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
          </section>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Experience</h2>
              <p style={pStyle}>Donec imperdiet consequat consequat. Suspendisse feugiat congue
              posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
            </header>
          </section>

        </div>

      </Layout>
    )
  }
}

export default Index
