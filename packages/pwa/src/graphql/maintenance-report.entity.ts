import gql from 'graphql-tag'

export const CREATE_MAINTENANCE_REPORT = gql`
  mutation CreateMaintenanceReport($input: CreateMaintenanceReportInput!) {
    createMaintenanceReport(input: $input) {
      reportId
      title
      description
      reportedAt
      status
      reportedBy {
        id
        uid
        name
      }
    }
  }
`
