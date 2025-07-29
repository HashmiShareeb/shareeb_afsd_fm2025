import gql from 'graphql-tag'

export const ADD_NEW_USER = gql`
  mutation createOwnAccount($createUserInput: CreateUserInput!) {
    createOwnUseraccount(createUserInput: $createUserInput) {
      id
      uid
      role
    }
  }
`
