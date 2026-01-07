import { Layout } from './components/Layout';
import { ProductList } from './features/products/ProductList';
import './App.css';

function App() {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
}

export default App;