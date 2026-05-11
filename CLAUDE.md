# hp_test — 自分用の動作確認サンドボックス

花屋「Fleur」をモチーフにした、**Google スプレッドシート + Google フォーム連携**の動作検証サイト。
ポートフォリオの **Natural サンプル** を流用したもの。

**位置づけ**: 私自身が Google 連携や admin/* 試作を試行錯誤するための場。クライアント案件の **テンプレ起点には使わない**（テンプレは [../hp_template/](../hp_template/) を参照）。手元で動作確認したい時、変な状態に置いてもいいサイトとして扱う。

## 親プロジェクト

事業モデル・共通技術スタック・共通の落とし穴は親リポジトリの
[../CLAUDE.md](../CLAUDE.md) を参照。

**特に重要な落とし穴**（親 CLAUDE.md 参照）:
- Googleフォームの選択肢は `<option value="...">` と1文字単位で完全一致が必須（不一致だとサイレント拒否）
- 画像は picsum.photos に集約（source.unsplash.com / Pollinations.ai はNG）

## 運用機能の設計

### お問い合わせ → Google フォーム
- **カスタムHTMLフォーム** → Google フォームの `formResponse` URLに POST
- `mode: 'no-cors'` + `FormData` で送信
- 通知: Gmail（フォーム設定で「新しい回答のメール通知」ON）
- 回答記録: 連携先の Google スプレッドシート

### お知らせ → Google スプレッドシート
- スプレッドシートを **CSV形式でウェブ公開**
- ブラウザJSが CSV を取得 → **PapaParse** でパース → 描画
- 列構成: `日付` / `カテゴリ` / `タイトル` / `本文`
- カテゴリは `お知らせ` / `イベント` / `新商品` / `季節` で自動色分け

### config.js
- すべての Google 接続先設定を1ファイルに集約
- クライアントごとに値を差し替えるだけで他クライアント用に転用可能

## 公開ページ（コミット済み・GitHub Pages デプロイ済み）

| ファイル | 役割 |
|---------|------|
| [index.html](index.html) | トップ（静的） |
| [about.html](about.html) | お店について（静的） |
| [products.html](products.html) | 商品一覧（JSでカテゴリフィルタ） |
| [news.html](news.html) | お知らせ — Googleスプレッドシート公開CSVを PapaParse で取得して描画 |
| [contact.html](contact.html) | お問い合わせ — Googleフォームに `mode: 'no-cors'` で POST |
| [config.js](config.js) | スプレッドシートCSV URL / フォーム POST URL / entry ID をここに集約 |

## admin/ — Apps Script Web App 接続済み

店舗オーナーが直接触る前提の管理画面。**localStorage モックから infra_auto が生成した GAS Web App への接続に移行済み**。

| ファイル | 内容 |
|---------|------|
| [admin/index.html](admin/index.html) | あいことばログイン（ダミー、submit→dashboard.html 遷移のみ） |
| [admin/dashboard.html](admin/dashboard.html) | 大きなボタン2つ（お知らせ管理 / お問い合わせ閲覧） |
| [admin/news.html](admin/news.html) | お知らせ CRUD。`lib/adminClient.js` 経由で NewsWebApp の doPost を叩く |
| [admin/contacts.html](admin/contacts.html) | お問い合わせ一覧・対応済みトグル・mailto 返信。`lib/adminClient.js` 経由で ContactsWebApp の doPost を叩く |

接続先は [config.js](config.js) の `ADMIN_WEB_APP` で定義（URL + adminToken）。infra_auto provision が e2etest クライアント向けに作った Apps Script プロジェクトをそのまま流用している。

### 設計メモ

- 認証は adminToken（32バイト URL セーフランダム）を body に含めるシンプル方式。Google サインインは要求しない。
- GAS Web App は HTTP ステータスコードを返せないので、レスポンス body の `ok` で成否判定する設計（[lib/adminClient.js](lib/adminClient.js) 参照）。
- フィールド名は GAS 側の Sheet ヘッダーと合わせている（`日付` / `カテゴリ` / `タイトル` / `本文` ／ `お名前` / `メールアドレス` / `電話番号` / `お問い合わせ種別` / `お問い合わせ内容` / `対応`）。
- 「対応済み」フラグは ContactsWebApp が回答シートの末尾列 `対応` に `済` を書き戻す。

### admin/ の UI 規約

- 操作者は **店舗オーナー（非技術者）想定**
- フォントサイズは公開ページより一回り大きい（text-lg / text-xl が標準）
- ボタンの動詞はやさしい日本語（「なおす」「けす」「ぜんぶ見る」「もどす」）
- 絵文字を機能の目印として使う（📢 お知らせ / 📩 問い合わせ / ✏️ 編集 / 🗑️ 削除）
- 破壊的操作は `confirm()` で確認

## デプロイ

- リモート: `https://github.com/shibata21/hp-test`
- 公開: `https://shibata21.github.io/hp-test/`
- master に push で GitHub Pages が自動反映（数分〜数十分かかることあり）

## クライアント納品時のチェックリスト

引き渡し前の作業:
1. `config.js` の `NEWS_SHEET_CSV_URL` をクライアント用シートのURLに置換
2. `config.js` の `CONTACT_FORM.url` をクライアント用フォームのURLに置換
3. `config.js` の `CONTACT_FORM.fields` の5つの entry ID を取得・差し替え
   - 取得方法: フォーム編集画面 →「事前入力したリンクを取得」→ 適当な値を入れて「リンクを取得」→ URL内の `entry.XXXXXXX` を抽出
4. [contact.html](contact.html) の `<option>` の値を、Google フォーム側の選択肢と **1文字単位で完全一致** させる
5. 各ページの店舗情報（住所・電話・営業時間）をクライアント情報に差し替え
6. 画像URL（picsum）をクライアントの実写真に差し替え

引き渡し時の説明事項:
- Google アカウントを使ってお知らせ更新（スプレッドシート編集）
- お問い合わせは Gmail に自動通知
- **「Google フォームの選択肢は勝手に変更しない」** ことを念押し
