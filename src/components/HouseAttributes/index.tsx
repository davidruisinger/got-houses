import React, { FunctionComponent } from 'react'
import {
  GiCrossedSwords,
  GiVerticalBanner,
  GiStoneThrone,
  GiTalk,
  GiBackup,
} from 'react-icons/gi'
import { House } from '../../services/house/types'
import HouseAttribute from '../HouseAttribute'

const attributes = [
  {
    key: 'swornMembers',
    get: (house: House) => house.swornMembers.length.toString(),
    icon: <GiBackup />,
  },
  {
    key: 'words',
    get: (house: House) => house.words,
    icon: <GiTalk />,
  },
  {
    key: 'coatOfArms',
    get: (house: House) => house.coatOfArms,
    icon: <GiVerticalBanner />,
  },
  {
    key: 'seats',
    get: (house: House) => house.seats[0] && house.seats.join(', '),
    icon: <GiStoneThrone />,
  },
  {
    key: 'ancestralWeapons',
    get: (house: House) =>
      house.ancestralWeapons[0] && house.ancestralWeapons.join(', '),
    icon: <GiCrossedSwords />,
  },
]

interface Props {
  house: House
}

const HouseAttributes: FunctionComponent<Props> = ({ house }) => {
  return (
    <>
      {attributes.map((attribute, i) => {
        const data = attribute.get(house)
        return (
          data && (
            <HouseAttribute
              icon={attribute.icon}
              data={data}
              i={i}
              key={attribute.key}
            />
          )
        )
      })}
    </>
  )
}

export default HouseAttributes
