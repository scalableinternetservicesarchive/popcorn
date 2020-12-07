import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RoomMovieCollection as RoomMovieCollectionType } from '../graphql/schema.types'
import { Movie } from './Movies'

@Entity()
export class RoomMovieCollection extends BaseEntity implements RoomMovieCollectionType {
  room_id: number
  movie_id: number
  __typename?: 'RoomMovieCollection' | undefined

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  //@ManyToOne(() => Room)
  @Index()
  @Column()
  m_room_id: number

  @Index()
  @ManyToOne(() => Movie)
  @Column()
  m_movie_id: number

  @Column({
    nullable: true,
  })
  movie_index: number


}