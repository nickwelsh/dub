import { withLinksAuth } from "#/lib/auth";
import { getRandomKey } from "#/lib/api/links";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export default withLinksAuth(async (req, res, _session, _project, domain) => {
  // GET /api/links/_random – get a random key for a project
  if (req.method === "GET") {
    const response = await getRandomKey(domain || PUBLIC_ROOT_DOMAIN);
    return res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
