/**
 * Project Name: Quizzify-AI
 *
 * Error page.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import { IInputErrors } from '@/util/types';
import { ReactElement } from 'react';

/**
 * Error page.
 *
 * @param {IInputErrors } errors - The errors.
 * @returns {ReactElement} - The error page.
 */
const Error = ({ errors }: { errors: IInputErrors }): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">
        {errors.message}
      </h1>
      <p className="text-xl font-semibold text-red-500">
        {errors.error}
      </p>
    </div>
  );
};

export default Error;
