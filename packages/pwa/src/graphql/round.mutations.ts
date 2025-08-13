import gql from 'graphql-tag'

// export const CREATE_ROUND = gql`
//   mutation CreateRound($createRoundInput: CreateRoundInput!) {
//     createRound(input: $createRoundInput) {
//       id
//       name
//       assignedToId
//       buildingId
//       rooms {
//         id
//         name
//         floor
//         capacity
//         floor
//         capacity
//       }
//       assignedTo {
//         uid
//         name
//         role
//       }
//       status
//     }
//   }
// `

export const CREATE_ROUND = gql`
  mutation CreateRound($createRoundInput: CreateRoundInput!) {
    createRound(createRoundInput: $createRoundInput) {
      roundId
      name
      assignedTo {
        id
        name
      }
      buildingId
      rooms {
        roomId
        order
      }
      status
    }
  }
`
