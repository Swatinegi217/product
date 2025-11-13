# Product API

REST API for product cost sheets and export details.

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:code` - Get product by code
- `GET /api/products/:code/cost-sheet` - Get product cost sheet
- `GET /api/products/:code/export-details` - Get product export details

## Examples

```bash
# Get all products
curl http://localhost:3000/api/products

# Get specific product
curl http://localhost:3000/api/products/DC25-56051

# Get cost sheet
curl http://localhost:3000/api/products/DC25-56051/cost-sheet

# Get export details
curl http://localhost:3000/api/products/5HSTXYRS104/export-details
```
