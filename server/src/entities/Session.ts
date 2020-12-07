import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Index()
  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @Column({
    length: 36,
  })
  authToken: string
}
