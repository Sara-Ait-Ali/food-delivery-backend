const logger = (req, res, next) => {
  const start = Date.now();

  const correlationId = req.headers["x-correlation-id"] || "N/A";

  req.correlationId = correlationId;

  res.setHeader("X-Correlation-ID", correlationId);

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `[${correlationId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = logger;