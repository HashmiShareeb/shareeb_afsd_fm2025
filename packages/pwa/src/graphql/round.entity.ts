import gql from 'graphql-tag'

export const GET_ROUNDS = gql`
  query GetRounds {
    rounds {
      roundId
      name
      status
      assignedTo {
        id
        uid
        name
        role
      }
      rooms {
        roomId
        order
      }
      building {
        buildingId
        name
        address
        type
      }
    }
  }
`

export const MY_ROUNDS = gql`
  query MyRounds($userId: String!) {
    myRounds(userId: $userId) {
      roundId
      name
      assignedTo {
        id
        uid
        name
      }
      rooms {
        roundRoomId
        roomId
        order
        status
        checklist {
          itemId
          label
          notes
          status
        }
      }
      building {
        buildingId
        name
        address
        type
      }
      status
    }
  }
`

export const GET_ROUNDS_BY_BUILDING = gql`
  query GetRoundsByBuilding($buildingId: String!) {
    roundsByBuilding(buildingId: $buildingId) {
      roundId
      name
      assignedTo {
        id
        name
      }
      rooms {
        roundRoomId
        roomId
        status
      }
    }
  }
`
