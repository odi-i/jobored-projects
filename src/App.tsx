import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout/Layout';
import Search from './routes/Search/Search';
import FullVacancy from './components/FullVacancy/FullVacancy';
import { SkeletonTheme } from 'react-loading-skeleton';
import Favorites from './routes/Favorites/Favorites';
import NotFound from './routes/NotFound/NotFound';

function App() {
  return (
    <>
      <SkeletonTheme>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" Component={Search}></Route>
            <Route path="/vacancy/:id" Component={FullVacancy}></Route>
            <Route path="/favorites" Component={Favorites}></Route>
            <Route path="*" Component={NotFound}></Route>
          </Route>
        </Routes>
      </SkeletonTheme>
    </>
  );
}

export default App;
