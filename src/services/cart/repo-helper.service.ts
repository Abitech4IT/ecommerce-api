import Cart from "@models/cart.model";
import CartItem from "@models/cartItem.model";
import Product from "@models/product.model";
import User from "@models/user.model";
import sequelize from "config/database";

const addCart = async (userId: string, productId: string, quantity: number) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      throw new Error("User not found");
    }

    const product = await Product.findByPk(productId, { transaction });
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    const [cart] = await Cart.findOrCreate({
      where: { userId },
      defaults: { userId },
      transaction,
    });

    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
      transaction,
    });

    let result;
    if (existingItem) {
      existingItem.quantity += quantity;
      result = await existingItem.save({ transaction });
    } else {
      result = await CartItem.create(
        {
          cartId: cart.id,
          productId,
          quantity,
        },
        { transaction }
      );
    }

    // Commit the transaction
    await transaction.commit();
    return result;
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    throw error;
  }
};

const removeFromCart = async (userId: string, cartItemId: string) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({
      where: { userId },
    });

    // const cartItem = await CartItem.findByPk(cartItemId, { transaction });
    const cartItem = await CartItem.findOne({
      where: { id: cartItemId, cartId: cart?.id },
      transaction,
    });
    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    const userCart = await Cart.findByPk(cartItem.cartId, { transaction });
    if (!userCart || userCart.userId !== userId) {
      throw new Error("Cart not found or does not belong to the user");
    }

    await cartItem.destroy({ transaction });

    // Commit the transaction
    await transaction.commit();
    return { message: "Item removed from cart" };
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    throw error;
  }
};

const repo = {
  addCart,
  removeFromCart,
};

export default repo;
