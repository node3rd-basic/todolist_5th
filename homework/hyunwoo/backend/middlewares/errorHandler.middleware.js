export default function errorMiddleware(err, req, res, next) {
  res.status(500).json({ message: "Internal Server Error" });
}
