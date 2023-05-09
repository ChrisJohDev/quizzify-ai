import { FC, Suspense, useEffect, useState } from "react";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";
import { GetServerSideProps } from "next";
import * as querystring from "querystring";
import getQueryResponse from "@/backend/getQueryResponse";
import Questions from "@/components/questions";

const queryData = {
  subject: '',
  amount: -1
}

export type QueryData = {
  // props: {
    subject: string | any,
    amount: number | any
  // }
}

export type QueryResponse = {
  questions: Array<string>,
  answers: string,
}

export interface Props {
  queryResponse: QueryResponse
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const req = context.req;
  const body: any = await getRequestBody(req);
  console.log('\n*** [getServerSideProps] body:', body);
  const {subject, amount} = body;
  console.log('\n*** [getServerSideProps] subject, amount:', subject, amount);
  const queryData: QueryData = { subject: subject ? subject : '', amount: amount ? amount : -1 };

  console.log('\n*** [getServerSideProps] queryData:', queryData);

  const queryResponse = await getQueryResponse(queryData);

  console.log('\n*** [getServerSideProps] response:', queryResponse);

  return {
    props: {
      queryResponse
    }
  };
};

async function getRequestBody(req: any) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        const body = querystring.parse(data);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', (error: any) => {
      reject(error);
    });
  });
}

const QuizResponse = ({queryResponse}: Props) => {
  console.log('\n*** [QueryResponse] queryData:', queryResponse);

  return (
    <>
      <h1>Query Response</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Questions queryResponse = { queryResponse } />
      </Suspense>
    </>
  );
};

// export async function getServerSideProps(context: any): Promise<{props: QueryData}> {
//   const req: NextRequest = context.req;
//   const query: Promise<any> = req.json();
//   const resolvedQuery: any = await query;
//   const data: QueryData = {
//     subject: resolvedQuery.subject,
//     amount: resolvedQuery.amount
//   }
//   console.log('\n*** [getServerSideProps] data:', data);
//   return {
//     props: data
//   }
// }

/*
export const getServerSideProps = async ({ req, res }) => {
  // const req: NextRequest = context.req;
  // const res: NextResponse = context.res;


  if (req.method === "POST") {
    console.log('\n*** [getServerSideProps] req.method:', req.method);
    await getBody(req, res);
    console.log('\n*** [getServerSideProps] req.body:', req.body);
  }
  const data = await req.body;

  console.log('\n*** [getServerSideProps] data:', data)


  // const streamPromise = new Promise((resolve, reject) => {
  //   let body = '';
  //   req.on('data', (chunk: any) => {
  //     body += chunk.toString();
  //   });
  //   req.on('end', async () => {
  //     const postData = JSON.parse(body);
  //     resolve(postData);
  //   });
  // })

  // const tmp: any = await Promise.all([streamPromise]);

  // console.log('\n*** [getServerSideProps] streamPromise:', tmp);
  // const body:IQueryData = {subject: req.body.subject, amount: req.body.amount};
  // const response = await createQuery(props);

  queryData.subject = await data.subject;
  queryData.amount = await data.amount;
  return { props: { subject: data.subject, amount: data.amount } };
};
*/

export default QuizResponse;
