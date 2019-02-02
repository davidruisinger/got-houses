import React, { PureComponent } from 'react'
import { Layout } from '../components'

class Home extends PureComponent {
  render() {
    return (
      <Layout title="Error">
        <h1>ERROR!</h1>
        <p>Something went wrong.</p>
      </Layout>
    )
  }
}

export default Home
