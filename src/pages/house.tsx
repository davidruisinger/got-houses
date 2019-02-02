import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from 'ServicesTypes'
import { House as HouseType } from '../services/house/types'
import {
  getHouse,
  getIsHousesFetching,
  getHousesError,
} from '../services/house/selectors'
import { fetchHouseById } from '../services/house/actions'
import { Layout, Spinner, HouseDetails, HouseItem } from '../components'

interface StateProps {
  error: string | null
  house?: HouseType
  getHouse: ({ id }: { id: string }) => HouseType
  isFetching: boolean
}

interface DispatchProps {
  fetchHouse: ({ id }: { id: string }) => void
}

type RouterProps = RouteComponentProps<{ id: string }>

class House extends PureComponent<StateProps & DispatchProps & RouterProps> {
  componentDidMount() {
    const { house, fetchHouse, match } = this.props
    // Fetch the house if it is not already in store
    if (!house) {
      fetchHouse({ id: match.params.id })
    } else {
      // If we do already have a house we can directly fetch the overlords
      this.fetchOverlord()
    }
  }

  componentDidUpdate(previousProps: StateProps & DispatchProps & RouterProps) {
    const { house } = this.props
    // Check if we received a house afterwards (house was fetched in componendDidMoun)
    if (house && !previousProps.house) {
      // Let's also fetch the overlords
      this.fetchOverlord()
    }
  }

  fetchOverlord() {
    const { house, fetchHouse } = this.props
    if (house && house.overlordId) {
      fetchHouse({ id: house.overlordId })
    }
  }

  handleHouseClick = (id: string) => {
    const { history } = this.props
    history.push(`/houses/${id}`)
  }

  render() {
    const { error, isFetching, house, getHouse } = this.props

    const overlord =
      house && house.overlordId && getHouse({ id: house.overlordId })

    return isFetching ? (
      <Layout title="...">
        <Spinner />
      </Layout>
    ) : house ? (
      <Layout title={house.name}>
        <HouseDetails house={house} />
        {overlord && (
          <HouseItem house={overlord} onClick={this.handleHouseClick} />
        )}
      </Layout>
    ) : (
      <Layout title="Error">
        <h1>Error:</h1>
        <h3>{error}</h3>
      </Layout>
    )
  }
}

const mapStateToProps = (state: State, ownProps: RouterProps) => ({
  house: getHouse(state, { id: ownProps.match.params.id }),
  getHouse: ({ id }: { id: string }) => getHouse(state, { id }),
  isFetching: getIsHousesFetching(state),
  error: getHousesError(state),
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouterProps) => ({
  fetchHouse: ({ id }: { id: string }) => dispatch(fetchHouseById({ id })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(House)
