# Quizzify-AI Project - Authorization API

The `Authorization API` module provides the main functionality for user authorization in the `Quizzify-AI` application. It's written in TypeScript and uses `NextAuth.js` for handling server-side authentication, `bcrypt` for password hashing and checking, and `mongoose` for interfacing with the MongoDB database.

## Authorization Options Configuration

`authOptions` is an object that provides configuration options for `NextAuth`. This includes the custom pages for handling different stages of authentication, the providers for the authentication, and callbacks for various actions during the authentication process.

## Providers Configuration

`CredentialsProvider` is the only provider configured in this file, and is used to authenticate a user with an email and password. The authorization process checks the database for a user with the provided email, then checks if the provided password matches the hashed password for that user. If both checks pass, a public-facing version of the user object is returned, otherwise, it throws an error.

## Callbacks Configuration

- `jwt` callback takes a token and a user object and attaches the user object to the token.
- `session` callback takes a session and a token and attaches the user object from the token to the session.
- `redirect` callback handles redirection after authentication is successful. Currently, it redirects the user to the root URL.
- `signIn` callback provides logs for debugging purposes during the sign-in process. Currently, it simply returns `true` indicating a successful sign-in attempt.

## Export Statements

Finally, the file exports the `NextAuth` function with the defined `authOptions` object and also exports `authOptions` for potential use in other modules.

This module is designed to work with a MongoDB database where the user data is stored and provides the necessary tools for user authentication in the Quizzify-AI application.
