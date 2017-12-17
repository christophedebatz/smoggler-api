import {Column} from 'typeorm';

export default class Coords {

  @Column()
  lat: number;

  @Column()
  lng: number;

}
