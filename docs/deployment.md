# Deployment Notes

## Backend

1. Copy `backend/.env.example` to `backend/.env`.
2. Configure MongoDB, JWT secrets, Cloudinary, and SePay bank details.
3. Run:

```bash
npm install
npm run start
```

## Frontend

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Set `VITE_API_BASE_URL`.
3. Run:

```bash
npm install
npm run build
```

## MongoDB local

```bash
docker compose up -d mongo
```

