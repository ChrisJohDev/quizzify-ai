import Logo from "./logo";
import styles from '@/styles/loading.module.css';

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
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