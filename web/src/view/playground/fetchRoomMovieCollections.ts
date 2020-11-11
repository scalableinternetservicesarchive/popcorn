import { gql } from '@apollo/client'

export const fragmentRoomMovieCollection = gql`
  fragment RoomMovieCollection on RoomMovieCollection {
    movie_index
    movie_id
  }
`

export const fetchRoomMovieCollection = gql`
  query FetchRoomMovieCollection($room_id: Int!) {
    roomMovieCollection(room_id: $room_id) {
      ...RoomMovieCollection
    }
  }
  ${fragmentRoomMovieCollection}
`
