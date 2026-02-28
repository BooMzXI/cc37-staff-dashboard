
# Base stage
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_ENV=PROD
ARG NEXT_PUBLIC_BACKEND_URL=https://api.comcamp.io
ARG NEXT_PUBLIC_ENABLED_TAB=MAIN,PROFILE,SEND_EMAIL,REGIS_QUESTION,ACADEMIC_QUESTION,ACADEMIC_CHAOS_QUESTION,CONFIRMATION,CHANGE_PASS,ADMIN

ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_ENABLED_TAB=$NEXT_PUBLIC_ENABLED_TAB

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm build

# Runner stage (Production)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables (can be overridden by docker-compose/docker run)
ENV NEXT_PUBLIC_ENV=PROD
ENV NEXT_PUBLIC_BACKEND_URL=https://api.comcamp.io
ENV NEXT_PUBLIC_ENABLED_TAB=MAIN,PROFILE,SEND_EMAIL,REGIS_QUESTION,ACADEMIC_QUESTION,ACADEMIC_CHAOS_QUESTION,CONFIRMATION,CHANGE_PASS,ADMIN

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs


COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
