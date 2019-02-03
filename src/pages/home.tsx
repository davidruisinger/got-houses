import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from 'ServicesTypes'
import {
  getAllHouses,
  getHousesError,
  getIsHousesFetching,
  getAreMoreHousesAvailable,
} from '../services/house/selectors'
import { fetchHouses } from '../services/house/actions'
import { House } from '../services/house/types'
import { Layout, List, ListItem, Spinner } from '../components'

interface StateProps {
  error: string | null
  isHousesFetching: boolean
  moreHousesAvailable: boolean
  houses: House[]
}

interface DispatchProps {
  fetchHouses: ({ pageSize }: { pageSize: number }) => void
}

class Home extends PureComponent<
  StateProps & DispatchProps & RouteComponentProps
> {
  static pageSize = 24

  componentDidMount() {
    const { houses } = this.props
    // Load the first batch of houses if they are not already loaded
    if (houses.length < Home.pageSize) this.fetchMoreHouses()

    // Add an event listener to listen for scroll events
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // Remove the event listener
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    // Get the window height
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight
    // Get the content height
    const body = document.body
    const html = document.documentElement
    const contentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    // Check if the user scrolled to the bottom of the page
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= contentHeight) {
      this.fetchMoreHouses()
    }
  }

  fetchMoreHouses = () => {
    const { fetchHouses, moreHousesAvailable } = this.props
    if (moreHousesAvailable) fetchHouses({ pageSize: Home.pageSize })
  }

  handleHouseClick = (id: string) => {
    const { history } = this.props
    history.push(`/houses/${id}`)
  }

  render() {
    const { error, isHousesFetching, moreHousesAvailable, houses } = this.props
    return error ? (
      <Layout title="Error">
        <h1>Error:</h1>
        <h3>{error}</h3>
      </Layout>
    ) : (
      <Layout title="Overview">
        <h1>Game of Thrones - Houses</h1>
        <List>
          {houses.map((house, i) => (
            <ListItem
              key={`${i}_${house.name}`}
              label={house.name}
              onClick={() => this.handleHouseClick(house.id)}
            />
          ))}
        </List>
        {isHousesFetching && <Spinner />}
        {!moreHousesAvailable && <p>That's all</p>}
      </Layout>
    )
  }
}

const mapStateToProps = (state: State) => ({
  error: getHousesError(state),
  isHousesFetching: getIsHousesFetching(state),
  moreHousesAvailable: getAreMoreHousesAvailable(state),
  houses: getAllHouses(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchHouses: ({ pageSize }: { pageSize: number }) =>
    dispatch(fetchHouses({ pageSize })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
