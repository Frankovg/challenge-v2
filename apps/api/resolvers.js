// Queries
import line_items from './queries/line_items.js'

// Mutations
import pack_items from './mutations/pack_items.js'

export default {
  Query: {
    line_items,
  },
  Mutation: {
    pack_items,
  },
}
