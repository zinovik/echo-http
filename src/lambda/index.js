exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: event.path,
      query: event.queryStringParameters,
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    }),
  });
};
