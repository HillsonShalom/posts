/// <reference path="./types/extensions/appResError.d.ts" />
/// <reference path="./types/extensions/appRequest.d.ts" />
/// <reference path="./types/DTOs/globalDTOs.d.ts" />
import './types/extensions/appResErrorImp'


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
import { verifyToken } from './middlwares/tokenMiddleware';
const port = process.env.PORT

const app = exp()
dbConnection()

app.use(exp.json())
app.use(cookieParser())
app.use(exp.static('client'))

app.use('/users'   , usersRouter   )
app.use('/posts'   , verifyToken, postsRouter   )
app.use('/comments', verifyToken, commentsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
    console.log(`Listening at localhost:${port}...`);
});