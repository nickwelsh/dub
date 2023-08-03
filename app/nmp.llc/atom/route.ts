import { allChangelogPosts } from "contentlayer/generated";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
        <title>Dub</title>
        <subtitle>Changelog</subtitle>
        <link href="https://${PUBLIC_ROOT_DOMAIN}/atom" rel="self"/>
        <link href="https://${PUBLIC_ROOT_DOMAIN}/"/>
        <updated>${allChangelogPosts[0].publishedAt}</updated>
        <id>https://${PUBLIC_ROOT_DOMAIN}/</id>${allChangelogPosts.map((post) => {
          return `
        <entry>
            <id>https://${PUBLIC_ROOT_DOMAIN}/changelog/${post.slug}</id>
            <title>${post.title}</title>
            <link href="https://${PUBLIC_ROOT_DOMAIN}/changelog/${post.slug}"/>
            <updated>${post.publishedAt}</updated>
            <author><name>${post.author}</name></author>
        </entry>`;
        }).join("")}
    </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    },
  );
}
