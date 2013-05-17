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
  arguments = Array.prototype.slice.call(arguments);
  var args = [];

  args.push(path);
  args.push(function(ctx, next) {
    modifyCtx(ctx);
    cb(ctx, ctx, next);
  });

  args = args.concat(arguments.slice(2, arguments.length).map(function(cb) { return function(ctx, next) { cb(ctx, ctx, next); }; }));
  page.apply(this, args);
};

Turbo.post = function() { };

function modifyCtx(ctx) {
  ctx.format = function(obj) {
    if(typeof obj['text/html'] == 'function')
      obj['text/html']();
  };
}
