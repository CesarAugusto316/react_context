import { FC } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import './spinner.css';


export const Spinner: FC = () => {
  return (
    <div className="spinner-container">
      <CgSpinnerTwo className="spinner" />
    </div>
  );
};
