import {Entity, ManyToOne, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
import Coords from './Coords';

@Entity()
export default class Cigarette {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.cigarettes)
  user:User;

  @Column()
  sentiment: string;

  @Column(type => Coords)
  coords: Coords;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export const Sentiment = {

  HAPPY: 'happy',

  DRUNK: 'drunk',

  NERVOUS: 'nervous',

  SICK: 'sick',

  NOT_HAPPY: 'not-happy',

  CHILLING: 'chilling'
};
