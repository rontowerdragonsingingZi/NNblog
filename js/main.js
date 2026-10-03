(function () {
  var icons = {
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    down: '<path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'
  };

  document.querySelectorAll("span.ico").forEach(function (node) {
    var name = "";
    node.classList.forEach(function (item) {
      if (item.indexOf("ico-") === 0) name = item.slice(4);
    });
    if (!icons[name]) return;
    var holder = document.createElement("span");
    holder.innerHTML = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + "</svg>";
    if (holder.firstChild) node.replaceWith(holder.firstChild);
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  if (window.NN) {
    document.querySelectorAll("[data-download]").forEach(function (node) {
      var item = window.NN[node.getAttribute("data-download")];
      if (!item) return;
      if (item.href) node.setAttribute("href", item.href);
    });
    document.querySelectorAll("[data-file]").forEach(function (node) {
      var item = window.NN[node.getAttribute("data-file")];
      if (item && item.file) node.textContent = item.file;
    });
    document.querySelectorAll("[data-ver]").forEach(function (node) {
      var item = window.NN[node.getAttribute("data-ver")];
      if (item && item.version) node.textContent = item.version;
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy") || "";
      var value = text;
      if (text.charAt(0) === "#" || text.charAt(0) === "." || text.charAt(0) === "[") {
        var target = document.querySelector(text);
        if (target) value = target.textContent.trim();
      }
      var fallback = function () {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (err) {}
        area.remove();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).catch(fallback);
      } else {
        fallback();
      }
    });
  });

  document.querySelectorAll("[data-notes]").forEach(function (desk) {
    desk.querySelectorAll("[data-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-open");
        desk.querySelectorAll("[data-open]").forEach(function (item) {
          item.removeAttribute("aria-current");
        });
        button.setAttribute("aria-current", "true");
        desk.querySelectorAll("[data-panel]").forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-panel") !== id;
        });
      });
    });
  });
})();
