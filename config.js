// ============================================
// Google スプレッドシート（お知らせ）の設定
// ============================================
// 1. Googleスプレッドシートを新規作成
// 2. 1行目にヘッダー: 日付 / カテゴリ / タイトル / 本文
// 3. ファイル → 共有 → ウェブに公開 → 形式「カンマ区切り形式(.csv)」→ 公開
// 4. 表示されたURLを下記に貼り付ける
const NEWS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRc6Ob8GWySboTUVPe4ICLr9E0eV-ZKRTf0lAey0uaiSaYYgr2xleW0MRjLwEsDyahxE9orqme6WekD/pub?output=csv';

// ============================================
// Google フォーム（お問い合わせ）の設定
// ============================================
// 1. Googleフォームを新規作成（質問: お名前/メール/電話/種別/内容）
// 2. 「回答」タブ → スプレッドシートに連携 + 「新しい回答のメール通知」ON
// 3. プレビュー画面で各入力欄を右クリック「検証」→ name="entry.XXXXXXXX" を確認
// 4. URLは「.../viewform」を「.../formResponse」に置き換える
// 5. 下記の YOUR_xxx を全て書き換える
const CONTACT_FORM = {
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSeodP-kP1Xmbdf73wYOSahKi_N3RjQxivfMbxvF4dJga1tqQw/formResponse',
  fields: {
    name:     'entry.733316120',
    email:    'entry.2050414994',
    tel:      'entry.1941496355',
    category: 'entry.1678097880',
    message:  'entry.889006848'
  }
};
