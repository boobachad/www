// /app/blogs/[slug]/ShowViews.tsx

import redis from "@/lib/redis";
import crypto from "crypto";
import { headers } from "next/headers";


async function recordViewCount(slug: string) {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for") ?? "";
    const realIp = headersList.get("x-real-ip") ?? "";

    const ipSource = forwardedFor || realIp || "localhost";

    const ip = ipSource.split(",")[0].trim();

    const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

    const viewKey = ["pageviews", "blogs", slug].join(":");
    const ipViewKey = ["ip", hashedIp, "views", slug].join(":");

    const hasViewed = await redis.get(ipViewKey);

    let viewCount: number;

    if (!hasViewed) {
        const pipeline = redis.pipeline();
        pipeline.incr(viewKey);
        pipeline.set(ipViewKey, "1");
        await pipeline.exec();

        viewCount = (await redis.get<number>(viewKey)) ?? 0;
        return { message: "View Added", status: 202, views: viewCount };
    } else {
        viewCount = (await redis.get<number>(viewKey)) ?? 0;
        return { message: "Already viewed", status: 200, views: viewCount };
    }
}

const ShowViews = async ({ slug }: { slug: string }) => {
    try {
    const { views } = await recordViewCount(slug);
        return (
            <div className="inline-block rounded bg-neutral-900/80 px-3 py-1 text-xs font-mono text-gray-400 border border-neutral-800 shadow-sm">
                {views} views
            </div>
        );
    } catch (error) {
        return (
            <div className="inline-block rounded bg-neutral-900/80 px-3 py-1 text-xs font-mono text-gray-400 border border-neutral-800 shadow-sm">
                <span role="img" aria-label="views unavailable">👀</span>
            </div>
        );
    }
};

export default ShowViews;