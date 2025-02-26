import sequelize from "../config/database";
import Cart from "./cart.model";
import CartItem from "./cartItem.model";
import Order from "./order.model";
import OrderItem from "./orderItem.model";
import Product from "./product.model";
import User from "./user.model";

// Add all models here to ensure they are registered
const models = [User, Product, Cart, CartItem, Order, OrderItem];

// Initialize models
sequelize.addModels(models);

export { User };
export default sequelize;
