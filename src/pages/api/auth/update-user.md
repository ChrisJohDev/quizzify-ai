# Quizzify-AI Project - Update User Data API endpoint

The `Update User Data API` endpoint allows for the modification of user data within the `Quizzify-AI` application. The module is authored by Chris Johannesson and is implemented in TypeScript.

## Update User Handler

The `handler` function manages the logic for updating user data. It establishes a connection to the MongoDB database, extracts the required information from the request body, and verifies that the request method is 'POST'.

Afterwards, the function checks if the user exists in the database. If the user does not exist or is not verified, or if the user's email in the request does not match the email in the database, an error is thrown. This is a temporary solution until the email verification process is implemented for email changes.

Then, the user's first name, last name, email, and username are extracted from the request body. These details are used to create a payload, which is used to update the user in the database.

The user's details in the database are then updated with the new details from the payload. If the update is successful, the API responds with a 204 status and ends the response. If the update fails, an error message is logged and the API responds with a 500 status and a 'Server error.' message.

Please note that an email verification process for email changes will be implemented in future versions.

## Export Statement

Finally, the `handler` function is exported. This function is used as an API endpoint in the Next.js application to handle user data updates.

This module offers a secure method for updating user data in the MongoDB database, providing clear error messages if anything goes wrong during the process.
