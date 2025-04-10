import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../types";
import {BlogInputModel} from "../models/BlogInputModel";
import * as validation from "../middlewares/input-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";




export const blogsRouter = Router()

blogsRouter.get('/',(req: Request, res: Response) =>  {
    const blogs = blogsRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req:RequestWithParams<{id:string}>, res) => {
    const findedBlog = blogsRepository.getBlogByID(req.params.id)
    if (findedBlog) {
        res.status(200).send(findedBlog)
    } else {
        res.send(404)
    }
})

blogsRouter.post('/',
    validation.authorisedCheckValidator,
    validation.inputNameBlogValidation,
    validation.inputDescriptionValidation,
    validation.InputURLValidation,
    inputValidationMiddleware,
    (req:RequestWithBody<BlogInputModel>, res) => {
        const newBlog = blogsRepository.createBlog(req.body)
        res.status(200).send(newBlog)
    })

blogsRouter.put('/:id',
    validation.authorisedCheckValidator,
    validation.inputNameBlogValidation,
    validation.inputDescriptionValidation,
    validation.InputURLValidation,
    inputValidationMiddleware,
    (req:RequestWithParamsAndBody<{id: string},BlogInputModel>, res) =>  {
    const updateBlog = blogsRepository.updateBlogByID({id:req.params.id,...req.body})
    if (updateBlog !== null) {
        res.status(204).send(updateBlog)
    } else {
        res.send(404)
    }
})

blogsRouter.delete('/:id',
    validation.authorisedCheckValidator,
    (req:RequestWithParams<{id:string}>, res) =>  {
    const searchBlog = blogsRepository.deleteBlogByID(req.params.id)
    if (searchBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})