// 管理画面クライアント: GAS Web App との JSON 通信
//
// 使い方:
//   <script src="config.js"></script>
//   <script src="lib/adminClient.js"></script>
//   <script>
//     const client = new AdminClient(ADMIN_WEB_APP);
//     const res = await client.call('news', 'list');
//     // res = { ok: true, rows: [...] }
//   </script>
//
// 注意: GAS Web App は HTTP ステータスコードを返さない。
//       常に body.ok を見て成否を判定すること。

(function (global) {
  'use strict';

  class AdminClient {
    constructor(config) {
      if (!config || !config.url || !config.token) {
        throw new Error('AdminClient: config.url and config.token required');
      }
      this.url = config.url;
      this.token = config.token;
    }

    async call(target, op, params) {
      const body = Object.assign(
        { token: this.token, target: target, op: op },
        params || {}
      );
      // text/plain で送ると preflight を回避できる（GAS Web App の慣例）
      const res = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (!data.ok) {
        const err = new Error(data.error || 'unknown error');
        err.response = data;
        throw err;
      }
      return data;
    }

    // ヘルパー（よく使う組み合わせ）
    listNews()                     { return this.call('news', 'list'); }
    createNews(item)               { return this.call('news', 'create', { item }); }
    updateNews(rowIndex, item)     { return this.call('news', 'update', { rowIndex, item }); }
    deleteNews(rowIndex)           { return this.call('news', 'delete', { rowIndex }); }
    listContacts()                 { return this.call('contacts', 'list'); }
    markContactHandled(rowIndex, handled) {
      return this.call('contacts', 'markHandled', { rowIndex, handled });
    }
  }

  global.AdminClient = AdminClient;
})(window);
