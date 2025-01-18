import { Request, Response } from "express";
import * as postServices from "../services/postServices";
import { postInterface } from "../models/post";

// Obtener publicaciones con paginación
export async function getPosts(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get Posts');
        const page = parseInt(req.params.page as string) || 1;
        const limit = parseInt(req.params.limit as string) || 10;
        console.log(page, limit);
        const posts = await postServices.getEntries.getPaginated(page, limit);
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get posts' });
    }
}

// Crear una nueva publicación
export async function createPost(req: Request, res: Response): Promise<Response> {
    try {
        const { author, postType, content, image, postDate } = req.body as postInterface;

        // Comprobar si el usuario existe
        const userExists = await postServices.getEntries.checkIfUserExists(author);
        if (!userExists) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Crear un nuevo objeto de post
        const newPost: postInterface = {
            author,
            postType,
            content,
            image: image || '',
            postDate: postDate ? new Date(postDate) : new Date(),
        };

        // Usar el servicio para crear el post
        const post = await postServices.getEntries.create(newPost);
        return res.json({
            message: "Post created",
            post
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create post' });
    }
}

// Actualizar una publicación
export async function updatePost(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const { author, postType, content, image, postDate } = req.body as postInterface;
        const updatedPost: Partial<postInterface> = { author, postType, content, image, postDate };
        const post = await postServices.getEntries.update(id, updatedPost);

        if (!post) {
            return res.status(404).json({ error: `Post with id ${id} not found` });
        }
        return res.json({
            message: "Post updated",
            post
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update post' });
    }
}

// Eliminar una publicación
export async function deletePost(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const post = await postServices.getEntries.delete(id);

        if (!post) {
            return res.status(404).json({ error: `Post with id ${id} not found` });
        }
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete post' });
    }
}

// Obtener una publicación por ID
export async function getPost(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const post = await postServices.getEntries.findById(id);

        if (!post) {
            return res.status(404).json({ error: `Post with id ${id} not found` });
        }
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get post' });
    }
}

// Obtener posts de un autor específico
export async function getAuthorPosts(req: Request, res: Response): Promise<Response> {
    try {
        const idAuthor = req.params.id;
        const posts = await postServices.getEntries.findByAuthor(idAuthor);

        if (!posts) {
            return res.status(404).json({ error: `User with id ${idAuthor} not found` });
        }
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get posts by author' });
    }
}

// Obtener posts por tipo de publicación
export async function getPostByType(req: Request, res: Response): Promise<Response> {
    try {
        const type = req.params.type;
        const posts = await postServices.getEntries.findbyPostType(type);

        if (!posts) {
            return res.status(404).json({ error: `Posts with type ${type} not found` });
        }
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get posts by type' });
    }
}



