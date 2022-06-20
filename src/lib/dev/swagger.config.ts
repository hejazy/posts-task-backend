
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const version = process.env.VERSION || 'v1'
export default (app) => {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
        .setTitle('Posts Task')
        .setDescription('Simple API task')
        .setVersion(version)
        .addBasicAuth()
        .build(),
    );
    const options: any = {
        uiConfig: {
            validatorUrl: null,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            docExpansion: 'none',
        },
    };
    SwaggerModule.setup('posts-task/api/swagger-api', app, document, options);
};
