// In server.js we can not write ES6, we need to require babel-core.
// Then we require the Express Server implementation (in ES6) from the src folder.
require('babel-core/register');
require('./server/server');
