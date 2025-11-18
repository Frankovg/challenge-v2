This is a mocked Apollo server.

You can start it by running `yarn dev`

and running this query on it:

```ts
query line_items {
  line_items {
    id
    quantity
    sku
    location
  }
}
```

You can also check the packing mutation:

```ts
mutation pack_items($PackItemsInput: PackItemsInput!) {
  pack_items(data: $PackItemsInput) {
    packages {
      id
      line_items {
        id
        quantity
        sku
        location
      }
    }
  }
}
```
