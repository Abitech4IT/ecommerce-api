import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import User from "./user.model";
import Cart from "./cart.model";
import Product from "./product.model";

@Table({
  tableName: "cartitems",
  timestamps: true,
})
export default class CartItem extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  // Foreign key column
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cartId!: string;

  // Foreign key column
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: string;

  // Association with Cart and Product model
  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Product)
  product!: Product;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
