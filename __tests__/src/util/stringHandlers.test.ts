import {createQueryString, createMultipleChoiceQueryString, decodeResponseData, decodeMultiChoiceResponseData} from '../../../src/util/stringHandlers';
import { MultiChoiceQueryData, QueryData } from '../../../src/util/types';

describe('\n*** stringHandler - createQueryString() ***', () => {
  it('testing subject = Australian aborigines history', () => {
    const returnString = 'Create a quiz with 5 questions and answers on the subject of Australian aborigines history, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'Australian aborigines history', amount: 5 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = Geography', () => {
    const returnString = 'Create a quiz with 5 questions and answers on the subject of Geography, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'Geography', amount: 5 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = ""', () => {
    const returnString = 'Create a quiz with 5 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: '', amount: 5 };
    const responseEmptyString: string = createQueryString(query);
    expect(responseEmptyString).toEqual(returnString);
  });

  // *** testing amount ***
  it('testing amount=10', () => {
    const returnString = 'Create a quiz with 10 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: 10 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=2', () => {
    const returnString = 'Create a quiz with 2 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: 2 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=16', () => {
    const returnString = 'Create a quiz with 16 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: 16 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing amount limits ***
  it('testing amount=0', () => {
    const returnString = 'Create a quiz with 5 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: 0 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=-1', () => {
    const returnString = 'Create a quiz with 5 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: -1 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=100', () => {
    const returnString = 'Create a quiz with 25 questions and answers on the subject of General knowledge, no numbering. Format: [Q: question,  A: answer]';
    const query: QueryData = { subject: 'General knowledge', amount: 100 };
    const response: string = createQueryString(query);
    expect(response).toEqual(returnString);
  });
});

/* *** createMultipleChoiceQueryString *** */
describe('\n*** stringHandler - createMultipleChoiceQueryString ***', () => {
  it('testing subject = Australian aborigines history', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of Australian aborigines history, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'Australian aborigines history', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = Geography', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of Geography, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'Geography', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = General knowledge', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = ""', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: '', amount: 5, numbOfMultiChoice: 3 };
    const responseEmptyString: string = createMultipleChoiceQueryString(query);
    expect(responseEmptyString).toEqual(returnString);
  });

  // *** testing amount ***
  it('testing amount=10', () => {
    const returnString = "Create a multi-choice quiz with 10 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 10, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=2', () => {
    const returnString = "Create a multi-choice quiz with 2 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 2, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=17', () => {
    const returnString = "Create a multi-choice quiz with 17 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 17, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing amount limits ***
  it('testing amount=0', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 0, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=-1', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: -1, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=100', () => {
    const returnString = "Create a multi-choice quiz with 25 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: 100, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing numbOfMultiChoice ***
  it('testing numbOfMultiChoice=3', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=4', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 4 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 4 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=5', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 5 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 5 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing numbOfMultiChoice limits ***
  it('testing numbOfMultiChoice=0', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 0 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=2', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 2 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=100', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 5 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 100 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  
});


/* *** decodeResponseData *** */
describe('\n*** stringHandler - decodeResponseData ***', () => {
  it('testing response with 5 questions', () => {
    const response = `Q: What is the capital of Australia? A: Canberra
Q: What is the capital of New Zealand? A: Wellington
Q: What is the capital of the United Kingdom? A: London
Q: What is the capital of the United States? A: Washington, D.C.
Q: What is the capital of Canada? A: Ottawa`;
    const decodedResponse = decodeResponseData(response);
    expect(decodedResponse.questions.questions.length).toEqual(5);
    expect(decodedResponse.questions.questions[0].question).toEqual('What is the capital of Australia?');
    expect(decodedResponse.questions.questions[0].answer).toEqual('Canberra');
    expect(decodedResponse.questions.questions[1].question).toEqual('What is the capital of New Zealand?');
    expect(decodedResponse.questions.questions[1].answer).toEqual('Wellington');
    expect(decodedResponse.questions.questions[2].question).toEqual('What is the capital of the United Kingdom?');
    expect(decodedResponse.questions.questions[2].answer).toEqual('London');
    expect(decodedResponse.questions.questions[3].question).toEqual('What is the capital of the United States?');
    expect(decodedResponse.questions.questions[3].answer).toEqual('Washington, D.C.');
    expect(decodedResponse.questions.questions[4].question).toEqual('What is the capital of Canada?');
    expect(decodedResponse.questions.questions[4].answer).toEqual('Ottawa');
  });
  it('testing response with 3 questions', () => {
    const response = `q: What is the capital of Australia? a: Canberra q: What is the capital of New Zealand? a: Wellington q: What is the capital of the United Kingdom? a: London`;
    const decodedResponse = decodeResponseData(response);
    expect(decodedResponse.questions.questions.length).toEqual(3);
    expect(decodedResponse.questions.questions[0].question).toEqual('What is the capital of Australia?');
    expect(decodedResponse.questions.questions[0].answer).toEqual('Canberra');
    expect(decodedResponse.questions.questions[1].question).toEqual('What is the capital of New Zealand?');
    expect(decodedResponse.questions.questions[1].answer).toEqual('Wellington');
    expect(decodedResponse.questions.questions[2].question).toEqual('What is the capital of the United Kingdom?');
    expect(decodedResponse.questions.questions[2].answer).toEqual('London');
  });
});