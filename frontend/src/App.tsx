import Header from './components/Header';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '1rem' }}>
        <HomePage />
      </main>
    </div>
  );
}
