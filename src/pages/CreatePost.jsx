import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../index'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  // redirect if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  const modules = { 
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ] 
  }

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'link', 'image', 'video', 'list', 'bullet', 'indent', 'code', 'clean']

  const POST_CATEGORIES = ['Agriculture', 'Health', 'Bussiness', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather']

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData()
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.post(`${BASE_URL}/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 201) {
        navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">
          {error}
        </p>}
        <form className="form create-post__form" onSubmit={createPost}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)
            }
            </select>
            <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
            <button type="submit" className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost