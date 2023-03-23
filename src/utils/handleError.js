export default function handleError(res, message = "Bad request", code = 403) {
    res
      .status(code)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: message });
  }
  