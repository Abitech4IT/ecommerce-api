import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "./user.model";
import CartItem from "./cartItem.model";

@Table({
  tableName: "carts",
  timestamps: true,
})
export default class Cart extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  // Foreign key column
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  // Association with User model
  @BelongsTo(() => User)
  user!: User;

  // Add this relationship
  @HasMany(() => CartItem, { as: "cartitems" })
  cartitems!: CartItem[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
