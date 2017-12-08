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

  HAPPY: 'HPY',

  DRUNK: 'DRK',

  NOSTALGIC: 'NTG',

  SICK: 'SCK',

  NOT_HAPPY: 'NHP',

  CHILLING: 'CHL'
};
