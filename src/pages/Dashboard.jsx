import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ASSEST_URL = process.env.REACT_APP_ASSETS_URL;

const Dashboard = () => {
  const navigate = useNavigate()
  const [posts, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()


  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  // redirect if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/posts/users/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        setPost(response.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    fetchPosts()
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  return (
      <section className="dashboard">
        {
          posts.length ? <div className="container dashboard__container">
            {
              posts.map(post => {
                return <article key={post.id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img src={`${ASSEST_URL}/uploads/${post.thumbnail}`} alt="" />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                    <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                    <DeletePost postId={post._id} />
                  </div>
                </article>
              })
            }
          </div> : <h2 className="center">You have no posts yet.</h2>
        }
      </section>
  )
}

export default Dashboard