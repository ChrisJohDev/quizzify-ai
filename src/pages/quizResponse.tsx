import { FC, Suspense, useEffect, useState } from "react";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";
import { GetServerSideProps } from "next";
import * as querystring from "querystring";
import getQueryResponse from "@/backend/getQueryResponse";
import Questions from "@/components/quizQuestions";
import styles from '@/styles/quizResponse.module.css'

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
    <main className={`${styles.wrapper}`}>
      <h1>Query Response</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Questions queryResponse = { queryResponse } />
      </Suspense>
    </main>
  );
};

export default QuizResponse;