import { House } from './types'
import { HouseState } from './reducer'

export const housesMock: House[] = [
  {
    id: '1',
    url: 'https://www.anapioficeandfire.com/api/houses/1',
    name: 'Test House',
    region: 'Test Region',
    coatOfArms: 'Something',
    words: 'foo baar',
    titles: ['The Testers'],
    seats: ['Test seat'],
    currentLord: 'https://www.anapioficeandfire.com/api/characters/1',
    heir: 'https://www.anapioficeandfire.com/api/characters/1',
    overlord: 'https://www.anapioficeandfire.com/api/characters/1',
    overlordId: '1',
    founded: '',
    founder: 'https://www.anapioficeandfire.com/api/characters/1',
    diedOut: '',
    ancestralWeapons: ['Test Sword'],
    cadetBranches: [],
    swornMembers: ['https://www.anapioficeandfire.com/api/characters/1'],
  },
]

export const houseStateMock: HouseState = {
  isFetching: false,
  error: null,
  isMoreAvailable: true,
  houses: {
    [housesMock[0].name]: housesMock[0],
  },
}
