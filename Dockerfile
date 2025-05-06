# マルチステージ構成
# ビルド用のステージを定義
FROM node:18 AS builder

# npm v10 をグローバルインストール（必要な場合）
RUN npm install -g npm@10

# 環境変数を受け取る
ARG NEXT_PUBLIC_API_URL

# 環境変数を設定（ビルド時に渡された値を使用）
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 作業ディレクトリ作成
WORKDIR /app

# package.json と package-lock.json をコピー
# 依存関係のインストールをキャッシュするため、最初にコピー
# これにより、依存関係が変更されない限り、キャッシュが利用される
COPY package*.json ./

# 依存関係をインストール（production なら --omit=dev でも可）
RUN npm install

# アプリのソースコードをコピー
COPY . .

# Next.js をビルド
RUN npm run build

# 本番用のステージを定義
FROM node:18-slim AS production

WORKDIR /app

# ビルドしたアプリをコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# ポートを公開（Next.js のデフォルトポート）
EXPOSE 3000

# アプリを起動（環境によって `start` の内容は調整）
CMD ["npm", "start"]
