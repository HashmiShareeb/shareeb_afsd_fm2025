import gql from 'graphql-tag'

export const RECORD_ENERGY_READING = gql`
  mutation RecordEnergyReading(
    $buildingId: String!
    $meterType: MeterType!
    $value: Float!
    $unit: String!
    $recordedById: String!
  ) {
    recordEnergyReading(
      buildingId: $buildingId
      meterType: $meterType
      value: $value
      unit: $unit
      recordedById: $recordedById
    ) {
      buildingId
      meterType
      value
      recordedById
      recordedAt
    }
  }
`
