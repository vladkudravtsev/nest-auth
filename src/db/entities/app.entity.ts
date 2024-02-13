import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'app' })
export class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
