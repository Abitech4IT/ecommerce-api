import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import Cart from "./cart.model";
import Order from "./order.model";

@Table({
  tableName: "users",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["email"],
      name: "email_unique_idx",
    },
  ],
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email address must be valid",
      },
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: "Password must be at least 8 characters long",
      },
    },
  })
  password!: string;

  // Add this relationship
  @HasOne(() => Cart)
  cart?: Cart;

  @HasMany(() => Order)
  order?: Order[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Virtual field for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Method to check password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Hash password before saving
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    // Only hash the password if it has been modified
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  // When converting to JSON, exclude password
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}
