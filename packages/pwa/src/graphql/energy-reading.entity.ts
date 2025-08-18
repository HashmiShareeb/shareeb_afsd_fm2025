import gql from 'graphql-tag'

export const GET_ALL_ENERGY_READINGS = gql`
  query GetAllEnergyReadings {
    energyReadings {
      readingId
      meterType
      value
      unit
      recordedBy {
        id
        uid
        name
      }
      building {
        buildingId
        name
        address
      }
      recordedAt
    }
  }
`

export const GET_ENERGY_READINGS_BY_BUILDING = gql`
  query GetEnergyReadingsByBuilding($buildingId: String!) {
    energyReadingsByBuilding(buildingId: $buildingId) {
      readingId
      meterType
      value
      building {
        buildingId
        name
        address
      }
      recordedAt
    }
  }
`

export const MY_ENERGY_READINGS = gql`
  query MyEnergyReading($userId: String!) {
    myEnergyReadings(userId: $userId) {
      readingId
      meterType
      value
      unit
      recordedBy {
        id
        name
      }
      building {
        buildingId
        name
        address
      }
      recordedAt
    }
  }
`
