import { UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// ToDo: enable the authentication for security.
// @UseGuards(AuthGuard(['basic']))
@ApiBasicAuth()
@ApiResponse({
  status: 400,
  description: 'data sent is not valid',
  schema: {
    example: {
      statusCode: 400, error: 'Bad Request',
      details: [{
        message: 'description of the error',
        path: ['property path'],
        type: 'type of data suppose to be for the property',
        context: { deliveryChannel: 'property full path as string, example: name[0].locale', value: 'sent value', key: 'property key' }
      }]
    },
    properties: {
      statusCode: { type: 'number', default: 400 },
      error: { type: 'string', default: 'Bad Request' },
      details: { type: 'any' }
    }
  },
})
export class CoreController { }
