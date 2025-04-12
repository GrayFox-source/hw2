import {db} from "../index";

export const PostsRepository = {
    getAllPosts() {
        return db.posts
    },
    getPostById(id:string) {
        const findPost = db.posts.find(p => p.id === id)
        return findPost
    },
    createNewPost(createPostDTO:{title: string, shortDescription: string, content: string, blogId: string}) {
        const newPost = {
            id: String(+(new Date())),
            title: createPostDTO.title,
            shortDescription: createPostDTO.shortDescription,
            content: createPostDTO.content,
            blogId: createPostDTO.blogId,
            blogName: 'string'
        }
        db.posts.push(newPost)
        return newPost
    },
    updatePostById(updatePostDTO:{id:string, title: string, shortDescription: string, content: string, blogId: string}) {
        const findPost = db.posts.find(p => p.id === updatePostDTO.id)
        if (findPost) {
            findPost.title = updatePostDTO.title
            findPost.shortDescription = updatePostDTO.shortDescription
            findPost.content = updatePostDTO.content
            findPost.blogId = updatePostDTO.blogId
            return findPost
        } else {
            return null
        }
    },
    deletePostById(id:string) {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1)
                return true
            }
            }
        return false
        }
    }
