# UI challenge

Here at ShipHero, one of the core parts of our business is packing products to send them to final customers.

The challenge goal is to build a system that should be able, given a hypothetical API call that will retrieve an array of products data, let the user pack those products.

## Project structure

The project has been divided into two subprojects (`apps/`). They are aggregated together in a single repository with the usage of Yarn workspaces.

- `apps/api` contains the project with the mocked API. **Please, do not make changes there.** You can treat this subproject as a black box;
- `apps/frontend` stores the actual frontend project that needs to be updated with your solution for the tasks mentioned below.

## Your tasks

Some of the functional requirements of the system are the following ones:

- You should start by listing all unpacked items at the left of a split view. Use the provided mocked API to get the list of items (see below in the Available built-in commands section to know more).
- In the right section, you should view the packaged items, organized in packages.
- You should be able to create new packages and also to remove an empty package.
- You can create multiple packages and pack items inside those packages (users can decide to put all items in a single package, or create multiple packages).
- You can pack one item into the currently selected package by clicking on it from the list.
- You also can pack by receiving a barcode scan (very fast keyboard input sequence that ends with an Enter key) with the item's SKU.
- When an item is packed you can change its quantity by adding more items or removing (unpacking).
- When all items are packed (either in one or multiple packages), show a "Ship" button. When the user clicks that button, use the mutation that is also provided in the mocked API and send to the server the packages information with what is being shipped (what products in what packages).

You can refactor, redesign the UI or rewrite anything you want to show us the way you like to code, do HTML, styling.

The project is ready to run so that you don't have to worry about setting up all the different libraries and you can start coding right away. Just remember to run `yarn` at the root of the repository to fetch all the required dependencies before starting.

## How to communicate with us?

We're gonna invite you to our Slack channel as a guest. In this channel, all the people involved in the project will be present, you can ask your questions or anything related to the process in there and we'll answer as soon as possible.

**Feel free to ask as much as you need!**

## How to deliver your solution?

Please open a PR with your changes so we can review it and give you some feedback if there's place for it, your PR must contain:

- A detailed description of your solution and design decisions you made.
- The code with your solution.
- Writing tests for your solution is mandatory. The solution will not be reviewed until basic scenarios are covered.

## What if you're running out of time?

If you think you will run out of time to implement all tasks, prioritize writing tests for the features you already implement rather than adding new features.

## Available built-in commands

**Run the mocked API**

```bash
# from ./apps/api
yarn dev
```

**Run the UI in dev mode**

```bash
# from ./apps/frontend
yarn dev
```

**Build the Nextjs app**

```bash
# from ./apps/frontend
yarn build
```

**Run the UI and the mocked API at the same time**

```bash
# from root directory
yarn dev
```

**Run the tests**

Coverage report will be available under `coverage` folder.

```bash
# from root directory
yarn test
```

**Run ESlint**

Make sure the output is clean.

```bash
# from root directory
yarn lint
```
