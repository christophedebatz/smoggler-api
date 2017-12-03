import {Entity, Column, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import Cigarette from './Cigarette';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fb_id" })
  fbId: string;

  @Column({ name: "fb_access_token" })
  fbAccessToken: string;

  @Column({ name: "fb_access_token_expiration_date" })
  fbAccessTokenExpirationDate: Date;

  @OneToMany(type => Cigarette, cigarette => cigarette.user, { lazy: true })
  cigarettes:Cigarette[];

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "picture_url" })
  pictureUrl: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @CreateDateColumn({ name: "creation_date" })
  creationDate: Date;

  @UpdateDateColumn({ name: "update_date" })
  updateDate: Date;

}

export const UserRole = {

  USER: 'user',

  ADMIN: 'admin'

};
