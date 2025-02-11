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
import fastify from '../app.js';
let proxy;
export const handler = async (event, context) => {
    if (!proxy) {
        proxy = awsLambdaFastify(fastify);
        await fastify.ready();
    }
    return new Promise((resolve, reject) => {
        proxy(event, context, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
//# sourceMappingURL=hello.js.map