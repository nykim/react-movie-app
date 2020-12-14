import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteCount, setFavoriteCount] = useState(0)
    const [Liked, setLiked] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRuntime
    }

    const onClickFavorite = () => {
        if (Liked) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        console.log('removed from favorite')
                        setLiked(false)
                        setFavoriteCount(FavoriteCount - 1)
                    } else {
                        alert('Failed to remove from favorite')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        console.log('added to favorite')
                        setLiked(true)
                        setFavoriteCount(FavoriteCount + 1)
                    } else {
                        alert('Failed to remove from favorite')
                    }
                })
        }
    }
    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    console.log('favorite count:', response.data)
                    setFavoriteCount(response.data.favoriteNumber)
                } else {
                    alert('Favorite number could not be retrieved.')
                }
            })

        Axios.post('/api/favorite/liked', variables)
            .then(response => {
                if(response.data.success) {
                    console.log('liked', response.data)
                    setLiked(response.data.liked)
                } else {
                    alert('Failed to retrieve the info.')
                }
            })
    }, [])

    return (
        <div>
            <Button onClick={onClickFavorite}>
                {Liked ? "Favorite" : "Add to Favorite"} {FavoriteCount} 
            </Button>
        </div>
    )
}

export default Favorite
