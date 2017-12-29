import {Column} from 'typeorm';

export default class Coords {

  @Column()
  lat: string;

  @Column()
  lng: string;

}
