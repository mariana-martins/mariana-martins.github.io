import React from 'react'
import Helmet from 'react-helmet'

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
          <p>This is the most important projects to me!</p>
        </header>
        <div id="main">
          <section id="content" className="main">
            <span className="image main">
              <img src={pic04} alt="" />
            </span>
            <h2>Kathmandu Holdings Website</h2>
            <p>
              Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus
              nunc placerat. Tempus adipiscing turpis non blandit accumsan eget
              lacinia nunc integer interdum amet aliquam ut orci non col ut ut
              praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac
              commodo faucibus faucibus. Curae ante vestibulum ante. Blandit.
              Ante accumsan nisi eu placerat gravida placerat adipiscing in
              risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit
              aliquet aliquet lobortis. Ultricies blandit lobortis praesent
              turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep.
              Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio
              vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis
              in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan
              mi eget adipiscing nulla. Non vestibulum ac interdum condimentum
              semper commodo massa arcu.
            </p>
            <h2>Husky Rescue Organization Website</h2>
            <p>
              Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus
              nunc placerat. Tempus adipiscing turpis non blandit accumsan eget
              lacinia nunc integer interdum amet aliquam ut orci non col ut ut
              praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac
              commodo faucibus faucibus. Curae ante vestibulum ante. Blandit.
              Ante accumsan nisi eu placerat gravida placerat adipiscing in
              risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit
              aliquet aliquet lobortis. Ultricies blandit lobortis praesent
              turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep.
              Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio
              vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis
              in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan
              mi eget adipiscing nulla. Non vestibulum ac interdum condimentum
              semper commodo massa arcu.
            </p>
            <h2>Neighborhood Map App</h2>
            <p>
              Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus
              nunc placerat. Tempus adipiscing turpis non blandit accumsan eget
              lacinia nunc integer interdum amet aliquam ut orci non col ut ut
              praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac
              commodo faucibus faucibus. Curae ante vestibulum ante. Blandit.
              Ante accumsan nisi eu placerat gravida placerat adipiscing in
              risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit
              aliquet aliquet lobortis. Ultricies blandit lobortis praesent
              turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep.
              Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio
              vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis
              in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan
              mi eget adipiscing nulla. Non vestibulum ac interdum condimentum
              semper commodo massa arcu.
            </p>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Projects
