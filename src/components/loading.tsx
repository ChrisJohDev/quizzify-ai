/**
 * Project Name: Quizzify-AI
 * 
 * Loading component
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import { ReactElement } from "react";
import Logo from "./logo";
import styles from '@/styles/loading.module.css';

/**
 * LoadingProps interface.
 *
 * @interface LoadingProps
 */
interface LoadingProps {
  text: string;
}

/**
 * Loading component
 *
 * @param {LoadingProps} { text }
 * @return {ReactElement} 
 */
const Loading = ({ text }: LoadingProps): ReactElement => {
  return (
    <div className="flex flex-col items-center">
      <p>{text}</p>
      <div className={`flex justify-center w-100 spinner-border text-primary m-4 ${styles.loader}`} role="status" >
        <Logo width={60} src={''} alt={''} />
      </div>
    </div>
  );
}

export default Loading;