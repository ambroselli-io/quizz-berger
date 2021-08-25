const { capture } = require("./sentry");

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((error) => next(error));
  };
};

exports.globalErrorHandler = (error, req, res, next) => {
  capture(error, {
    extra: { originalUrl: req.originalUrl, mehod: req.method, body: req.body, params: req.params, query: req.query, headers: req.headers },
    user: req.user,
  });
  return res.status(error.status || 500).send({
    ok: false,
    code: "SERVER_ERROR",
    error:
      error.message ||
      "Une erreur est survenue, veuillez nous excuser pour la gêne occasionnée, notre équipe technique a été informée, nous réglons le problème au plus vite !",
  });
};
