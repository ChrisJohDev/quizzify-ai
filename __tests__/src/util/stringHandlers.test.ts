import {createQueryString, createMultipleChoiceQueryString, decodeResponseData, decodeMultiChoiceResponseData} from '../../../src/util/stringHandlers';
import { MultiChoiceQueryData, QueryData } from '../../../src/util/types';

describe('\n*** ID: QAI:base-TC008 - stringHandler - createQueryString() ***', () => {
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
describe('\n*** ID: QAI:base-TC009 - stringHandler - createMultipleChoiceQueryString ***', () => {
  it('testing subject = Australian aborigines history', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of Australian aborigines history, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'Australian aborigines history', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = Geography', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of Geography, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'Geography', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = General knowledge', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing subject = ""', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: '', amount: 5, numbOfMultiChoice: 3 };
    const responseEmptyString: string = createMultipleChoiceQueryString(query);
    expect(responseEmptyString).toEqual(returnString);
  });

  // *** testing amount ***
  it('testing amount=10', () => {
    const returnString = "Create a multi-choice quiz with 10 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 10, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=2', () => {
    const returnString = "Create a multi-choice quiz with 2 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 2, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=17', () => {
    const returnString = "Create a multi-choice quiz with 17 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 17, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing amount limits ***
  it('testing amount=0', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 0, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=-1', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: -1, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing amount=100', () => {
    const returnString = "Create a multi-choice quiz with 25 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query: MultiChoiceQueryData = { subject: 'General knowledge', amount: 100, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing numbOfMultiChoice ***
  it('testing numbOfMultiChoice=3', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 3 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=4', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 4 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 4 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=5', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 5 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 5 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });

  // *** testing numbOfMultiChoice limits ***
  it('testing numbOfMultiChoice=0', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 0 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=2', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 3 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 2 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  it('testing numbOfMultiChoice=100', () => {
    const returnString = "Create a multi-choice quiz with 5 questions each with 5 choices on the subject of General knowledge, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]";
    const query:MultiChoiceQueryData = { subject: 'General knowledge', amount: 5, numbOfMultiChoice: 100 };
    const response: string = createMultipleChoiceQueryString(query);
    expect(response).toEqual(returnString);
  });
  
});


/* *** decodeResponseData *** */
describe('\n*** ID: QAI:base-TC010 - stringHandler - decodeResponseData ***', () => {
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

/* *** decodeMultiChoiceResponseData *** */
describe('\n*** ID: QAI:base-TC011 stringHandler - decodeMultiChoiceResponseData ***', () => {
  it('testing response with 5 questions', () => {
    const response = `Q: What is the capital of Australia? C: Canberra<||> Sydney<||> Melbourne A: Canberra
Q: What is the capital of New Zealand? C: Wellington<||> Auckland<||> Christchurch A: Wellington
Q: What is the capital of the United Kingdom? C: London<||> Manchester<||> Birmingham A: London
Q: What is the capital of the United States? C: Washington, D.C.<||> New York<||> Los Angeles A: Washington, D.C.
Q: What is the capital of Canada? C: Ottawa<||> Toronto<||> Montreal A: Ottawa`;
    const decodedResponse = decodeMultiChoiceResponseData(response);
    expect(decodedResponse.questions.questions.length).toEqual(5);
    expect(decodedResponse.questions.questions[0].question).toEqual('What is the capital of Australia?');
    expect(decodedResponse.questions.questions[0].answer).toEqual('Canberra');
    expect(decodedResponse.questions.questions[0].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[0].choices[0]).toEqual('Canberra');
    expect(decodedResponse.questions.questions[0].choices[1]).toEqual('Sydney');
    expect(decodedResponse.questions.questions[0].choices[2]).toEqual('Melbourne');
    expect(decodedResponse.questions.questions[1].question).toEqual('What is the capital of New Zealand?');
    expect(decodedResponse.questions.questions[1].answer).toEqual('Wellington');
    expect(decodedResponse.questions.questions[1].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[1].choices[0]).toEqual('Wellington');
    expect(decodedResponse.questions.questions[1].choices[1]).toEqual('Auckland');
    expect(decodedResponse.questions.questions[1].choices[2]).toEqual('Christchurch');
    expect(decodedResponse.questions.questions[2].question).toEqual('What is the capital of the United Kingdom?');
    expect(decodedResponse.questions.questions[2].answer).toEqual('London');
    expect(decodedResponse.questions.questions[2].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[2].choices[0]).toEqual('London');
    expect(decodedResponse.questions.questions[2].choices[1]).toEqual('Manchester');
    expect(decodedResponse.questions.questions[2].choices[2]).toEqual('Birmingham');
    expect(decodedResponse.questions.questions[3].question).toEqual('What is the capital of the United States?');
    expect(decodedResponse.questions.questions[3].answer).toEqual('Washington, D.C.');
    expect(decodedResponse.questions.questions[3].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[3].choices[0]).toEqual('Washington, D.C.');
    expect(decodedResponse.questions.questions[3].choices[1]).toEqual('New York');
    expect(decodedResponse.questions.questions[3].choices[2]).toEqual('Los Angeles');
    expect(decodedResponse.questions.questions[4].question).toEqual('What is the capital of Canada?');
    expect(decodedResponse.questions.questions[4].answer).toEqual('Ottawa');
    expect(decodedResponse.questions.questions[4].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[4].choices[0]).toEqual('Ottawa');
    expect(decodedResponse.questions.questions[4].choices[1]).toEqual('Toronto');
    expect(decodedResponse.questions.questions[4].choices[2]).toEqual('Montreal');
  });

  it('testing response with 3 questions', () => {
    const response = `Q: What is the capital of Australia? C: Canberra<||> Sydney<||> Melbourne A: Canberra
Q: What is the capital of New Zealand? C: Wellington<||> Auckland<||> Christchurch A: Wellington
Q: What is the capital of the United Kingdom? C: London<||> Manchester<||> Birmingham A: London`;
    const decodedResponse = decodeMultiChoiceResponseData(response);
    expect(decodedResponse.questions.questions.length).toEqual(3);
    expect(decodedResponse.questions.questions[0].question).toEqual('What is the capital of Australia?');
    expect(decodedResponse.questions.questions[0].answer).toEqual('Canberra');
    expect(decodedResponse.questions.questions[0].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[0].choices[0]).toEqual('Canberra');
    expect(decodedResponse.questions.questions[0].choices[1]).toEqual('Sydney');
    expect(decodedResponse.questions.questions[0].choices[2]).toEqual('Melbourne');
    expect(decodedResponse.questions.questions[1].question).toEqual('What is the capital of New Zealand?');
    expect(decodedResponse.questions.questions[1].answer).toEqual('Wellington');
    expect(decodedResponse.questions.questions[1].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[1].choices[0]).toEqual('Wellington');
    expect(decodedResponse.questions.questions[1].choices[1]).toEqual('Auckland');
    expect(decodedResponse.questions.questions[1].choices[2]).toEqual('Christchurch');
    expect(decodedResponse.questions.questions[2].question).toEqual('What is the capital of the United Kingdom?');
    expect(decodedResponse.questions.questions[2].answer).toEqual('London');
    expect(decodedResponse.questions.questions[2].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[2].choices[0]).toEqual('London');
    expect(decodedResponse.questions.questions[2].choices[1]).toEqual('Manchester');
    expect(decodedResponse.questions.questions[2].choices[2]).toEqual('Birmingham');
  });

  it('testing response with 2 questions and single letter/number choices and answers', () => {
    const response = `Q: Which is the largest number? C: 1<||> 9<||> 3 A: 9
Q: What is the the first letter in the alphabet? C: b<||> a<||> f A: a`;
    const decodedResponse = decodeMultiChoiceResponseData(response);
    expect(decodedResponse.questions.questions.length).toEqual(2);
    expect(decodedResponse.questions.questions[0].question).toEqual('Which is the largest number?');
    expect(decodedResponse.questions.questions[0].answer).toEqual('9');
    expect(decodedResponse.questions.questions[0].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[0].choices[0]).toEqual('1');
    expect(decodedResponse.questions.questions[0].choices[1]).toEqual('9');
    expect(decodedResponse.questions.questions[0].choices[2]).toEqual('3');
    expect(decodedResponse.questions.questions[1].question).toEqual('What is the the first letter in the alphabet?');
    expect(decodedResponse.questions.questions[1].answer).toEqual('a');
    expect(decodedResponse.questions.questions[1].choices.length).toEqual(3);
    expect(decodedResponse.questions.questions[1].choices[0]).toEqual('b');
    expect(decodedResponse.questions.questions[1].choices[1]).toEqual('a');
    expect(decodedResponse.questions.questions[1].choices[2]).toEqual('f');
  });
});
