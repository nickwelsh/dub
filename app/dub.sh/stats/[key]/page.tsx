import { notFound } from "next/navigation";
import Stats from "#/ui/stats";
import { Suspense } from "react";
import { getLinkViaEdge } from "#/lib/planetscale";
import { constructMetadata } from "#/lib/utils";
import { redis } from "#/lib/upstash";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { key: string };
}) {
  if (params.key !== "github") {
    const data = await getLinkViaEdge(PUBLIC_ROOT_DOMAIN, params.key);

    // if the link doesn't exist in MySQL DB
    if (!data) {
      // check if it's an ephemeral demo link in Redis
      const ephemeralLink = await redis.get(`${PUBLIC_ROOT_DOMAIN}:${params.key}`);
      if (!ephemeralLink) {
        return;
      }
      // if the link is explicitly private (publicStats === false)
    } else if (data?.publicStats === 0) {
      return;
    }
  }

  return constructMetadata({
    title: `Stats for ${PUBLIC_ROOT_DOMAIN}/${params.key} – Dub`,
    description: `Dub is an open-source link management tool for modern marketing teams to create, share, and track short links.`,
    image: `https://${PUBLIC_ROOT_DOMAIN}/api/og/stats?domain=${PUBLIC_ROOT_DOMAIN}&key=${params.key}`,
  });
}

export async function generateStaticParams() {
  return [
    {
      domain: PUBLIC_ROOT_DOMAIN,
      key: "github",
    },
  ];
}

export default async function StatsPage({
  params,
}: {
  params: { key: string };
}) {
  if (params.key !== "github") {
    const data = await getLinkViaEdge(PUBLIC_ROOT_DOMAIN, params.key);
    if (!data) {
      const ephemeralLink = await redis.get(`${PUBLIC_ROOT_DOMAIN}:${params.key}`);
      if (!ephemeralLink) {
        notFound();
      }
    } else if (data?.publicStats === 0) {
      notFound();
    }
  }

  return (
    <div className="bg-gray-50">
      <Suspense fallback={<div className="h-screen w-full bg-gray-50" />}>
        <Stats staticDomain={PUBLIC_ROOT_DOMAIN} />
      </Suspense>
    </div>
  );
}
