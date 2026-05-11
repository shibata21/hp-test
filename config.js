// ============================================
// Google スプレッドシート（お知らせ）の設定
// ============================================
// e2etest 用リソース（infra_auto provision で生成）
const NEWS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1bxaLmID6wCFWq8oaPZ6fjwRVYfpuQrpZb6lW5c3faF8/gviz/tq?tqx=out:csv&sheet=%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B';

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
// Apps Script Web App（admin/ から叩く）の設定
// ============================================
// e2etest 用 Apps Script プロジェクト（infra_auto provision で生成）
// adminToken は1クライアント1個、コードに直書きされる前提（hp_test は自分用なので問題なし）
const ADMIN_WEB_APP = {
  url: 'https://script.google.com/macros/s/AKfycby9yc_qKIQOvLwX8Hx8UDM-3MoUZMUDIMfKV3JjFqRMozOdLMfyebqn_Gq5e5g46_vp/exec',
  token: 'e9CYdTkJ9tri4b4utnWE8SBJQXI4CTRj0Z2gzhY9F3Q'
};
