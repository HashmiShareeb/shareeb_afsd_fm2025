import gql from 'graphql-tag'

export const GET_BUILDINGS = gql`
  query getBuildings {
    buildings {
      buildingId
      name
      address
      type
      description
      imageUrl
    }
  }
`

export const GET_ALL_BUILDINGS_WITH_ROOMS = gql`
  query GetBuildingsWithRooms {
    buildings {
      buildingId
      name
      address
      type
      description
      imageUrl
      rooms {
        roomId
        name
        floor
        capacity
        buildingId
      }
    }
  }
`

export const GET_BUILDING_BY_ID = gql`
  query getBuildingWithRooms($buildingId: String!) {
    building(buildingId: $buildingId) {
      name
      address
      imageUrl
      rooms {
        roomId
        name
        capacity
        floor
        buildingId
      }
    }
  }
`
