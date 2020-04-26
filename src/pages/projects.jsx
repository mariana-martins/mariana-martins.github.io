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
            <a href="https://github.com/mariana-martins/reactnd-project-myreads">
              <i className="fas fa-hashtag" />
              &nbsp;Would You Rather?
            </a>
          </h2>
          <p>
            This is a mandatory project to complete Udacity React Nano Degree.
            The goal here is to implement an App to lets a user play the Would
            You Rather? game. A question with two options is going to be
            displayed and a user needs to choose one option. The user is not
            allowed to select both options or any option. Users can create new
            questions and verify his/her score on the Leaderboard page. It shows
            how many questions users answered and how many questions users
            created. It was developed using React, Redux and Material UI.
          </p>
          <h2>
            <a href="https://github.com/mariana-martins/reactnd-project-myreads">
              <i className="fas fa-hashtag" />
              &nbsp;MyReads Project
            </a>
          </h2>
          <p>
            This project is part of a group of projects to complete the React
            Nano Degree by Udacity. The propose of this project was to exercise
            the knowledge about React through components, state, props, etc.
            Udacity provided to me a layout already done and I had to create a
            bookshelf app that allows an user to categorize books using some
            categories. Another mandatory functionality for the project was a
            limited search feature. An user could search a pre-determined term
            on that search and books related to that query have to display on
            the page.
          </p>
          <h2>
            <a href="https://github.com/mariana-martins/contact-app">
              <i className="fas fa-hashtag" />
              &nbsp;Contact Map App
            </a>
          </h2>
          <p>
            I developed a single-page application that is a Contact List. Main
            features are to add a new contact on the list, favorite a contact,
            display the contact list and update the contact information. The
            data is saved on the browser localStorage. I used React, Material UI
            and Jest to implement this project and Netlify to host. To see the
            project, click
            <a href="https://mariana-contact-app.netlify.com"> here</a>.
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
