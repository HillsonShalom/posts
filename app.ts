/// <reference path="./types/extensions/appResError.d.ts" />
/// <reference path="./types/extensions/appRequest.d.ts" />
/// <reference path="./types/DTOs/globalDTOs.d.ts" />
/// <reference path="./types/models/declareModels.d.ts" />
import './types/extensions/appResErrorImp'
// import "./types/models/declareModels.d.ts"


// external pacages
import exp from 'express'
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express'
// internal pacages
import dbConnection from './dbConfig';
import usersRouter    from './routers/users.router'
import postsRouter    from './routers/posts.router'
import commentsRouter from './routers/comments.router'

import 'dotenv/config'
import { swaggerDocs } from './swagger/swagger';
import { attachToken } from './middlwares/tokenMiddleware';
const port = process.env.PORT

const app = exp()
dbConnection()

app.use(exp.json())
app.use(cookieParser())
app.use(attachToken)

app.use('/users'   , usersRouter   )
app.use('/posts'   , postsRouter   )
app.use('/comments', commentsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
    console.log(`Listening at localhost:${port}...`);
})