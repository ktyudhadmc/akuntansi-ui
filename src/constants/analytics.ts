import * as Sentry from "@sentry/react";
import ReactGA from "react-ga4";
import config from "./config";

let hasSubscribed = false;
let sentryInited = false;

export function initAnalytics() {

    if (sentryInited) return;
    sentryInited = true;

    const apiRegex = new RegExp(
        config.BASE_API_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const isProd = config.GA_ID && !isLocalhost();

    /** GOOGLE ANALYTIC */
    if (isProd) ReactGA.initialize(config.GA_ID);

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
    if (hasSubscribed || !config.GA_ID || isLocalhost()) return;

    hasSubscribed = true;

    const sendPageView = (location: any) => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search,
            title: document.title,
        });
    };

    sendPageView(router.state.location);

    router.subscribe((state: any) => {
        sendPageView(state.location);
    });
}

function isLocalhost() {
    return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}
