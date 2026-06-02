/* ==========================================================================
   EvomniAlert — 訊息組件
   - EvomniAlert : 後端用，支援 HTML 字串，走 DOMPurify 清洗
   - SiteAlert   : 前端用，純文字（textContent），零 XSS 風險
   依附：purify.min.js (DOMPurify v3)，僅 EvomniAlert 需要
   ========================================================================== */
(function (global) {
    'use strict';

    /* ------------------------------------------------------------------
       Icons — inline SVG 資料（避開檔案路徑相對性問題）
       - 以 createElementNS 建構，不經 innerHTML 解析
       - 不寫入 CSS，保持 JS 單一責任
       ------------------------------------------------------------------ */
    var SVG_NS = 'http://www.w3.org/2000/svg';

    var ICON_DATA = {
        success: {
            fill: 'currentColor',
            d: 'M31.5 0C48.897 0 63 14.103 63 31.5C63 48.897 48.897 63 31.5 63C14.103 63 0 48.897 0 31.5C0 14.103 14.103 0 31.5 0ZM48.2822 21.4023C47.4035 20.5237 45.9793 20.5237 45.1006 21.4023L27.5996 38.9023L19.6445 30.9482C18.7659 30.0696 17.3406 30.0696 16.4619 30.9482C15.5837 31.8269 15.5835 33.2513 16.4619 34.1299L26.0078 43.6758C26.8865 44.5545 28.3117 44.5545 29.1904 43.6758L48.2822 24.584C49.1608 23.7054 49.1606 22.281 48.2822 21.4023Z'
        },
        error: {
            fill: '#EB5757',
            d: 'M31.5 0C48.897 0 63 14.103 63 31.5C63 48.897 48.897 63 31.5 63C14.103 63 0 48.897 0 31.5C0 14.103 14.103 0 31.5 0ZM42.3145 20.6855C41.4358 19.8069 40.0115 19.8069 39.1328 20.6855L31.5 28.3184L23.8672 20.6855C22.9885 19.8069 21.5642 19.8069 20.6855 20.6855C19.8069 21.5642 19.8069 22.9885 20.6855 23.8672L28.3184 31.5L20.6855 39.1328C19.8069 40.0115 19.8069 41.4358 20.6855 42.3145C21.5642 43.1931 22.9885 43.1931 23.8672 42.3145L31.5 34.6816L39.1328 42.3145C40.0115 43.1931 41.4358 43.1931 42.3145 42.3145C43.1931 41.4358 43.1931 40.0115 42.3145 39.1328L34.6816 31.5L42.3145 23.8672C43.1931 22.9885 43.1931 21.5642 42.3145 20.6855Z'
        },
        warning: {
            fill: '#F39C12',
            d: 'M31.5 3.9375C33.2484 3.9375 34.8647 4.87324 35.7373 6.38672L61.5566 51.1201C62.4286 52.6327 62.428 54.5027 61.5566 56.0156C60.685 57.5286 59.0631 58.4687 57.3193 58.4688H5.68066C3.9371 58.4687 2.31501 57.5287 1.44336 56.0156C0.571887 54.5027 0.571363 52.6327 1.44336 51.1201L27.2617 6.38672C28.1343 4.87329 29.7517 3.9375 31.5 3.9375ZM31.5 40.6875C29.6914 40.6875 28.2188 42.1602 28.2188 43.9688C28.2188 45.7773 29.6914 47.25 31.5 47.25C33.3086 47.25 34.7812 45.7773 34.7812 43.9688C34.7812 42.1602 33.3086 40.6875 31.5 40.6875ZM31.5 21C29.6914 21 28.2188 22.4727 28.2188 24.2812V34.7812C28.2188 36.5898 29.6914 38.0625 31.5 38.0625C33.3086 38.0625 34.7812 36.5898 34.7812 34.7812V24.2812C34.7812 22.4727 33.3086 21 31.5 21Z'
        },
        info: {
            fill: '#409EFF',
            d: 'M31.5 0C48.897 0 63 14.103 63 31.5C63 48.897 48.897 63 31.5 63C14.103 63 0 48.897 0 31.5C0 14.103 14.103 0 31.5 0ZM31.5 26.25C29.6914 26.25 28.2188 27.7227 28.2188 29.5312V45.2812C28.2188 47.0898 29.6914 48.5625 31.5 48.5625C33.3086 48.5625 34.7812 47.0898 34.7812 45.2812V29.5312C34.7812 27.7227 33.3086 26.25 31.5 26.25ZM31.5 15.75C29.6914 15.75 28.2188 17.2227 28.2188 19.0312C28.2188 20.8398 29.6914 22.3125 31.5 22.3125C33.3086 22.3125 34.7812 20.8398 34.7812 19.0312C34.7812 17.2227 33.3086 15.75 31.5 15.75Z'
        }
    };

    function buildSvgIcon(type) {
        var data = ICON_DATA[type] || ICON_DATA.info;
        var svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('viewBox', '0 0 63 63');
        svg.setAttribute('width', '63');
        svg.setAttribute('height', '63');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('aria-hidden', 'true');
        var path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', data.d);
        path.setAttribute('fill', data.fill);
        svg.appendChild(path);
        return svg;
    }

    var DEFAULT_DURATION = 2000;
    var CLOSE_ANIMATION_MS = 180;   // 須與 CSS .is-closing 動畫時間一致
    var VALID_TYPES = ['success', 'error', 'warning', 'info'];

    var PURIFY_CONFIG = {
        ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'br', 'a', 'span'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        ALLOWED_URI_REGEXP: /^(?:https?|mailto|tel):/i,
        FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
        KEEP_CONTENT: true
    };

    /* ------------------------------------------------------------------
       內部狀態：佇列
       ------------------------------------------------------------------ */
    var queue = [];
    var activeItem = null;
    var nextId = 1;

    /* ------------------------------------------------------------------
       DOMPurify 載入檢查（fail-safe）
       ------------------------------------------------------------------ */
    function hasPurifier() {
        return typeof global.DOMPurify !== 'undefined'
            && typeof global.DOMPurify.sanitize === 'function';
    }

    /**
     * 清洗 HTML 字串
     * @param {string} raw
     * @returns {string} sanitized HTML
     */
    function purify(raw) {
        if (raw == null) return '';
        if (!hasPurifier()) {
            console.error('[EvomniAlert] DOMPurify 未載入，已改用純文字模式。請確認 purify.min.js 已正確引用。');
            return escapeHtml(String(raw));
        }
        return global.DOMPurify.sanitize(String(raw), PURIFY_CONFIG);
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* ------------------------------------------------------------------
       DOM 模板 — 全部用 DOM API 建構，避免 innerHTML 審計疑慮
       ------------------------------------------------------------------ */
    function el(tag, className) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        return node;
    }

    function buildDialog() {
        var dialog = el('dialog', 'evomnialert');

        var wrapper = el('div', 'evomnialert-wrapper');

        var closeBtn = el('button', 'evomnialert-close');
        closeBtn.type = 'button';
        closeBtn.setAttribute('data-close', '');
        closeBtn.setAttribute('aria-label', 'close');

        // icon 容器；SVG 於 renderAndOpen 依 type 動態插入
        var iconSpan = el('span', 'evomnialert-icon');

        var titleBlock = el('div', 'evomnialert-title');
        var titleSpan = el('span', 'title');
        var descP = el('p', 'title-desc');
        titleBlock.appendChild(titleSpan);
        titleBlock.appendChild(descP);

        var footer = el('div', 'evomnialert-footer');
        footer.hidden = true;
        var confirmBtn = el('button', 'evomnialert-confirm');
        confirmBtn.type = 'button';
        confirmBtn.setAttribute('data-confirm', '');
        confirmBtn.textContent = 'OK';
        footer.appendChild(confirmBtn);

        wrapper.appendChild(closeBtn);
        wrapper.appendChild(iconSpan);
        wrapper.appendChild(titleBlock);
        wrapper.appendChild(footer);
        dialog.appendChild(wrapper);

        return dialog;
    }

    /* ------------------------------------------------------------------
       顯示佇列中的下一則
       ------------------------------------------------------------------ */
    function processQueue() {
        if (activeItem || queue.length === 0) return;

        var item = queue.shift();
        activeItem = item;
        renderAndOpen(item);
    }

    /* ------------------------------------------------------------------
       渲染並開啟 dialog
       ------------------------------------------------------------------ */
    function renderAndOpen(item) {
        var dialog = buildDialog();
        var wrapper = dialog.querySelector('.evomnialert-wrapper');
        var iconContainer = dialog.querySelector('.evomnialert-icon');
        var titleEl = dialog.querySelector('.title');
        var descEl = dialog.querySelector('.title-desc');
        var footer = dialog.querySelector('.evomnialert-footer');
        var closeBtn = dialog.querySelector('[data-close]');
        var confirmBtn = dialog.querySelector('[data-confirm]');

        dialog.setAttribute('data-type', item.type);
        dialog.setAttribute('role', item.type === 'error' ? 'alertdialog' : 'dialog');
        wrapper.setAttribute('aria-live', item.type === 'error' ? 'assertive' : 'polite');

        iconContainer.appendChild(buildSvgIcon(item.type));

        // 標題與內容
        if (item.safe) {
            // 純文字模式（SiteAlert）
            titleEl.textContent = item.title || '';
            if (item.desc) {
                descEl.textContent = item.desc;
            } else {
                descEl.remove();
            }
        } else {
            // DOMPurify 模式（EvomniAlert）
            titleEl.innerHTML = purify(item.title || '');
            if (item.desc) {
                descEl.innerHTML = purify(item.desc);
            } else {
                descEl.remove();
            }
        }

        // 顯示 OK 鈕（error 預設開啟；其他型可透過 confirmButton 選項開啟）
        if (item.confirmButton) {
            footer.hidden = false;
        }

        // 右上 X 按鈕（logout 等流程可隱藏）
        if (!item.closeButton) {
            closeBtn.hidden = true;
        }

        // 綁定關閉事件（加 .is-closing 觸發 fade-out，動畫結束再真正 close）
        var closed = false;
        function closeOnce() {
            if (closed) return;
            closed = true;
            if (item.timer) clearTimeout(item.timer);
            dialog.classList.add('is-closing');
            setTimeout(function () {
                dialog.close();
            }, CLOSE_ANIMATION_MS);
        }

        // 攔截 ESC：原生 cancel 事件會立即 close 導致無動畫，改走 closeOnce
        dialog.addEventListener('cancel', function (ev) {
            ev.preventDefault();
            closeOnce();
        });

        closeBtn.addEventListener('click', closeOnce);
        confirmBtn.addEventListener('click', function () {
            if (typeof item.onConfirm === 'function') {
                try { item.onConfirm(); } catch (e) { console.error(e); }
            }
            closeOnce();
        });

        // backdrop 關閉（顯示 OK 鈕時不允許，避免誤觸略過 callback）
        if (!item.confirmButton) {
            dialog.addEventListener('click', function (ev) {
                if (ev.target === dialog) closeOnce();
            });
        }

        // 關閉後清理、觸發 onClose、跑下一則
        dialog.addEventListener('close', function () {
            if (typeof item.onClose === 'function') {
                try { item.onClose(); } catch (e) { console.error(e); }
            }
            if (dialog.parentNode) dialog.parentNode.removeChild(dialog);
            activeItem = null;
            processQueue();
        });

        document.body.appendChild(dialog);
        dialog.showModal();

        // 初始 focus
        if (item.confirmButton) {
            confirmBtn.focus();
        } else {
            closeBtn.focus();
        }

        // 自動關閉（有 OK 鈕時永遠不關，必須手動確認）
        if (!item.confirmButton && item.duration > 0) {
            item.timer = setTimeout(closeOnce, item.duration);
        }

        // 暴露給 dismiss 使用
        item._close = closeOnce;
    }

    /* ------------------------------------------------------------------
       入列（含 error 插隊）
       ------------------------------------------------------------------ */
    function enqueue(item) {
        if (item.type === 'error') {
            queue.unshift(item);
        } else {
            queue.push(item);
        }
        processQueue();
        return item.id;
    }

    /* ------------------------------------------------------------------
       共用：normalise & validate
       ------------------------------------------------------------------ */
    function normalise(options, safe) {
        var type = VALID_TYPES.indexOf(options.type) >= 0 ? options.type : 'info';

        // confirmButton：true 時顯示 OK 鈕、禁止自動關閉與 backdrop 關閉
        // 預設規則：error 型一律開啟；其他型如有傳入 onConfirm 也自動開啟（否則 callback 無從觸發）
        var confirmButton;
        if (typeof options.confirmButton === 'boolean') {
            confirmButton = options.confirmButton;
        } else {
            confirmButton = (type === 'error') || (typeof options.onConfirm === 'function');
        }

        var duration;
        if (confirmButton) {
            duration = 0;
        } else if (typeof options.duration === 'number') {
            duration = Math.max(0, options.duration);
        } else {
            duration = DEFAULT_DURATION;
        }

        // closeButton：右上 X 按鈕，預設 true
        var closeButton = typeof options.closeButton === 'boolean'
            ? options.closeButton
            : true;

        return {
            id: nextId++,
            type: type,
            title: options.title,
            desc: options.desc,
            duration: duration,
            confirmButton: confirmButton,
            closeButton: closeButton,
            onConfirm: options.onConfirm,
            onClose: options.onClose,
            safe: !!safe,
            timer: null,
            _close: null
        };
    }

    /* ------------------------------------------------------------------
       dismiss（主動移除）
       ------------------------------------------------------------------ */
    function dismiss(id) {
        if (activeItem && activeItem.id === id) {
            if (typeof activeItem._close === 'function') activeItem._close();
            return true;
        }
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].id === id) {
                queue.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /* ------------------------------------------------------------------
       logout 快捷工廠：成功圖示 + OK 鈕 + 按 OK 導向指定頁面
       ------------------------------------------------------------------ */
    function makeLogout(safe) {
        return function (options) {
            options = options || {};
            var redirect = options.redirect || '/';
            var onConfirm = typeof options.onConfirm === 'function'
                ? options.onConfirm
                : function () { window.location.href = redirect; };

            return enqueue(normalise({
                type: 'success',
                title: options.title || '登出成功',
                desc: options.desc || '',
                confirmButton: true,
                closeButton: false,
                onConfirm: onConfirm,
                onClose: options.onClose
            }, safe));
        };
    }

    /* ------------------------------------------------------------------
       EvomniAlert（後端用，可傳 HTML）
       ------------------------------------------------------------------ */
    var EvomniAlert = {
        show: function (options) {
            if (!options || typeof options !== 'object') {
                console.error('[EvomniAlert] show() 需要傳入 options 物件');
                return null;
            }
            return enqueue(normalise(options, false));
        },

        /**
         * AJAX 回應快捷
         * 約定：{ ok: boolean, type?, title?, msg? }
         */
        fromResponse: function (res) {
            if (!res || typeof res !== 'object') {
                console.error('[EvomniAlert] fromResponse() 需要傳入物件');
                return null;
            }
            var type = res.type;
            if (!type) type = res.ok ? 'success' : 'error';

            return EvomniAlert.show({
                type: type,
                title: res.title,
                desc: res.msg
            });
        },

        /**
         * 登出快捷
         * @param {object} options
         * @param {string} [options.redirect='/'] 按 OK 後導向的路徑
         * @param {string} [options.title='登出成功']
         * @param {string} [options.desc]
         * @param {function} [options.onConfirm] 覆寫預設導向行為
         * @param {function} [options.onClose]
         */
        logout: makeLogout(false),

        dismiss: dismiss
    };

    /* ------------------------------------------------------------------
       SiteAlert（站台前端用，純文字）
       ------------------------------------------------------------------ */
    function makeSiteMethod(type) {
        return function (title, desc) {
            return enqueue(normalise({
                type: type,
                title: title,
                desc: desc
            }, true));
        };
    }

    var SiteAlert = {
        success: makeSiteMethod('success'),
        error: makeSiteMethod('error'),
        warning: makeSiteMethod('warning'),
        info: makeSiteMethod('info'),
        logout: makeLogout(true),
        dismiss: dismiss
    };

    /* ------------------------------------------------------------------
       Expose
       ------------------------------------------------------------------ */
    global.EvomniAlert = EvomniAlert;
    global.SiteAlert = SiteAlert;

}(window));
