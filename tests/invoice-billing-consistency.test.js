'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');
var pricing = require('../lib/pricing');
var invoice = require('../lib/invoice');

function assertMatchesBilling(items, coupon) {
  var billed = pricing.computeTotals(items, coupon);
  var figures = invoice.computeInvoiceFigures({ items: items, coupon: coupon });

  assert.deepEqual(
    {
      subtotal: figures.subtotal,
      discount: figures.discount,
      tax: figures.tax,
      cgst: figures.cgst,
      sgst: figures.sgst,
      total: figures.total
    },
    {
      subtotal: billed.subtotal,
      discount: billed.discount,
      tax: billed.tax,
      cgst: billed.cgst,
      sgst: billed.sgst,
      total: billed.total
    }
  );
  assert.deepEqual(
    figures.rows.map(function (row) {
      return { gstPercent: row.gstPercent, lineTax: row.lineTax };
    }),
    billed.lines.map(function (line) {
      return { gstPercent: line.gstPercent, lineTax: line.tax };
    })
  );
}

test('invoice uses the billed HSN GST slab and totals', function () {
  var items = [{ id: 1, name: 'Rice', hsn: '1006', price: 100, qty: 1 }];

  assertMatchesBilling(items, '');
});

test('invoice applies flat coupons to the same taxable value as billing', function () {
  var items = [{ id: 2, name: 'Tea', hsn: '0902', price: 500, qty: 1 }];

  assertMatchesBilling(items, 'FLAT50');
});

test('invoice applies percentage coupons to the same taxable value as billing', function () {
  var items = [{ id: 3, name: 'Biscuits', hsn: '2106', price: 100, qty: 1 }];

  assertMatchesBilling(items, 'WELCOME');
});
