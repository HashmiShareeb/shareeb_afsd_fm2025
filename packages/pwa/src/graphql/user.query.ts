import gql from 'graphql-tag'

export const OWN_USER_ACCOUNT = gql`
  query ownUseraccount {
    users {
      id
      uid
      displayName
      role
      createdAt
      updatedAt
    }
  }
`
