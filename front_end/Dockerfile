FROM node:lts-alpine3.24 AS dev

WORKDIR /front_end
COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN chown -R node:node /front_end

USER node

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]