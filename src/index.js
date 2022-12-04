import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Spinner, ToastifyContainer } from './components';
import { ConfigProvider } from 'antd';

import 'assets/styles/index.scss';
import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from 'app/store';

const LazyApp = lazy(() => import('./App'))

ConfigProvider.config({
  theme: {
    primaryColor: '#52c41a',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <ToastifyContainer />
      <Provider store={store}>
        <ConfigProvider>
          <LazyApp />
        </ConfigProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

