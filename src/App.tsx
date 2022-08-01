import { FC } from 'react';
import { ThemeProvider, useTodos } from './context';
import {
  Navbar, FormInput, TodosList, Spinner,
} from './components';


export const App: FC = () => {
  const { isLoaded } = useTodos();

  return (
    <ThemeProvider>
      <Navbar />
      <section className="section">
        <main className="main">
          <FormInput />
          {isLoaded
            ? <TodosList />
            : <Spinner />}
        </main>
      </section>
    </ThemeProvider>
  );
};
