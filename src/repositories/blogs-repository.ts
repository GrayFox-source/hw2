import {db} from "../index";


export const blogsRepository = {
    getAllBlogs() {
        return db.blogs
    },
    getBlogByID(id:string) {
        const findBlog = db.blogs.find(b => b.id === id)
        return findBlog
    },
    createBlog(inputBlogDTO:{name:string, description:string, websiteUrl:string}) {
        const newBlog = {
            id: String(+(new Date())),
            name: inputBlogDTO.name,
            description: inputBlogDTO.description,
            websiteUrl: inputBlogDTO.websiteUrl,
        }
        db.blogs.push(newBlog)
        return newBlog
    },
    updateBlogByID(updateBlogDTO:{id: string,name:string, description:string, websiteUrl:string}) {
        const blog = db.blogs.find(b => b.id === updateBlogDTO.id)
        if (blog) {
            blog.name = updateBlogDTO.name
            blog.description = updateBlogDTO.description
            blog.websiteUrl = updateBlogDTO.websiteUrl
            return blog
        } else {
            return null
        }
    },
    deleteBlogByID(id:string) {
        for (let i = 0; i < db.blogs.length; i++) {
            if (db.blogs[i].id === id) {
                db.blogs.splice(i, 1)
                return true
            }
        }
        return false
    }
    }
