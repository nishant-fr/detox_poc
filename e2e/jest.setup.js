const detox = require('detox');
const config = require('../.detoxrc.js');
const adapter = require('detox/runners/jest/adapter');

jest.setTimeout(300000); // 5 minutes

beforeAll(async () => {
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await detox.cleanup();
});