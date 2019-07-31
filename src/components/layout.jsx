import React from 'react'
import PropTypes from 'prop-types'
import '../assets/scss/main.scss'

import Footer from './Footer'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: 'is-loading',
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' })
    }, 100)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    const { children } = this.props
    const { loading } = this.state

    return (
      <div className={`body ${loading}`}>
        <div id="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Template
