# HP Test — 運用検証用サイト

ポートフォリオの「Natural」サンプルをベースに、
**お問い合わせフォーム** と **お知らせ投稿機能** の実運用フローを検証するためのテストサイトです。

## セットアップ

### 1. Formspree（お問い合わせフォーム）

1. [formspree.io](https://formspree.io) でアカウント作成
2. 「+ New Form」でフォームを作成
3. 発行されるエンドポイント `https://formspree.io/f/xxxxxxxx` の **xxxxxxxx** をコピー
4. `config.js` の `FORMSPREE_CONFIG.formId` を書き換え

### 2. microCMS（お知らせ）

1. [microcms.io](https://microcms.io) でアカウント作成
2. サービスを作成（任意のサービスID）
3. API を作成:
   - API名: `お知らせ`
   - エンドポイント: `news`
   - 種類: **リスト形式**
4. APIスキーマでフィールドを追加:
   | フィールドID | 表示名 | 種類 |
   |---|---|---|
   | `title` | タイトル | テキストフィールド |
   | `category` | カテゴリ | テキストフィールド |
   | `body` | 本文 | リッチエディタ |
5. 設定 → API基本情報 で **GET API キー** を取得
6. `config.js` の `MICROCMS_CONFIG` を書き換え

## ファイル構成

```
hp_test/
├── index.html       — トップ（静的）
├── about.html       — お店について（静的）
├── products.html    — 商品一覧（静的）
├── news.html        — お知らせ（microCMSから動的取得）
├── contact.html     — お問い合わせ（Formspree送信）
└── config.js        — APIキー設定ファイル
```
