import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/layout'

function Projects() {
  return (
    <Layout>
      <Helmet title="Relevant Projects" />
      <header id="header">
        <h1>Relevant Projects</h1>
        <p>This is a selection of some important projects on my career</p>
      </header>
      <div id="main">
        <section id="content" className="main">
          <h2>
            <a href="https://github.com/mariana-martins/Udacity-neighborhood-map">
              <i className="fas fa-hashtag" />
              &nbsp;Neighborhood Map App
            </a>
          </h2>
          <p>
            I developed a single-page application that loads a list of
            restaurants located in Christchurch (NZ), on a map. Used Zomato API
            to get the restaurant list with its rating and Google Maps API to
            visualize them on a map as markers. Developed using the best
            practices in Object Oriented Javascript. The project is constructed
            in MVVM patterns, using Knockout. It also supports filtering
            restaurants by names.
          </p>
          <h2>
            <a href="https://github.com/mariana-martins/bears-33">
              <i className="fas fa-hashtag" />
              &nbsp;Husky Rescue Organization Website
            </a>
          </h2>
          <p>
            I developed a new website for Husky Rescue Organization. It was a
            responsive Single Page Application using React, Bootstrap 4 and
            Sass. I used Adobe Photoshop to create a layout for the new website.
          </p>
          <h2>
            <a href="https://www.kathmandu.co.nz/">
              <i className="fas fa-hashtag" />
              &nbsp;Projects at Kathmandu
            </a>
          </h2>
          <p>
            I worked on internal projects using React, Gatsby.js, Cypress and
            Netlify at Kathmandu. The main project is the Kathmandu Ecommerce
            website which uses Magento 2.2.9, Knockout.js and Less. My main task
            in this project is to fix some bugs related to the frontend and
            develop small functionalities for the website. I am also working to
            keep third party scripts organized using Google Tag Manager, where I
            always improve my abilities with Vanilla Javascript.
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

export default Projects
