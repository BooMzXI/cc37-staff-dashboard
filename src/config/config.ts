export const config = {
    betterauth: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL
    },
    backend: {
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL
    },
    isProd: process.env.ENV === "PROD" ? true : false,
}