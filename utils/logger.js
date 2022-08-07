// const pino = require("pino");
// const generateUID = require("./generateUID").default;
// const logger = require("pino-http")({
//   // Reuse an existing logger instance
//   logger: pino(),

//   // Define a custom request id function
//   // genReqId: function (req, res) {
//   //   if (req.id) return req.id;
//   //   let id = req.headers["X-Request-Id"];
//   //   if (id) return id;
//   //   id = generateUID();
//   //   res.setHeader("X-Request-Id", id);
//   //   return id;
//   // },

//   // Define custom serializers
//   serializers: {
//     err: pino.stdSerializers.err,
//     req: pino.stdSerializers.req,
//     res: pino.stdSerializers.res,
//   },

//   // Set to `false` to prevent standard serializers from being wrapped.
//   wrapSerializers: true,

//   // Logger level is `info` by default
//   // useLevel: "info",

//   // Define a custom logger level
//   customLogLevel: function (req, res, err) {
//     if (res.statusCode >= 400 && res.statusCode < 500) {
//       return "warn";
//     } else if (res.statusCode >= 500 || err) {
//       return "error";
//     } else if (res.statusCode >= 300 && res.statusCode < 400) {
//       return "silent";
//     }
//     return "info";
//   },

//   // Define a custom success message
//   customSuccessMessage: function (req, res) {
//     if (res.statusCode === 404) {
//       return "resource not found";
//     }
//     return `${req.method} completed`;
//   },

//   // Define a custom receive message
//   customReceivedMessage: function (req, res) {
//     return "request received: " + req.method;
//   },

//   // Define a custom error message
//   customErrorMessage: function (req, res, err) {
//     return "request errored with status code: " + res.statusCode;
//   },

//   // Override attribute keys for the log object
//   customAttributeKeys: {
//     req: "request",
//     res: "response",
//     err: "error",
//     responseTime: "timeTaken",
//   },

//   // // Define additional custom request properties
//   // customProps: function (req, res) {
//   //   return {
//   //     customProp: req.customProp,
//   //     // user request-scoped data is in res.locals for express applications
//   //     customProp2: res.locals.myCustomData,
//   //   };
//   // },
// });

const logger = (req) => {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    remoteAddress: req.remoteAddress,
    remotePort: req.remoteAddress,
  };
};

export function withLogger(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
      console.log(logger(req));
    } catch (err) {
      console.error(err);
      res.status(500).end("Internal Server Error");
    }

    // logger(req, res);
  };
}

export function withLoggerSsr(handler) {
  let result = {};

  return async ({ req, res, ...rest }) => {
    try {
      result = await handler({ req, res, ...rest });
      console.log(logger(req));
    } catch (err) {
      console.error(err);
    }

    // logger(req, res);
    return result;
  };
}
