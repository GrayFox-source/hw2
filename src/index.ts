import express, {Request, Response} from 'express';
import bodyParser from 'body-parser'
import {blogsRouter} from "./routes/blogs-router";
import {BlogViewModel} from "./models/BlogViewModel";
import {PostViewModel} from "./models/PostViewModel";
import {postsRouter} from "./routes/posts-router";

const app = express()
const PORT = 3003

const middleWare = bodyParser({})
export let db:  {blogs: BlogViewModel[], posts: PostViewModel[]} = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string"
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string"
        }
    ]
}

app.use(middleWare);
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.delete('/testing/all-data', (req:Request, res:Response) => {
    db.blogs = []
    db.posts = []
    res.send(204)
})


app.listen(PORT,() => {
    console.log(`Server working on port ${PORT}`)
})
