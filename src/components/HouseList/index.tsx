import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import HouseItem from '../HouseItem'
import { House } from '../../services/house/types'

interface Props {
  houses: House[]
  onClick: (id: string) => void
}

const Wrapper = styled.div`
  width: 100%;
`

const HouseList: FunctionComponent<Props> = ({ houses, onClick }) => (
  <Wrapper>
    {houses.map((house, i) => (
      <HouseItem key={`${i}_${house.name}`} house={house} onClick={onClick} />
    ))}
  </Wrapper>
)

export default HouseList
