import getQueryResponse, {getQueryResponseMockup} from '../../../src/backend/getQueryResponse';
import { QueryData, QueryResponse } from '../../../src/util/types';

// describe('getQueryResponse', () => {
//   it('should return a QueryResponse object', async () => {
//     const queryData: QueryData = { subject: 'General knowledge', amount: 10 };
//     const queryResponse: QueryResponse = await getQueryResponse(queryData);
//     expect(queryResponse).toHaveProperty('questions');
//     expect(queryResponse).toHaveProperty('answers');
//   });
// });

describe('getQueryResponseMockup', () => {
  it('should return a QueryResponse object', async () => {
    const queryResponse: QueryResponse = await getQueryResponseMockup();
    expect(queryResponse).toHaveProperty('questions');
    expect(queryResponse).toHaveProperty('answers');
  });
});
