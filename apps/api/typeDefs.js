import { gql } from 'apollo-server'

export default gql`
  type Query {
    line_items: [LineItem]
  }

  type Mutation {
    pack_items(data: PackItemsInput!): PackedPackages
  }

  input PackItemsInput {
    packages: [PackageInput]!
  }

  input PackageInput {
    id: Int!
    line_items: [LineItemInput]!
  }

  input LineItemInput {
    id: Int!
    quantity: Int!
    sku: String!
    location: String!
  }

  type LineItem {
    id: Int
    quantity: Int
    sku: String
    location: String
  }

  type PackedPackages {
    packages: [PackedPackage]
  }

  type PackedPackage {
    id: Int
    line_items: [LineItem]
  }
`
