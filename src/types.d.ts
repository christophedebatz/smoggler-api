export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;
  database: DatabaseConfig;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
