// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (
  process.env.NODE_ENV == "production" ||
  process.env.NEXT_PRODUCTION_ENV == "production"
) {
  Sentry.init({
    dsn: "https://b3fa2181065b7d5ef0cc65ed8dd3c9df@o4509195591024640.ingest.us.sentry.io/4509195643846656",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
