import gql from 'graphql-tag'

export const GET_BUILDINGS = gql`
  query getBuildings {
    buildings {
      buildingId
      name
      address
      type
      description
    }
  }
`
