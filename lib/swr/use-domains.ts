import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWR from "swr";
import { DomainProps } from "#/lib/types";
import { fetcher } from "#/lib/utils";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export default function useDomains({ domain }: { domain?: string } = {}) {
  const router = useRouter();

  let { slug } = router.query as {
    slug: string;
  };

  const { data, error } = useSWR<DomainProps[]>(
    slug && `/api/projects/${slug}/domains`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  const domains = useMemo(() => {
    if (router.isReady) {
      return slug
        ? data
        : ([
            {
              slug: PUBLIC_ROOT_DOMAIN,
              verified: true,
              primary: true,
              target: `https://${PUBLIC_ROOT_DOMAIN}`,
              type: "redirect",
            },
          ] as DomainProps[]);
    }
  }, [data, router.isReady]);

  return {
    domains,
    primaryDomain: domains?.find((domain) => domain.primary)?.slug,
    verified: domain
      ? // If a domain is passed, check if it's verified
        domains?.find((d) => d.slug === domain)?.verified
      : // If no domain is passed, check if any of the domains are verified
        domains?.some((d) => d.verified),
    loading: !domains && !error,
    error,
  };
}
