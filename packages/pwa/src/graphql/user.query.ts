import gql from 'graphql-tag'

export const OWN_USER_ACCOUNT = gql`
  query ownUseraccount($uid: String!) {
    userByUid(uid: $uid) {
      id
      uid
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_USERS = gql`
  query getUsers {
    users {
      id
      uid
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_MANAGERS = gql`
  query {
    usersByRole(role: "MANAGER") {
      id
      uid
      name
      role
      createdAt
      updatedAt
    }
  }
`

// export const OWN_USER_ACCOUNT = gql`
//   query ownUseraccount {
//     users {
//       id
//       uid
//       role
//       createdAt
//       updatedAt
//     }
//   }
// `
