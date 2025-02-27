# E-Commerce API

## Installation

1. **Clone the repository**:

   ```bash
   git clone git-url
   cd e-commerce-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory include the following:

## Environment Variables

```env BE
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecommerce_db
DB_USER=ecommerce_user
DB_PASSWORD=DB_Password
NODE_ENV=development

JWT__SECRET=your-secret
JWT__EXPIRATION=expire-time
JWT_COOKIE_EXPIRES_IN=expire-time

# Email
EMAIL_ADDRESS = ""
EMAIL_NAME = ""
EMAIL_TO = ""
EMAIL_PORT = ""
EMAIL_PASSWORD = ""
EMAIL_ACCESS_KEY = "test1234"
```

4. **Run the server**:

   ```bash
   npm run dev
   ```
