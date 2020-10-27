import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room as RoomType } from '../graphql/schema.types'
import { User } from './User'

@Entity()
export class Room extends BaseEntity implements RoomType {

  @PrimaryGeneratedColumn()
  room_id: number

  @CreateDateColumn()
  timeCreated: Date

  @OneToOne(() => User)
  @JoinColumn()
  admin_user_id: number

  @Column({
    nullable: true,
  })
  genre1: string

  @Column({
    nullable: true,
  })
  genre2: string

}
