import mailService from "@services/mail";

type OrderDetailsParams = {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  orderId: string;
  itemsList:
    | { productName: string; price: number; totalPrice: number }[]
    | undefined;
  totalAmount: number;
  orderDate: Date;
};

const sendOrderDetailsEmail = async ({
  firstName,
  lastName,
  orderId,
  orderDate,
  itemsList,
  totalAmount,
  email,
}: OrderDetailsParams) => {
  // Send user order details
  const emailSubject = "Order Confirmation";
  const emailHtml = `
      <h1>Order Confirmation</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for your order. We are pleased to confirm your purchase.</p>
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> #${orderId}</p>
        <p><strong>Order Date:</strong> ${orderDate.toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
        <h3>Items Purchased:</h3>
        <pre>${itemsList}</pre>
        <p>Your order will be processed shortly.</p>
        <p>Thank you for shopping with us!</p>
    `;

  if (email) {
    const [emailResult, emailError] = await mailService.sendMail({
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Failed to send data transaction email:", emailError);
    }
  } else {
    console.error("User email not defined. Cannot send email notification.");
  }
};

export default sendOrderDetailsEmail;
