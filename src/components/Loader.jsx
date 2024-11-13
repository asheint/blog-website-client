import React from 'react'
import LoadingGif from '../assests/Loading.gif'

const Loader = () => {
  return (
    <div className="loader">
        <div className="loader__image">
            <img src={LoadingGif} alt="loading" />
        </div>
    </div>
  )
}

export default Loader