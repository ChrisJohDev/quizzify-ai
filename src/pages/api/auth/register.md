# Quizzify-AI Project - Register API endpoint

The `Register API` endpoint facilitates new user registration for the `Quizzify-AI` application. The module is authored by Chris Johannesson and is written in TypeScript.

## Send Verification Email

The function `sendVerificationEmail` is responsible for sending a verification email to the newly registered user. It takes the user's email, a unique identifier (guid), a verification token, the request's origin, and the path for the email verification URL.

This function uses SendGrid's API to send an email containing a URL that the user must visit to verify their email. The URL is constructed using the request origin, path, and the verification token and guid.

## Register Handler

The `handler` function is the main logic for registering a new user. It connects to the MongoDB database, extracts the necessary information from the request body, and verifies the password and confirmed password match.

It then checks if the email and username provided already exist in the database. If either exists, it returns an error. This check is currently commented out in the provided code.

If the checks pass, a new user is created using the provided details, and a salted hash of the password is stored in the database instead of the plaintext password. The user is also given a unique identifier (guid), and a verification token is created for them.

The new user is then saved to the database. If the user is saved successfully, a verification email is sent to them, and the API responds with a 201 status and some JSON data. If the user save fails, it throws an error.

## Export Statement

Finally, the file exports the `handler` function, which can be used as an API endpoint in the Next.js application to handle new user registrations.

This module provides a secure way of registering new users, sending verification emails, and storing user data in a MongoDB database. It also provides meaningful error messages if something goes wrong during the registration process.
