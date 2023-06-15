# Frontend coding challenge

### Scripts

- `yarn start` - start app
- `yarn test` - run all tests with codecov
- `yarn codegen` - generate types from graphql api

# Overview

### Architecture

This is React application (based on create-react-app configuration) interacts with Graphql,
using [Apollo client](https://www.apollographql.com/apollo-client), have styled-components and wouter libraries, typed with
typescript and tested with jest.

This app is build in align with some principles of "Components based architecture"  and "
Screaming Architecture" in
segregating the code according to subdomains and bounded contexts. Also, there is adapter layer. So files organized by
features, so in src folder we have the following structure:

```
- adapters
- api-schema
- config
- features
- pages
- queries
- index.tsx
```

So domain layer of application are in features and pages folders. 
Pages are responsible for rendering the user interface and handling user interactions.
Features encapsulate related functionality or business domains within application. They contain the core business logic
and designed to be reusable and independent of any specific page or UI concerns.

### Technical decisions:

- First of all I decided to use GraphQL api for a few reasons. With Graphql I would be able to easily follow types of
  the api, with codegen for example, and to use these entities in my application. Also, it would be a bit faster to
  develop such application on client side because fewer requirements to state managing and data flow organisations in
  the future.
  Despite there could be more reasons (need of flexible and efficient data fetching, multiple
  front-ends and so on) to use Graphql, I considered that it is enough to do it as it is.

- I decided to store favorites planets id's in localStorage, but I moved it to adapter layer, so in future we could change in to something with keeping interface.

- I used [graphql codegen](https://the-guild.dev/graphql/codegen) to generate types from the api to use it for
  developing and typing.

- So there are some libraries that could use for graphql interactions: apollo-client, urql, rellay. I did some
  investigation on urql, but I decided to use apollo-client for few reasons: it has built in state managing and advanced caching, it
  has much larger ecosystem, and it's more reliable because of larger community.

- I decided to use [wouter](https://github.com/molefrog/wouter) instead of standard react-router. It provides simple
  hook-based api, it's very lightweight (1.36KB vs 16KB for react-router) and it's flexible enough to scale nicely in
  the future.

### Work sequence

Work sequence during making this project was following:
- Analyzed requirements
- Made some evaluations and plan of making this app
- Made a draft of key points of architecture and main libs
- Investigated this draft and learned about alternatives
- Made draft for README
- Made final decisions about architecture and structuring app and made more draft for README
- Created app with create-react-app
- Configured an application
- Made folder structure
- Added media files (svg), that I was needed
- Generated Api types using codegen
- Added routing and Drafts of a pages
- Implemented ui components and draft of the features
- Added feature logic with tests of this logic
- Analyzed code and refactored where it needed
- Wrote README based on drafts

### Testing
Project contains only tests for custom hooks and adapters as it contains most logic of the app. It is possible add snapshots or test of some components but in this case I decided that is not needed.
I used coverage as well to see what part of code could be missed.
Although I didn't use test first approach here, it's completely possible to use it here. 
In scope of future needs and additional requirements it's could be useful to add some e2e test with cypress for example and set up some CI for it.

### Alternatives
So there could be some alternative for architecture. I decided to go with current because its simple and descriptive. Also, ["Clean architecture"](https://github.com/eduardomoroni/react-clean-architecture) could be a good solution. 
For more complex applications with lots of business needs we could apply DDD approach and Hexagonal architecture.

Most obvious alternative is to use REST api instead of GraphQL. In this case we would need to decide what state manager would be nice:
 - Mobx - good enough for such applications, it's not requite a lot of boilerplate and is easy to use. But in case of scaling up application could be a big minus, because number of bugs could grow a lot with size of application and needs of optimization. 
 - Redux - could be not perfect solution in the beginning, a lot of boilerplate, but quite flexible to scale. We could add redux-thunk if we need simple async actions. Or if we would need complex data flow could add redux-sagas and organize any data flow really nice.
 - There are some more alternative that are less popular could be nice (like Zustand).

Also, we can consider alternatives for apollo-client: 
- I was thinking a lot about [urql](https://github.com/urql-graphql/urql). It's quite lightweight and flexible to scale. Could be good fit for this project, but it ideally requires some additional state manager, for example with redux.


### How to improve
There are few point that could be improved:

- Would be nice to make layout responsible, ideally starting using mobile first approach. In this case we would need to add some custom responsive grid based on the design needs or use some lib. 
- To keep track of our ui elements we could use storybook, it would also improve workflow with designer, and it would be easier for developer to check what ui components could be used or extended. 
- As project grows we could use some code splitting, by pages for example, to optimize bundle size and loading speed.
- It could be nice to think about optimizing request for favorites planets, with batch maybe, as it uses now allPlanet request and then filters it out.
- Make table component not dependent on entity fields instead of PlanetList component.
- Adding pagination or infinite scrolling for planets list, it could optimize network usage


### Scaling
There are many possibilities to scale app. I think main question would about how we manage state. 

Apollo client manage local state alongside remotely fetched state. So we can define the logic that apollo  uses to fetch and populate that data. We can include both local and remotely fetched fields in the same query.
Also Apollo have Reactive variables that aren't stored in cache of apollo.

To use local fields in our queries we could extend graphql schema by with client schema by .graphql files and ``directive @client on FIELD`` and adding path in codegen.yml, then we would need add a layer for resolvers of these fields and use them in queries with @client directive.

With this mechanism we could manage our state effectively, mostly through apollo cache. We could use [operations with cache](https://www.apollographql.com/docs/react/caching/cache-interaction) as well.

But as project grow I think scaling such application coulb quite challenging because of apollo-client limitation, to improve it we could consider combining apollo with some state managing and separate fetching data logic from local state management.

Architecture is not perfect for scaling app much, I think more optimal solution for scalable app could be used "Clean architecture", but for applications with similar requirements it won't be a problem to keep things as simple as it is.

Folder structure could be scaled as well with adding new layers. For example adapter layer could be organized with some Hexagonal approaches and As said before queries could be scaled and contain local variables and resolvers logic.

### Feedback about challenge

I think explaining architecture decisions is very cool point of this coding challenge I liked it as it helped me to reflect on my workflow and decision-making. Also, I liked that this challenge is close to real tasks at work. Overall challenge took a little bit more time than I expected. Maybe I could take a little more time for investigation, docs and architecture design.