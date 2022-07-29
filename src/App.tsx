import { FC } from 'react';
import { ThemeProvider, TodosProvider } from './context';
import { Navbar, FormInput, Todos } from './components';


export const App: FC = () => {
  return (
    <ThemeProvider>
      <TodosProvider>
        <Navbar />
        <section className="section">
          <main className="main">
            <FormInput />
            <Todos />
          </main>
        </section>
      </TodosProvider>
    </ThemeProvider>
  );
};
