import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Account {
  @Column()
  email!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  password!: string;

  @OneToMany((type) => Post, (post) => post.account)
  posts!: Post;

  @Column()
  username!: string;
}
