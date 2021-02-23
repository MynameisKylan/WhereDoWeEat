# WhereDoWeEat

[Live](https://fast-shelf-07613.herokuapp.com)

An app made to help indecisive groups decide where to eat. Search and restaurant info powered by Yelp's [Fusion API](https://www.yelp.com/developers/documentation/v3).

Add friends, rate restaurants, and create a party to get personalized recommendations based on party members' tastes.

Made with React backed by a Rails API.

Bootstrapped with `rails new --webpack-react`

A lot of new topics were explored during development:
- Using Rails API only mode
- Configuring devise to respond with json
- Sending AJAX requests with axios
- Implementing token based authentication
- Using serializers to selectively obtain information from database
- Using Json Web Tokens for secure client side authentication storage
- Configuring Rails to use React as the view layer
- Routing and redirecting in React for a single page application
- Authenticating routes in React
- Building GraphQL queries
- Deploying to heroku as a single application using multiple buildpacks
