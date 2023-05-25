import { IInputErrors } from "@/util/types";  

const Error = ({ errors }: { errors: IInputErrors }) => {
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