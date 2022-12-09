import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Spinner, ToastifyContainer } from './components';
import { ConfigProvider } from 'antd';

import 'assets/styles/index.scss';
// import 'antd/dist/antd.css';
import 'antd/dist/reset.css';
// import 'antd/dist/antd.variable.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from 'app/store';

const LazyApp = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <ToastifyContainer />
      <Provider store={store}>
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#52c41a',
          },
        }}>
          <LazyApp />
        </ConfigProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

