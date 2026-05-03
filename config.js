// ============================================
// microCMS の設定
// ============================================
// 1. microcms.io でサービスを作成
// 2. API「news」をリスト形式で作成（フィールド: title, category, body）
// 3. 設定 → API基本情報 から「サービスID」「GET APIキー」を取得
// 4. 下記の YOUR_SERVICE_ID と YOUR_API_KEY を書き換える
const MICROCMS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  apiKey:    'YOUR_API_KEY'
};

// ============================================
// Formspree の設定
// ============================================
// 1. formspree.io でフォームを作成
// 2. 発行されるエンドポイント（https://formspree.io/f/xxxxxxxx）の xxxxxxxx 部分を取得
// 3. 下記の YOUR_FORM_ID を書き換える
const FORMSPREE_CONFIG = {
  formId: 'YOUR_FORM_ID'
};
