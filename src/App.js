import { NotFound } from "components/index";
import LoginPage from "features/auth/login/index";
import CourseList from "features/course";
import DashboardFeature from "features/dashboard/index";
import { PrivateLayout, PublicLayout } from "layout";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { isUserLoggedIn } from "utils/index";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUserLoggedIn() ? <Navigate to='/course' /> : <Navigate to='/login' />} />

        {/* Public Layout  */}
        <Route path="/login" element={<PublicLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        {/* Private Layout */}
        <Route path='/course' element={<PrivateLayout />}>
          <Route index element={<CourseList />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
