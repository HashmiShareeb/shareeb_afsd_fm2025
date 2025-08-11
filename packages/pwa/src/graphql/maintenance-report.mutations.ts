import gql from 'graphql-tag'

export const GET_MAINTENANCE_REPORTS = gql`
  query GetMaintenanceReports {
    maintenancereport {
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
export const GET_MAINTENANCE_REPORT_BY_ID = gql`
  query GetMaintenanceReportById($reportId: String!) {
    maintenancereport(reportId: $reportId) {
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

export const GET_MY_SPECIAL_REQUESTS = gql`
  query ($userId: String!) {
    mySpecialRequests(userId: $userId) {
      requestId
      title
      requestedBy {
        uid
        name
      }
      status
    }
  }
`
