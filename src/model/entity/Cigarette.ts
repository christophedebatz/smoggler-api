import {Entity, ManyToOne, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';

@Entity()
export default class Cigarette {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.cigarettes)
  user:User;

  @Column()
  sentiment: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export const Sentiment = {

  HAPPY: 1,

  DRUNK: 2,

  NOSTALGIC: 3,

  SICK: 4,

  NOT_HAPPY: 5,

  CHILLING: 6
};
