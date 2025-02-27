import Cart from "@models/cart.model";
import CartItem from "@models/cartItem.model";
import Order from "@models/order.model";
import OrderItem from "@models/orderItem.model";
import Product from "@models/product.model";
import User from "@models/user.model";
import sequelize from "config/database";

const createOrder = async (userId: string) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "cartitems",
          include: [
            {
              model: Product,
              as: "product",
              required: true,
              attributes: ["id", "productName", "price"],
            },
          ],
          required: true,
        },
      ],
      transaction,
    });

    console.log("🛒 Full Cart Data:", JSON.stringify(cart, null, 2));

    if (!cart || !cart.cartitems || cart.cartitems.length === 0) {
      throw new Error("Cart is empty");
    }

    const cartItems = cart.cartitems as (CartItem & { Product: Product })[];
    console.log("cartItems Result:", cartItems);

    // Calculate total amount
    let totalAmount = 0;

    for (const item of cart.cartitems) {
      const product = await Product.findByPk(item.productId, { transaction });

      if (!product) {
        console.error("❌ Product not found for cart item:", item);
        throw new Error("Product data missing for cart item.");
      }

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create(
      {
        userId,
        totalAmount,
        status: "completed",
      },
      { transaction }
    );

    // Create order items
    for (const item of cartItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.Product.price,
        },
        { transaction }
      );

      // Update product stock
      const product = await Product.findByPk(item.productId, { transaction });
      if (product) {
        product.quantity -= item.quantity;
        await product.save({ transaction });
      }
    }

    // Clear cart
    await CartItem.destroy({
      where: { cartId: cart.id },
      transaction,
    });

    // Commit the transaction
    await transaction.commit();
    return order;
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    throw error;
  }
};

const repo = {
  createOrder,
};

export default repo;
