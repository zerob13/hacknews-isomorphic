export default function indexTpl(reactHtml, initialState) {
  var result = `<!DOCTYPE html>
  <html lang="zh">
  <head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Hacker News</title>
    <link rel="stylesheet" href="/assets/app.css">
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
  </head>
  <body>
    <div id="app">${reactHtml}</div>
    <script>
      __REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
    </script>
    <script type="text/javascript" src="/assets/app.js"></script>
  </body>
  </html>`;
  return result;
}

