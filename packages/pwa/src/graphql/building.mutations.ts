import gql from 'graphql-tag'

export const CREATE_BUILDING = gql`
  mutation CreateBuilding($input: CreateBuildingInput!) {
    createBuilding(createBuildingInput: $input) {
      buildingId
      name
      address
      type
      description
    }
  }
`
