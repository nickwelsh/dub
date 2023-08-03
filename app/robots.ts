import { isHomeHostname } from "#/lib/utils";
import { MetadataRoute } from "next";
import { headers } from "next/headers";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  let domain = headersList.get("host") as string;
  if (isHomeHostname(domain)) domain = PUBLIC_ROOT_DOMAIN;

  return {
    rules: {
      userAgent: "*",
      disallow: "/api/",
      allow: "/api/og/",
    },
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
