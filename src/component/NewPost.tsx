
import { useState} from "react";
import {getPosts, postNewPosts} from "../services/services.ts";
import {putNewPost} from "../store/reducer.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import type {CreatePost} from "../interface/Posts.ts";

function NewPost() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add('modal-open');
    };
    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove('modal-open');
    };

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPost: CreatePost = { userId, title, body };
        try {
            const created = await postNewPosts(newPost);
            dispatch(putNewPost(created))
            await getPosts();
            setTitle('');
            setBody('');
            setUserId(0);
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Нов пост
            </button>

            {isOpen && (
                <div className="modal show d-block"  role="dialog" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Създай нов пост</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="userId" className="form-label">User ID</label>
                                        <input
                                            id="userId"
                                            type="number"
                                            value={userId}
                                            onChange={e => setUserId(Number(e.target.value))}
                                            className="form-control"
                                            min={1}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="postTitle" className="form-label">Заглавие</label>
                                        <input
                                            id="postTitle"
                                            type="text"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="postBody" className="form-label">Съдържание</label>
                                        <textarea
                                            id="postBody"
                                            value={body}
                                            onChange={e => setBody(e.target.value)}
                                            className="form-control"
                                            rows={4}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success w-25">
                                        Създай
                                    </button>
                                    <button type="button" className="btn btn-secondary w-25" onClick={closeModal}>
                                        Отказ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewPost;