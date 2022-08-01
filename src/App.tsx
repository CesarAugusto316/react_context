import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { useTheme, useTodos } from './context';
import {
  Navbar, FormInput, TodosList, Spinner,
} from './components';


export const App: FC = () => {
  const { isLoaded } = useTodos();
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      <section className="section">
        <main className="main">
          <FormInput />
          {isLoaded
            ? <TodosList />
            : <Spinner />}
        </main>
      </section>
      <ToastContainer position="top-left" autoClose={1_100} theme={theme.light ? 'light' : 'dark'} />
    </>
  );
};
