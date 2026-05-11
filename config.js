// ============================================
// Google フォーム（お問い合わせ）の設定
// ============================================
// e2etest 用フォーム（infra_auto provision で生成）
// 種別 <option value="..."> は Google フォーム側選択肢と1文字単位で一致:
//   ご注文・予約 / カスタムオーダー / イベントワークショップ
const CONTACT_FORM = {
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSeQEOX_cAoZCrEFqNxQihr7WB3NS5KhfJ94HbpVpojL7WNB3g/formResponse',
  fields: {
    name:     'entry.604966904',
    email:    'entry.84278166',
    tel:      'entry.1770445325',
    category: 'entry.1428718091',
    message:  'entry.1803576642'
  }
};

// ============================================
// Apps Script Web App の設定
// ============================================
// 1つの Web App で:
//   - GET → 公開ページの news.html がお知らせ一覧 JSON を取得（認証不要）
//   - POST + token → admin/* から CRUD（adminToken 認証）
// シート本体は非公開（オーナーのみ）。読み取りは必ずこの Web App 経由。
const ADMIN_WEB_APP = {
  url: 'https://script.google.com/macros/s/AKfycbzqkwNRXyL2cEFxHZ0_eMXO16KH6z4V-er4NMc7hkWHZAbt1s2jEFcyjSbAtH_oJlNz/exec',
  token: 'e9CYdTkJ9tri4b4utnWE8SBJQXI4CTRj0Z2gzhY9F3Q'
};
