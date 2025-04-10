import express from 'express';
import bodyParser from 'body-parser'
import {blogsRouter} from "./routes/blogs-router";
import {BlogViewModel} from "./models/BlogViewModel";

const app = express()
const PORT = 3003

const middleWare = bodyParser({})
export let db:  {blogs: BlogViewModel[]} = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string"
        }
    ],

}

app.use(middleWare);
app.use('/blogs', blogsRouter)


app.listen(PORT,() => {
    console.log(`Server working on port ${PORT}`)
})
