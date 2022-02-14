import Router from './router/Router';
import { PokeContextProvider } from './context/PokeContext';


export default function App() {
  return (
    <PokeContextProvider>
      <Router />
    </PokeContextProvider>
  );
}

