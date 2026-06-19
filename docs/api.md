# API Overview

Base URL:

```txt
http://localhost:5000/api/v1
```

Main modules:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/forgot-password`
- `POST /auth/reset-password/:token`
- `GET /users/me`
- `GET /products`
- `GET /products/search`
- `GET /products/:slug`
- `GET /categories`
- `GET /brands`
- `GET /carts/me`
- `GET /wishlists/me`
- `POST /orders`
- `GET /orders/me`
- `POST /payments/sepay/qr`
- `POST /webhooks/sepay`
- `GET /analytics/dashboard`
- `GET /analytics/revenue`

Protected routes use:

```txt
Authorization: Bearer <access_token>
```

