# Repository Guidelines

spring-boot-sample-front への貢献者が一貫性を保って開発できるよう、リポジトリ固有のルールとヒントをまとめました。

## プロジェクト構造とモジュール

- ベース: Next.js 14 + TypeScript、型設定は `tsconfig.json` と `TypeDef.ts` に集約
- `src/components`: UI とドメイン別に `page` `repository` `store` `usecase` `ui` を配置
- `src/pages`: ルーティング定義。`pages/api` は Spring Boot への API プロキシ
- `src/utils` / `src/utils/dummy`: 共通関数とモックデータ
- 静的アセット: `public`、スタイルは `src/styles`

## ビルド・テスト・開発コマンド

- `npm install`: Volta が指定する Node 18.19.0 で依存解決
- `npm run dev`: 開発サーバー起動 (`http://localhost:3000`)、バックエンドと接続確認
- `npm run build`: 本番ビルドと型チェック
- `npm run start`: ビルド済み成果物を本番モードで確認
- `npm run lint`: Next.js 付属 ESLint で静的解析

## コーディングスタイルと命名規約

- インデント 2 スペース、文字列はダブルクォート
- 可能な範囲で型注釈を明示し、`@/` エイリアスでモジュール参照
- React コンポーネントはパスカルケース、Recoil フックは `useXxxState` / `useXxxMutators`
- ファイル名は機能単位 (例: `UserListTable.tsx`、`useUserListPaginationState.ts`)

## テスト方針

- 現在テストは未整備。新規機能追加時は Jest + React Testing Library を想定
- ページ単位で `__tests__` ディレクトリを作成し、成功/失敗ケースを最低 1 件ずつ
- モックデータは `src/utils/dummy` を再利用し、API 呼び出しは fetch モックで分離
- Lint が唯一の自動ガードのため、`npm run dev` 上での手動確認手順を残す

## コミットとプルリクエスト

- コミットメッセージは日本語で簡潔に要約 (例: `ユーザー一覧の検索条件を保存`)
- 1 コミット 1 目的を徹底し、リファクタと機能追加を分ける
- プルリクエスト本文では背景・変更点・確認手順・影響範囲を箇条書き
- 関連 Issue、スクリーンショット、確認ブラウザ、使用したバックエンド URL を添付

## 環境構成のヒント

- Volta を導入して `.volta` 設定通りの Node/npm を使用
- `.env.local` を作成し API エンドポイントや認証情報を管理 (例: `NEXT_PUBLIC_API_BASE`)
- Docker 利用時は既存 `Dockerfile` をベースに Spring Boot のエンドポイントをビルド引数化
