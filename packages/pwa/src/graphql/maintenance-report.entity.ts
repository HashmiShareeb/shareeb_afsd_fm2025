import gql from 'graphql-tag'

export const CREATE_MAINTENANCE_REPORT = gql`
  mutation createMaintenanceReport($input: CreateMaintenancereportInput!) {
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

export const UPDATE_STATUS_MAINTENANCE = gql`
  mutation UpdateMaintenanceReportStatus($reportId: String!, $status: String!) {
    updateMaintenanceReportStatus(reportId: $reportId, status: $status) {
      reportId
      status
    }
  }
`
