import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './favorite.css'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])
    useEffect(() => {

        fetchFavoriteMovie()

    }, [])

    const fetchFavoriteMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovies', { userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to get movie list')
                }
            })
    }
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    fetchFavoriteMovie()
                } else {
                    alert('Failed to remove the favorite')
                }
            })
        
        

    }

    const renderCards = Favorites.map((favorite, index) => {
        
        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "No Image" }

            </div>
        )
        
        return <tr key={index}>

          <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
          </Popover>
            
            <td>{favorite.movieRuntime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })



    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}

                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
