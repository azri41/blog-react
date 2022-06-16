import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const [blog, setBlog] = useState({
        title: "",
        body: "",
        author: "azri",
    });

    const handleChange = (event) => {
        setBlog({ ...blog, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPending(true)

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("New blog added!");
            setIsPending(false);
            // history.go(-1);
            history.push('/')
        })
    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    name="title"
                    required 
                    value={blog.title}
                    onChange={handleChange}
                />
                <label>Blog body:</label>
                <textarea 
                    name="body"
                    required
                    value={blog.body}
                    onChange={handleChange}
                ></textarea>
                <label>Blog author:</label>
                <select
                    name="author"
                    value={blog.author}
                    onChange={handleChange}
                >
                    <option value="azri">azri</option>
                    <option value="mist">mist</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding blog...</button>}

            </form>
        </div>
    );
}
 
export default Create;