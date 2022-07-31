import { FC } from 'react';
import { ThemeProvider, useTodos } from './context';
import {
  Navbar, FormInput, Todos, Spinner,
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
            ? <Todos />
            : <Spinner />}
        </main>
      </section>
    </ThemeProvider>
  );
};
