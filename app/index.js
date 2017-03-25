import koa from 'koa';
import serve from 'koa-serve';
import path from 'path';
import convert from 'koa-convert';
import logger from 'koa-logger';
import proxy from './service/api-proxy.js';
import mobileRoutes from '../client/routers';
import mobileTpl from './views/mobileTpl.js';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import {match, RouterContext} from 'react-router';
import fetchComponentData from '../client/api/fetchComponentData';
import {
  createStore,
  applyMiddleware
}from 'redux';
import {Provider} from 'react-redux';
import mobileReducer from '../client/reducers';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import transit from 'transit-immutable-js';

var app = new koa();
// csrf(app)
// app.use(convert(csrf.middleware));
// console.dir(process.env);
if (process.env.NODE_ENV !== 'production') {
  app.use(logger());
}
app.use(async(ctx, next) => {
  try {
    if (ctx.path === '/favicon.ico') return;
    await next();
  } catch (err) {
    ctx.body = {
      message: err.message
    };
    ctx.status = err.status || 500;
  }
});

app.use(convert(proxy));
app.use(convert(serve('assets', path.join(__dirname, '..', 'build/'))));
app.use(convert(serve('statics', path.join(__dirname, '..', 'build/'))));
app.use(convert(serve('img', path.join(__dirname, '..', 'build/'))));

app.use(async(ctx, next) => {
  await next();
  if (ctx.state.renderProps) {
    const reduxLogger = createLogger();
    const store = process.env.NODE_ENV === 'production' ? applyMiddleware(ReduxThunk)(createStore)(mobileReducer)
      : applyMiddleware(ReduxThunk, reduxLogger)(createStore)(mobileReducer);
    let html = await fetchComponentData(store.dispatch, ctx.state.renderProps.components, ctx.state.renderProps.params)
      .then(() => {
        return ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...ctx.state.renderProps} />
          </Provider>
        );
      });
    ctx.body = mobileTpl(html, transit.toJSON(store.getState()), ctx.csrf);
  }
});
app.use(async(ctx) => {
  match({
    routes: mobileRoutes,
    location: ctx.request.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      this.throw(error.message, 500);
    } else if (redirectLocation) {
      this.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      ctx.state.renderProps = renderProps;
    } else {
      this.throw('Not Found', 404);
    }
  });

});

app.listen(3002, () => {
  console.log(new Date());
  console.log('listening 3002');
});

