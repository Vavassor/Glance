import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Post {
  @ManyToOne((type) => Account, (account) => account.posts)
  account!: Account;

  @Column("text")
  content!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  creation_date!: string;
}
