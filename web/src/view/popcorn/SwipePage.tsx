//import { fetchRoomMovieCollection } from '../playground/fetchRoomMovieCollections'
//import { FetchRoomMovieCollection } from '../../graphql/query.gen'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchMovie, FetchNextMovie, FetchRoom } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchMovie } from '../playground/fetchMovies'
import { fetchNextMovie } from '../playground/fetchNextMovie'
import { fetchRoom } from '../playground/fetchRooms'
import { addVote } from '../playground/mutateVotes'
import { handleError } from '../toast/error'

interface SwipePageProps extends RouteComponentProps, AppRouteParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwipePage(props: SwipePageProps) {
  const [count, setCount] = useState(1)
  const { user } = React.useContext(UserContext)
  const movieId = getMovieId(count)
  const movieTitle = getMovieTitle(movieId)

  const { loading, data } = useQuery<FetchRoom>(fetchRoom, { variables: { room_id: user?.room_id } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.room) {
    return <div>no votes</div>
  }
  const total_swipes = data.room.max_swipes
  console.log("TOTAL SWIPES")
  console.log(total_swipes)

  function doAddVote() {
    console.log('voting')
    if (user != null && user.id != null && user.room_id != null && movieId != null)
      addVote(getApolloClient(), { room_id: user.room_id, movie_id: movieId, user_id: user?.id }).catch(handleError)
  }
  console.log(count)
  //addMovieVote(1)

  return (
    <Page>
      <div
        style={{
          padding: '20px',
          fontSize: '30px',
          border: 'black',
          borderStyle: 'double',
          margin: '10px',
          fontWeight: 'lighter',
        }}
      >
        Movie: {movieTitle}
      </div>
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '240px' }}>
        <Button
          onClick={async () => {
            doAddVote()
            console.log('voted')
            setCount(count + 1)

            if (count >= total_swipes) {
              window.location.replace('/app/popcorn/results')
            }
          }}
        >
          Yes
        </Button>
      </span>
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '120px' }}>
        <Button
          onClick={() => {
            setCount(count + 1)
            //console.log(count)
            //movieTitle = getMovie(count)
            //window.location.replace('/app/popcorn/swipe')

            if (count >= total_swipes) {
              window.location.replace('/app/popcorn/results')
            }
          }}
        >
          {' '}
          No{' '}
        </Button>
      </span>
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '10px' }}>
        <Button
          onClick={() => {
            window.location.replace('/app/popcorn/results')
          }}
        >
          {' '}
          Done{' '}
        </Button>
      </span>
    </Page>
  )
}

function getMovieId(cur_index: number) {
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return -1
  }
  const { loading, data } = useQuery<FetchNextMovie>(fetchNextMovie, {
    variables: { room_id: user.room_id, index: cur_index },
  })
  if (loading || !data) {
    return -1
  }
  const currentMovie = data.nextMovie
  if (!currentMovie || currentMovie.m_movie_id == null) {
    return -1
  }
  return currentMovie.m_movie_id
}

function getMovieTitle(movie_id: number) {
  const { loading, data } = useQuery<FetchMovie>(fetchMovie, {
    variables: { movie_id: movie_id },
  })
  if (loading || !data) {
    //window.location.replace('/app/popcorn/results')
    return null
  }
  const mov = data.movie
  if (!mov) {
    //window.location.replace('/app/popcorn/results')
    return null
  }
  return mov.title
}
