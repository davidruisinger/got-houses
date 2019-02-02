import fetchMock from 'fetch-mock'
import { runSaga } from 'redux-saga'
import { ActionType } from 'typesafe-actions'
import * as actions from '../actions'
import * as sagas from '../sagas'
import { BASE_URL, SERVICE_NAME } from '../constants'
import rootReducer from '../../reducer'
import { housesMock } from '../_mocks'

const stateMock = {
  ...rootReducer(undefined, {} as any),
}

const getUrlMock = ({ page, pageSize }: { page: number; pageSize: number }) =>
  `${BASE_URL}?page=${page}&pageSize=${pageSize}`

afterEach(fetchMock.restore)
describe('house service sagas', () => {
  const pageSize = 4

  describe('handleFetchHouses saga', () => {
    it('should fetch the first page and pass the houses to the store on success', async () => {
      const pageSize = 4

      fetchMock.mock(
        getUrlMock({
          page: 1,
          pageSize,
        }),
        {
          status: 200,
          body: housesMock,
        }
      )

      let dispatched: ActionType<typeof actions>[] = []
      await runSaga(
        {
          dispatch: (action: ActionType<typeof actions>) =>
            dispatched.push(action),
          getState: () => stateMock,
        },
        sagas.fetchHousesSaga,
        actions.fetchHouses({ pageSize })
      ).toPromise()

      expect(dispatched).toContainEqual(
        actions.fetchHousesSuccess({
          houses: housesMock,
          isMoreAvailable: false,
        })
      )
    })

    it('should set isMoreAvailable if a next link is passed in the resp header', async () => {
      fetchMock.mock(
        getUrlMock({
          page: 1,
          pageSize,
        }),
        {
          status: 200,
          body: housesMock,
          headers: {
            link:
              '<https://anapioficeandfire.com/api/houses?page=2&pageSize=4>; rel="next",',
          },
        }
      )

      let dispatched: ActionType<typeof actions>[] = []
      await runSaga(
        {
          dispatch: (action: ActionType<typeof actions>) =>
            dispatched.push(action),
          getState: () => stateMock,
        },
        sagas.fetchHousesSaga,
        actions.fetchHouses({ pageSize })
      ).toPromise()

      expect(dispatched).toContainEqual(
        actions.fetchHousesSuccess({
          houses: housesMock,
          isMoreAvailable: true,
        })
      )
    })

    it('should pass an error to the store when failing to fetch houses', async () => {
      fetchMock.mock(
        getUrlMock({
          page: 1,
          pageSize,
        }),
        {
          status: 503,
          body: {},
        }
      )

      let dispatched: ActionType<typeof actions>[] = []
      await runSaga(
        {
          dispatch: (action: ActionType<typeof actions>) =>
            dispatched.push(action),
          getState: () => stateMock,
        },
        sagas.fetchHousesSaga,
        actions.fetchHouses({ pageSize })
      ).toPromise()

      expect(dispatched).toContainEqual(
        actions.fetchHousesFail({ message: 'Service Unavailable' })
      )
    })

    it('should fetch the second page if enough houses are already in store', async () => {
      const pageSize = 2
      const stateWithExistingHouses = {
        ...stateMock,
        [SERVICE_NAME]: {
          ...stateMock[SERVICE_NAME],
          houses: {
            [housesMock[0].name]: housesMock[0],
            'Test Houses 2': { ...housesMock[0], name: 'Test Houses 2' },
            'Test Houses 3': { ...housesMock[0], name: 'Test Houses 3' },
          },
        },
      }

      fetchMock.mock(
        getUrlMock({
          page: 2,
          pageSize,
        }),
        {
          status: 200,
          body: housesMock,
        }
      )

      let dispatched: ActionType<typeof actions>[] = []
      await runSaga(
        {
          dispatch: (action: ActionType<typeof actions>) =>
            dispatched.push(action),
          getState: () => stateWithExistingHouses,
        },
        sagas.fetchHousesSaga,
        actions.fetchHouses({ pageSize })
      ).toPromise()

      // This test is basically true/passing when the mocked URL is fetched (no errors are popping up)
      // If another page is requests the saga will fail and dispatch an error
      expect(dispatched).toContainEqual(
        actions.fetchHousesSuccess({
          houses: housesMock,
          isMoreAvailable: false,
        })
      )
    })
  })
})
