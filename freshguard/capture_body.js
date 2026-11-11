/* 第一部分：截获 body 数据，不读取 sign_enable，不发送额外请求。 */
(function () {
  'use strict';
  try {
    if (typeof $request === 'undefined' ||
        !/^https:\/\/api\.ios222\.com\/task\/list(?:\?[^#]*)?$/i.test($request.url || '') ||
        String($request.method || '').toUpperCase() !== 'POST') {
      $done({});
      return;
    }
    var body = $request.body;
    if (typeof body !== 'string' && body && typeof body.length === 'number') {
      var text = '';
      for (var i = 0; i < body.length; i++) {
        if (body[i] > 127) throw new Error('Body contains non-ASCII bytes');
        text += String.fromCharCode(body[i]);
      }
      body = text;
    }
    if (typeof body !== 'string' || !body.trim()) throw new Error('Empty or unavailable body');
    if ($persistentStore.read('niuwabody') !== body) {
      if ($persistentStore.write(body, 'niuwabody') !== true) throw new Error('Persistent-store write failed');
      $notification.post('牛蛙助手信息已更新。', '', '');
      console.log('[牛蛙助手] niuwabody已更新；长度=' + body.length);
    }
  } catch (error) {
    console.log('[牛蛙助手] Body采集失败：' + String(error && error.message || error));
  }
  $done({});
}());
