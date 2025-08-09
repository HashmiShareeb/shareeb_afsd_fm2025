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
    }
  }
`
