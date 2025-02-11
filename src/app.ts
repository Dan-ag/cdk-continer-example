import Fastify from 'fastify';
// import awsLambdaFastify from '@fastify/aws-lambda';

// Configuración de Fastify
// const fastify = Fastify({ logger: true });

// // Ruta principal
// fastify.get('/hello', async () => {
//   return { message: 'Hello from Fastify on AWS Lambda & Docker!' };
// });

// // Lógica mixta Lambda/Servidor
// export let handler: any;

// console.log('process.env.AWS_LAMBDA :>> ', process.env.AWS_LAMBDA === 'true'? 1:0 );

// if (process.env.AWS_LAMBDA === 'true') {
//   // Modo Lambda
//   const proxy = awsLambdaFastify(fastify);
//   handler = proxy;
// } else {
//   console.log('Iniciando servidor Fastify...');
//   // Modo servidor tradicional
//   const start = async () => {
//     try {
//       await fastify.listen({
//         port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
//         host: '0.0.0.0'
//       });
//     } catch (err) {
//       fastify.log.error(err);
//       process.exit(1);
//     }

//   }
//   start();
// }



// import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Ruta para la raíz
fastify.get('/', async (_request, _reply) => {
  return { message: 'Hello root!' };
});

// Definición de la ruta /hello
fastify.get('/hello', async (request, _reply) => {
  return { message: 'Hello lamdba!', input: request };
  // return { message: 'Hello lamdba!', input: request };
});

// Verificar si este módulo es el módulo principal
if (process.env.AWS_LAMBDA !== 'true') {
  fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Servidor escuchando en ${address}`);
  });
}

export default fastify;