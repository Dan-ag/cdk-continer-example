// import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// export const handler = async (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Hello world',
//       input: event,
//     }),
//   };
// };

import awsLambdaFastify from '@fastify/aws-lambda';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import fastify from '../app.js';

let proxy: ReturnType<typeof awsLambdaFastify> | undefined;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<unknown> => {
  if (!proxy) {
    proxy = awsLambdaFastify(fastify);
    await fastify.ready();
  }

  return new Promise((resolve, reject) => {
    proxy!(event, context, (err: Error | undefined, result: unknown) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};