var Turbo = module.exports = function() {
  var express = Turbo.express(arguments);
  express._clientSide = true;
  express._serverSide = false;
  return express;
};
