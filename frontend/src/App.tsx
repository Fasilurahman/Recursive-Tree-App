import { Suspense } from 'react';
import { Toaster } from 'sonner';
import HomePage from './pages/Home';
import Loader from './components/Loader';
import './App.css';

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fffff', 
            color: '#15803d', 

          },
        }}
      />
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
    </>
  );
};

export default App;