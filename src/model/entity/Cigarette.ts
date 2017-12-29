import {Entity, ManyToOne, Column, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
import Coords from './Coords';

@Entity()
export default class Cigarette {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.cigarettes)
  user:User;

  @Column({ nullable: true })
  sentiment: Sentiment;

  @Column(type => Coords)
  coords: Coords;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

}

export enum Sentiment {

  HAPPY = 'happy',

  DRUNK = 'drunk',

  NERVOUS = 'nervous',

  SICK = 'sick',

  NOT_HAPPY = 'not-happy',

  CHILLING = 'chilling'
};
