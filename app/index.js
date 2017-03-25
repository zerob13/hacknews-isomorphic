import koa from 'koa';
import serve from 'koa-serve';
import path from 'path';
import convert from 'koa-convert';
import logger from 'koa-logger';
import App from '../client/routers';
import mobileTpl from './views/mobileTpl.js';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import {
  StaticRouter
} from 'react-router-dom';
// import fetchComponentData from '../client/api/fetchComponentData';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  Provider
} from 'react-redux';
import mobileReducer from '../client/reducers';
import {
  createLogger
} from 'redux-logger';
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

app.use(convert(serve('assets', path.join(__dirname, '..', 'build/'))));
app.use(convert(serve('statics', path.join(__dirname, '..', 'build/'))));
app.use(convert(serve('img', path.join(__dirname, '..', 'build/'))));

app.use(async(ctx, next) => {
  await next();
  // if (ctx.state.renderProps) {
  const reduxLogger = createLogger();
  const context = {};
  const store = process.env.NODE_ENV === 'production' ? applyMiddleware(ReduxThunk)(createStore)(mobileReducer) :
    applyMiddleware(ReduxThunk, reduxLogger)(createStore)(mobileReducer);
  // let html = await fetchComponentData(store.dispatch, ctx.state.renderProps.components, ctx.state.renderProps.params)
  // .then(() => {
  // return ReactDOMServer.renderToString(
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
            <StaticRouter location={ctx.request.url} context={context} >
              <App/>
            </StaticRouter>
          </Provider>
  );
  // });
  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    this.redirect(context.url)
  } else {
    // we're good, send the response
    ctx.body = mobileTpl(html, transit.toJSON(store.getState()), ctx.csrf);
  }
  // }
});
app.listen(3002, () => {
  console.log(new Date());
  console.log('listening 3002');
});
