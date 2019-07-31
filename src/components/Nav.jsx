import React from 'react'
import PropTypes from 'prop-types'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

function Nav(props) {
  const { sticky } = props
  return (
    <nav id="nav" className={sticky ? 'alt' : ''}>
      <Scrollspy
        items={['intro', 'projects', 'exp', 'skills']}
        currentClassName="is-active"
        offset={-300}
      >
        <li>
          <Scroll type="id" element="intro">
            <a href="#">Introduction</a>
          </Scroll>
        </li>
        <li>
          <Scroll type="id" element="projects">
            <a href="#">Relevant Projects</a>
          </Scroll>
        </li>
        <li>
          <Scroll type="id" element="exp">
            <a href="#">Experience</a>
          </Scroll>
        </li>
        <li>
          <Scroll type="id" element="skills">
            <a href="#">Skills</a>
          </Scroll>
        </li>
      </Scrollspy>
    </nav>
  )
}

Nav.propTypes = {
  sticky: PropTypes.bool.isRequired,
}

export default Nav
