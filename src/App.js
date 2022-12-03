import { NotFound } from "components/index";
import { ContextProvider } from "Context";
import LoginPage from "features/auth/login/index";
import RegisterPage from "features/auth/register";
import BLogPage from "features/blog";
import BlogDetail from "features/blog/detail";
import CourseList from "features/course";
import DashboardFeature from "features/dashboard/index";
import { PrivateLayout, PublicLayout } from "layout";
import { useReducer } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { isUserLoggedIn } from "utils/index";
import { actionTypes } from "./constants";

const initialState = {
  cart: {
    courses: [],
    total: 0
  }
}
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.cart.update_courses:
      return {
        ...state,
        cart: {
          ...state.cart,
          courses: action.payload
        }
      };
    case actionTypes.cart.update_total:
      return {
        ...state,
        cart: {
          ...state.cart,
          total: action.payload
        }
      };
    default:
      return state;
  }
}
function App() {
  const [store, dispatchStore] = useReducer(reducer, initialState)

  return (
    <ContextProvider store={store} dispatchStore={dispatchStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isUserLoggedIn() ? <Navigate to='/course' /> : <Navigate to='/login' />} />
          {/* <Route path='/' element={<HomeLayout />} /> */}

          {/* Public Layout  */}
          <Route path="/login" element={<PublicLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/register" element={<PublicLayout />}>
            <Route index element={<RegisterPage />} />
          </Route>
          <Route path="/blog" element={<PublicLayout />}>
            <Route index element={<BLogPage />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>

          {/* Private Layout */}
          <Route path='/course' element={<PrivateLayout />}>
            <Route index element={<CourseList />} />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
