// external pacages
import exp from 'express'
import cookieParser from 'cookie-parser';
// internal pacages
import dbConnection from './dbConfig';
import usersRouter    from './routers/users.router'
import postsRouter    from './routers/posts.router'
import commentsRouter from './routers/comments.router'

import 'dotenv/config'
const port = process.env.PORT

const app = exp()
dbConnection()

app.use(exp.json())
app.use(cookieParser())

app.use('/users'   , usersRouter   )
app.use('/posts'   , postsRouter   )
app.use('/comments', commentsRouter)

app.listen(port, () => {
    console.log(`Listening at localhost:${port}...`);
})