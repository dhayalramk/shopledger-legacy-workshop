# Repository Guidelines

## Stack

ShopLedger is a Node.js application using Express 4 and `body-parser`. Its browser interface uses plain HTML, CSS, and JavaScript. Application records are stored in the JSON file `data/db.json`.

## Module Map

- `server.js` creates the app and mounts routes.
- `routes/` defines product, order, customer, and report API endpoints.
- `lib/` holds domain logic for orders, pricing, inventory, tax, coupons, ledger, reports, dates, invoices, and storage.
- `public/` contains the web UI and assets.
- `config.js` holds server configuration; `data/db.json` is the local data store.

## Commands

- `npm install` installs the existing dependencies.
- `npm start` starts the server with `node server.js`.
- `npm test` currently exits with an error because no test suite is configured.

## Change Rules

- Before changing behavior, write characterization tests that capture the current behavior.
- Change only the module the ticket is about; avoid unrelated edits.
- Tests must never read from or write to `data/db.json`.
- Do not add dependencies.
