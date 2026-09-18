import serverless from "serverless-http";
import { createServer } from "../../../../server/index.js";

const app = serverless(createServer());

export default (req: VercelRequest, res: VercelResponse) => {
  // Vercel may strip the function's directory prefix before invoking it.
  // Express routes are registered with the full /api/zoho/books prefix.
  if (req.url && !req.url.startsWith("/api/")) {
    req.url = `/api/zoho/books${req.url.startsWith("/") ? req.url : `/${req.url}`}`;
  }

  return app(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
