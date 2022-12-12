import { setHeader } from "api/axiosService";
import { NotFound } from "components/index";
import LoginPage from "features/auth/login/index";
import RegisterPage from "features/auth/register";
import BlogPage from "features/blog";
import CartPage from "features/cart";
import CheckoutPage from "features/cart/pages/checkout";
import CourseList from "features/course";
import DetailCourse from "features/course/pages/detail";
import CourseSearch from "features/course/pages/search";
import HomePage from "features/home";
import { PrivateLayout, PublicLayout } from "layout";
import HomeLayout from "layout/home";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { isUserLoggedIn, getToken } from "utils";

function App() {
  useEffect(() => {
    if (isUserLoggedIn()) {
      setHeader('Authorization', `Bearer ${getToken()}`);
      setHeader("Access-Control-Allow-Origin", "*");
      setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={isUserLoggedIn() ? <Navigate to='/course' /> : <Navigate to='/login' />} /> */}
        {/* Home Layout */}
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/category/:idCategory' element={<HomeLayout />}>
          <Route index element={<BlogPage />} />
          <Route path="blog/:idBlog" element={<BlogPage />} />
        </Route>

        {/* Public Layout  */}
        <Route path="/login" element={<PublicLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<PublicLayout />}>
          <Route index element={<RegisterPage />} />
        </Route>

        {/* Private Layout */}
        <Route path='/course' element={<PrivateLayout />}>
          <Route index element={<CourseList />} />
          <Route path=':id' element={<DetailCourse />} />
          <Route path='search' element={<CourseSearch />} />
        </Route>
        <Route path="/cart" element={<PrivateLayout />}>
          <Route index element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
