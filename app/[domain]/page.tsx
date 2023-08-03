import prisma from "#/lib/prisma";
import { constructMetadata } from "#/lib/utils";
import PlaceholderContent from "./placeholder";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const title = `${params.domain.toUpperCase()} - A ${PUBLIC_ROOT_DOMAIN.charAt(0).toUpperCase()}${PUBLIC_ROOT_DOMAIN.slice(1)} Custom Domain`;
  const description = `${params.domain.toUpperCase()} is a custom domain on Dub - an open-source link management tool for modern marketing teams to create, share, and track short links.`;

  return constructMetadata({
    title,
    description,
  });
}

export async function generateStaticParams() {
  const domains =
    process.env.VERCEL_ENV === "production"
      ? await prisma.domain.findMany({
          where: {
            verified: true,
            target: null,
            NOT: {
              slug: PUBLIC_ROOT_DOMAIN,
            },
          },
          select: {
            slug: true,
          },
        })
      : [];
  return domains.map(({ slug: domain }) => ({
    domain,
  }));
}

export default function CustomDomainPage() {
  return <PlaceholderContent />;
}
