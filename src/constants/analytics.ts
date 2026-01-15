import * as Sentry from "@sentry/react";
import ReactGA from "react-ga4";
import config from "./config";

let hasSubscribed = false;

export function initAnalytics() {

    const apiRegex = new RegExp(
        config.BASE_API_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const isProd =
        config.GA_ID &&
        !["localhost", "127.0.0.1"].includes(window.location.hostname);

    /** GOOGLE ANALYTIC */
    if (isProd) {
        ReactGA.initialize(config.GA_ID);
    }

    /** SENTRY */
    Sentry.init({
        dsn: config.SENTRY_DSN,
        integrations: [Sentry.browserTracingIntegration()],
        enableLogs: true,
        sendDefaultPii: true,
        tracesSampleRate: 1.0,
        tracePropagationTargets: ["localhost", apiRegex],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}

export function subscribeGA(router: any) {
    if (
        hasSubscribed ||
        !config.GA_ID ||
        ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ) {
        return;
    }

    hasSubscribed = true;

    router.subscribe((state: any) => {
        const location = state.location;

        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search,
            title: document.title,
        });
    });
}
