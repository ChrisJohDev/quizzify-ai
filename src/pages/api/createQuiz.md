# Quizzify-AI API Documentation

## Create the Quiz API Endpoint

This API is responsible for creating a new quiz. It takes a request, formats a query string based on whether the quiz is a multiple-choice quiz, decodes the response data, and returns the formatted response.

### Handler: `/api/createQuiz`

This handler is responsible for processing the request and generating the quiz.

#### Parameters

- **Request (req)**: NextApiRequest - The incoming HTTP request containing any passed parameters or body content.
- **Response (res)**: NextApiResponse - The HTTP response that the server will send back to the client.

#### Process

1. The `handler` receives the incoming request.
2. The request body is stored in a variable called `body`.
3. A boolean variable `isMultiChoice` is defined, indicating whether the requested quiz is a multiple-choice quiz.
4. The `handler` creates a query string using either `createMultipleChoiceQueryString` or `createQueryString` function, based on whether the quiz is a multiple-choice quiz.
5. If the `MOCK_RESPONSE` environment variable is set and the quiz is not a multiple-choice quiz, the `handler`:
   - Retrieves mock data from `mockResponseApiData2`.
   - Decodes the mock data using `decodeResponseData` function.
   - Sends a 200 HTTP response containing the decoded mock data.
6. If the `MOCK_RESPONSE` environment variable is set and the quiz is a multiple-choice quiz, the `handler`:
   - Retrieves mock data from `mockResponseApiDataMultiChoice`.
   - Decodes the mock data using `decodeMultiChoiceResponseData` function.
   - Sends a 200 HTTP response containing the decoded mock data.
7. If the `MOCK_RESPONSE` environment variable is not set, the `handler`:
   - Sends a request to the OpenAI API, including the query string and other necessary parameters in the request body.
   - Decodes the response using either `decodeResponseData` or `decodeMultiChoiceResponseData` function.
   - Sends a 200 HTTP response containing the decoded response.
8. If an error occurs during this process, the `handler` logs the error and sends a 500 HTTP response containing the error.

#### Returns

The `handler` returns a JSON object containing the formatted quiz data.

