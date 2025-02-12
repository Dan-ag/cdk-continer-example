import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MicDigitalMicroservicesV2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // new s3.Bucket(this, 'MyBucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY
    // });

    // Lambda Function
    const helloLambda = new NodejsFunction(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda/hello.ts',
      handler: 'handler',
      logRetention: RetentionDays.ONE_DAY,
      bundling: {
        minify: true,
        sourceMap: true
      },
      environment: {
        AWS_LAMBDA: 'true'
      }
    });

    // Api Gateway
    const api = new LambdaRestApi(this, 'HelloApi', {
      handler: helloLambda,
      proxy: false
    });

    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET');
  }
}
