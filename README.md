### SPA Color Catalog

This project is a Single Page Application (SPA) developed as part of a coding task. The goal of the task was to implement an application with one view using React and TypeScript, displaying a paginated list of products retrieved from an API endpoint. Additionally, the application should feature filtering by product ID, a modal displaying detailed information about each product, and pagination navigation.

#### Features
- **Product List**: Displays a paginated list of products, each with properties like ID, name, and year.
- **Filtering**: Allows users to filter results by product ID using a text input at the top of the view.
- **Modal**: Clicking on a product row opens a modal displaying detailed information about the product.
- **Pagination**: Provides navigation between pages with "next" and "previous" arrows.
- **Error Handling**: Informs users about API errors, such as 4XX or 5XX responses.
- **Debouncing**: Utilizes debouncing to improve performance when filtering results.

#### Technology Stack
- **Frontend Framework**: React
- **Type System**: TypeScript
- **Styling Library**: Material-UI
- **State Management**: React Context API 
- **Testing Framework**: Jest

#### API Endpoint
The application fetches product data from the following API endpoint:
`https://reqres.in/api/products`

#### Installation and Setup
1. Ensure you have Node.js installed (version 20.11.0 or later).
2. Clone the repository from GitHub.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Run `npm start` to start the application.

#### Testing
The project includes unit tests implemented using Jest. To run the tests, execute `npx jest` in the project directory.


#### Additional Notes
- Pagination and filtering are performed within the API, not on the frontend side.
- Pagination and filtering parameters are reflected in the URL, allowing users to copy and share specific views.


#### Deployment 
- Deployed Version: [[Link to deployed version](https://spa-colors.vercel.app/page=1)https://spa-colors.vercel.app/page=1](#)

