import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

const ASSEST_URL = process.env.REACT_APP_ASSETS_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getAuthors = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${BASE_URL}/users`)
                setAuthors(response.data)
            } catch (error) {
                console.log(error)
            } 
            setIsLoading(false)
        }

        getAuthors()
    }, [])

    if(isLoading) {
        return <Loader />
    }

  return (
    <section className="authors">
       {authors.length > 0 ? <div className="container authors__container">
            {
                authors.map(({_id: id, name, avatar, posts}) => {
                    return <Link key={id} to={`/posts/users/${id}`} className='author'>
                        <div className="author__avatar">
                            <img src={`${ASSEST_URL}/uploads/${avatar}`} alt={`${name}`} />
                        </div>
                        <div className="author__info">
                            <h4>{name}</h4>
                            <p>{posts} posts</p>
                        </div>
                    </Link>    
                })
            }
        </div> : <h2 className='center'>No authors found!</h2> }
    </section>
  )
}

export default Authors