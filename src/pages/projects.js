import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'

class Projects extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title="Relevant Projects" />
        <header id="header">
          <h1>Relevant Projects</h1>
          <p>This is  a selection of some important projects on my career</p>
        </header>
        <div id="main">
          <section id="content" className="main">
            <h2><i class="fas fa-hashtag"></i> Neighborhood Map App</h2>
            <p>
              I d eveloped a single-page application that loads a list of restaurants located in Christchurch (NZ), on a map. Used Zomato API to get the restaurant list with its rating and Google Maps API to visualize them on a map as markers. Developed using the best practices in Object Oriented Javascript. The project is constructed in MVVM patterns, using Knockout. It also supports filtering the restaurants by names.
            </p>
            <h2><i class="fas fa-hashtag"></i> Husky Rescue Organization Website</h2>
            <p>
              I developed a new website for Husky Rescue Organization.  It was a responsive Single Page Application using React, Bootstrap 4 and Sass. I used Adobe Photoshop to create a layout for the new website.
            </p>
            <h2><i class="fas fa-hashtag"></i> Projects at Kathmandu</h2>
            <p>
              I'm currently working in internal projects using React, Gatsby.js,Cypress and Netlify at Kathmandu. The main project is the Kathmandu Ecommerce website which use Magento 2.2.9, Knockout.js and Less. I am also working to keep third party scripts organised using Google Tag Manager, where I always improve my abilities with Vanilla Javascript.
            </p>
            <ul className="actions">
              <li>
                <Link to="/" className="button">
                  Back
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Projects
