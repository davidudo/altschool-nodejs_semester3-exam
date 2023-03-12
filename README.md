# Restaurant ChatBot

This is a chatbot application built to assist customers in placing orders for their preferred meals in a restaurant.

The chatbot interface is designed to look and function like a chat interface. The application doesn't require authentication, but user sessions will be stored based on their devices.

## Features

1. A user can select different options from the chatbot interface
2. When a customer lands on the chatbot page, the bot should send these options to the customer:
   - Select 1 to Place an order
   - Select 99 to checkout order
   - Select 98 to see order history
   - Select 97 to see current order
   - Select 0 to cancel order

3. When a customer selects `1`, the bot should return a list of items from the restaurant. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.
4. When a customer selects "99", the bot should respond with "order placed" and if none the bot should respond with "No order to place". The customer should also see an option to place a new order.
5. When a customer selects "98", the bot should be able to return all placed orders.
6. When a customer selects "97", the bot should be able to return the current order.
7. When a customer selects "0", the bot should cancel the order if there is any.

## Installation

1. Clone the repository to your local machine
2. Install the required dependencies by running the command npm install
3. Run the command npm start to start the application

## Tech Stack

The application was built using the following technologies:

- Node.js
- TypeScript
- Socket.io
- Contributing

If you find any issues with the application or would like to contribute, please feel free to submit a pull request or raise an issue.

## License

This application is licensed under the MIT License.