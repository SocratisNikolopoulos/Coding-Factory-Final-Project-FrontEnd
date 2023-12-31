# Coding Factory Final Project FrontEnd

## Overview
This project represents a comprehensive application that combines both frontend and backend components to manage user authentication, notes, and user-related data. It utilizes React for the frontend, Redux Toolkit for state management, and integrates with a backend API for data handling. The codebase features custom hooks, components for user management, note editing, and various functionalities related to user authentication.

## Folder Structure
The project structure is organized as follows:

- **`hooks`**: Contains custom React hooks responsible for managing user authentication details, localStorage persistence, and document title updates.
- **`public`**: Houses the HTML file (`index.html`) and related assets like icons and manifest files.
- **`components`**: Holds various React components responsible for user management, including adding, editing, and deleting users, managing notes, and displaying user information.
- **`features`**: Contains feature-specific modules responsible for integrating with the Redux store, handling API calls, managing state for user authentication, notes, and user-related data.

## Custom Hooks

### `useAuth`
This hook manages user authentication details by retrieving information from the Redux store and decoding JWT tokens. It returns an object containing user details such as username, roles, status (Employee, Manager, Admin), and booleans indicating manager and admin privileges.

### `usePersist`
Manages persistence in localStorage by handling a boolean value, enabling persistence across sessions.

### `useTitle`
Handles the document title, updating it and restoring the previous title when the component unmounts.

## Components

### `NewUserForm`
Represents a form for creating a new user, utilizing `useAddNewUserMutation` from `usersApiSlice` to add a new user, performing validation on username and password inputs, and allowing role selection.

### `EditUser`
Fetches and displays a form to edit a user based on the provided ID in the URL params. Utilizes `useGetUsersQuery` to fetch user data and renders `EditUserForm` for editing. Displays a loading spinner while user data is being fetched.

### `EditUserForm`
Represents a form for editing user details, allowing users to update username, password, roles, and activation status of an existing user. Utilizes mutation hooks from `usersApiSlice` for updating and deleting users.

### `User`
Displays user information in a table row format, fetching user data using `useGetUsersQuery` from `usersApiSlice` based on the provided userId.

### `UsersList`
Displays a list of users fetched from the API, rendering a table displaying usernames, roles, and edit options. Utilizes `useGetUsersQuery` from `usersApiSlice` for fetching users' data.

## API Integration
The frontend interacts with the backend API through Redux Toolkit's `createEntityAdapter` and API slices (`usersApiSlice`, `notesApiSlice`). It defines endpoints for getting, adding, updating, and deleting users and notes. Additionally, it manages normalized entity state and provides selectors for retrieving specific data from the Redux store.

## Usage
To set up the project locally:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the application with `npm start`.
4. Navigate to the specified URL to view the application.

## Contributing
Contributions to the project are welcome! Feel free to report issues, suggest improvements, or submit pull requests following our guidelines outlined in CONTRIBUTING.md.

## License
This project is licensed under the [License Name] - include your licensing information.
