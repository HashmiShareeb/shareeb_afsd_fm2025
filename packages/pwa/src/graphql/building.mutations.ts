import gql from 'graphql-tag'

export const CREATE_BUILDING = gql`
  mutation CreateBuilding($createBuildingInput: CreateBuildingInput!) {
    createBuilding(createBuildingInput: $createBuildingInput) {
      buildingId
      name
      type
      description
    }
  }
`

export const REMOVE_BUILDING = gql`
  mutation RemoveBuilding($buildingId: String!) {
    removeBuilding(buildingId: $buildingId) {
      buildingId
      name
    }
  }
`

export const ADD_ROOM_TO_BUILDING = gql`
  mutation AddRoomToBuilding(
    $buildingId: String!
    $createRoomInput: CreateRoomInput!
  ) {
    addRoomToBuilding(
      buildingId: $buildingId
      createRoomInput: $createRoomInput
    ) {
      roomId
      name
      buildingId
      floor
      capacity
    }
  }
`
