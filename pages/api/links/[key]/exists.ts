import { withLinksAuth } from "#/lib/auth";
import { checkIfKeyExists } from "#/lib/api/links";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export default withLinksAuth(
  async (req, res, _session, _project, domain) => {
    // GET /api/links/[key]/exists - check if a key exists
    if (req.method === "GET") {
      const { key } = req.query as { key: string };
      const response = await checkIfKeyExists(domain || PUBLIC_ROOT_DOMAIN, key);
      return res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  },
  {
    skipKeyCheck: true,
  },
);
