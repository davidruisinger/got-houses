import React, { FunctionComponent } from 'react'
import {
  GiCrossedSwords,
  GiVerticalBanner,
  GiStoneThrone,
  GiTalk,
  GiBackup,
} from 'react-icons/gi'
import { House } from '../../services/house/types'
import Card from '../Card'
import HouseHeader from '../HouseHeader'
import HouseAttribute from '../HouseAttribute'

interface Props {
  house: House
  overlord?: House
}

const HouseDetails: FunctionComponent<Props> = ({ house, overlord }) => {
  const swornMembers = house.swornMembers.length
  const words = house.words
  const coatOfArms = house.coatOfArms
  const seats = house.seats[0] && house.seats.join(', ')
  const ancestralWeapons =
    house.ancestralWeapons[0] && house.ancestralWeapons.join(', ')
  return (
    <>
      <Card>
        <HouseHeader house={house} />
        {swornMembers.toString() && (
          <HouseAttribute icon={<GiBackup />} data={swornMembers.toString()} />
        )}
        {words && <HouseAttribute icon={<GiTalk />} data={words} />}
        {coatOfArms && (
          <HouseAttribute icon={<GiVerticalBanner />} data={coatOfArms} />
        )}
        {seats && <HouseAttribute icon={<GiStoneThrone />} data={seats} />}
        {ancestralWeapons && (
          <HouseAttribute icon={<GiCrossedSwords />} data={ancestralWeapons} />
        )}
      </Card>
    </>
  )
}

export default HouseDetails
