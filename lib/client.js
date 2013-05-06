var page = require('page');

var Turbo = module.exports = function() {
  page.start({dispatch: false});
  return Turbo;
};

Turbo._clientSide = true;
Turbo._serverSide = false;

Turbo._page = page;

Turbo.navTo = function(path) {
  page(path);
};

Turbo.use = function(fn) {
  page(function(ctx, next) {
    fn(ctx, ctx, next);
  });
};

Turbo.get = function(path, cb) {
  page(path, function(ctx, next) {
    cb(ctx, ctx, next);
  });
};

Turbo.post = function() { };
