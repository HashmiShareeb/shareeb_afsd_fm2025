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
  query getBuildingById($buildingId: String!) {
    building(buildingId: $buildingId) {
      buildingId
      name
      address
      type
      description
      imageUrl
      rooms {
        roomId
        name
        capacity
        floor
      }
    }
  }
`

export const GET_BUILDING_BY_NAME = gql`
  query GetBuildingByName($name: String!) {
    buildingByName(name: $name) {
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
      }
    }
  }
`
