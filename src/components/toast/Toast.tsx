import { FC } from 'react';
import './toast.css';


interface ToastProps {
  message: string,
  title?: string,
  type: 'toast--sucess' | 'toast--error' | 'toast--info'
}

export const Toast: FC<ToastProps> = ({ title, message, type }) => {
  return (
    <div className="toast-container">
      <h3 className="toast__title">{title}</h3>
      <p className={`${type} toast`}>{message}</p>
    </div>
  );
};

Toast.defaultProps = {
  title: '',
};
