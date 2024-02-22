import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'app' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  secret: string;
}
