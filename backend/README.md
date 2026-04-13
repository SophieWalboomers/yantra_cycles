# Dharma Marga Backend

This is the Node.js/Express backend for the Dharma Marga Vedic Numerology Calculator.

## Project Structure

```
backend/
├── index.js              # Main Express server entry point
├── package.json          # Dependencies
├── .env.example          # Environment variables template
├── routes/
│   ├── calculate.js      # Calculation endpoints
│   └── leadCapture.js    # Lead capture endpoints
├── utils/
│   └── validation.js     # Input validation utilities
└── config/
    └── constants.js      # Configuration constants
```

,

## Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Frontend URL for CORS (default: http://localhost:5173)

### 3. Start the server

**Development** (with auto-reload):

```bash
npm run dev
```

**Production**:

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check

- `GET /health` - Returns server status

### Calculate

- `GET /api/calculate/cycle-data` - Get all cycle information
- `POST /api/calculate` - Calculate cycles for a birth date

### Lead Capture

- `POST /api/lead-capture` - Capture lead email and birth date

## TODO

- [ ] Load cycle data from JSON
- [ ] Implement calculation logic
- [ ] Implement lead capture and storage
- [ ] Add input validation
- [ ] Add database integration
- [ ] Add email service integration
- [ ] Add tests
