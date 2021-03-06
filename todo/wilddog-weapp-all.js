! function(t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.eio = e() : t.eio = e()
}(global, function() {
  return function(t) {
    function e(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        exports: {},
        id: n,
        loaded: !1
      };
      return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0)
  }([function(t, e, r) {
    "use strict";
    t.exports = r(1), global.eio = t.exports
  }, function(t, e, r) {
    "use strict";
    t.exports = r(2), t.exports.parser = r(6)
  }, function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(this instanceof n)) return new n(t, e);
      e = e || {}, t && "object" === ("undefined" == typeof t ? "undefined" : s(t)) && (e = t, t = null), t ? (t = p(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = p(e.host).host), this.secure = null != e.secure ? e.secure : global.location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || (global.location ? location.hostname : "localhost"), this.port = e.port || (global.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["websocket"], this.readyState = "", this.writeBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized;
      var r = "object" === ("undefined" == typeof global ? "undefined" : s(global)) && global;
      r.global === r && e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), this.open()
    }

    function o(t) {
      var e = {};
      for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      return e
    }
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      i = r(3),
      a = r(17),
      c = r(21)("engine.io-client:socket"),
      u = r(32),
      h = r(6),
      p = r(33),
      l = r(18);
    t.exports = n, n.priorWebsocketSuccess = !1, a(n.prototype), n.protocol = h.protocol, n.Socket = n, n.Transport = r(5), n.transports = r(3), n.parser = r(6), n.prototype.createTransport = function(t) {
      c('creating transport "%s"', t);
      var e = o(this.query);
      e.EIO = h.protocol, e.transport = t, this.id && (e.sid = this.id);
      var r = new i[t]({
        agent: this.agent,
        hostname: this.hostname,
        port: this.port,
        secure: this.secure,
        path: this.path,
        query: e,
        forceJSONP: this.forceJSONP,
        jsonp: this.jsonp,
        forceBase64: this.forceBase64,
        enablesXDR: this.enablesXDR,
        timestampRequests: this.timestampRequests,
        timestampParam: this.timestampParam,
        policyPort: this.policyPort,
        socket: this,
        pfx: this.pfx,
        key: this.key,
        passphrase: this.passphrase,
        cert: this.cert,
        ca: this.ca,
        ciphers: this.ciphers,
        rejectUnauthorized: this.rejectUnauthorized,
        perMessageDeflate: this.perMessageDeflate,
        extraHeaders: this.extraHeaders
      });
      return r
    }, n.prototype.open = function() {
      var t;
      if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) t = "websocket";
      else {
        if (0 === this.transports.length) {
          var e = this;
          return void setTimeout(function() {
            e.emit("error", "No transports available")
          }, 0)
        }
        t = this.transports[0]
      }
      this.readyState = "opening";
      try {
        t = this.createTransport(t)
      } catch (r) {
        return this.transports.shift(), void this.open()
      }
      t.open(), this.setTransport(t)
    }, n.prototype.setTransport = function(t) {
      c("setting transport %s", t.name);
      var e = this;
      this.transport && (c("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function() {
        e.onDrain()
      }).on("packet", function(t) {
        e.onPacket(t)
      }).on("error", function(t) {
        e.onError(t)
      }).on("close", function() {
        e.onClose("transport close")
      })
    }, n.prototype.probe = function(t) {
      function e() {
        if (l.onlyBinaryUpgrades) {
          var e = !this.supportsBinary && l.transport.supportsBinary;
          p = p || e
        }
        p || (c('probe transport "%s" opened', t), h.send([{
          type: "ping",
          data: "probe"
        }]), h.once("packet", function(e) {
          if (!p)
            if ("pong" === e.type && "probe" === e.data) {
              if (c('probe transport "%s" pong', t), l.upgrading = !0, l.emit("upgrading", h), !h) return;
              n.priorWebsocketSuccess = "websocket" === h.name, c('pausing current transport "%s"', l.transport.name), l.transport.pause(function() {
                p || "closed" !== l.readyState && (c("changing transport and sending upgrade packet"), u(), l.setTransport(h), h.send([{
                  type: "upgrade"
                }]), l.emit("upgrade", h), h = null, l.upgrading = !1, l.flush())
              })
            } else {
              c('probe transport "%s" failed', t);
              var r = new Error("probe error");
              r.transport = h.name, l.emit("upgradeError", r)
            }
        }))
      }

      function r() {
        p || (p = !0, u(), h.close(), h = null)
      }

      function o(e) {
        var n = new Error("probe error: " + e);
        n.transport = h.name, r(), c('probe transport "%s" failed because of error: %s', t, e), l.emit("upgradeError", n)
      }

      function s() {
        o("transport closed")
      }

      function i() {
        o("socket closed")
      }

      function a(t) {
        h && t.name !== h.name && (c('"%s" works - aborting "%s"', t.name, h.name), r())
      }

      function u() {
        h.removeListener("open", e), h.removeListener("error", o), h.removeListener("close", s), l.removeListener("close", i), l.removeListener("upgrading", a)
      }
      c('probing transport "%s"', t);
      var h = this.createTransport(t, {
          probe: 1
        }),
        p = !1,
        l = this;
      n.priorWebsocketSuccess = !1, h.once("open", e), h.once("error", o), h.once("close", s), this.once("close", i), this.once("upgrading", a), h.open()
    }, n.prototype.onOpen = function() {
      if (c("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
        c("starting upgrade probes");
        for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
      }
    }, n.prototype.onPacket = function(t) {
      if ("opening" === this.readyState || "open" === this.readyState) switch (c('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "pong":
          this.setPing(), this.emit("pong");
          break;
        case "error":
          var e = new Error("server error");
          e.code = t.data, this.onError(e);
          break;
        case "message":
          this.emit("data", t.data), this.emit("message", t.data)
      } else c('packet received with socket readyState "%s"', this.readyState)
    }, n.prototype.onHandshake = function(t) {
      this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
    }, n.prototype.onHeartbeat = function(t) {
      clearTimeout(this.pingTimeoutTimer);
      var e = this;
      e.pingTimeoutTimer = setTimeout(function() {
        "closed" !== e.readyState && e.onClose("ping timeout")
      }, t || e.pingInterval + e.pingTimeout)
    }, n.prototype.setPing = function() {
      var t = this;
      clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
        c("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
      }, t.pingInterval)
    }, n.prototype.ping = function() {
      var t = this;
      this.sendPacket("ping", function() {
        t.emit("ping")
      })
    }, n.prototype.onDrain = function() {
      this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }, n.prototype.flush = function() {
      "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (c("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
    }, n.prototype.write = n.prototype.send = function(t, e, r) {
      return this.sendPacket("message", t, e, r), this
    }, n.prototype.sendPacket = function(t, e, r, n) {
      if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
        r = r || {}, r.compress = !1 !== r.compress;
        var o = {
          type: t,
          data: e,
          options: r
        };
        this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
      }
    }, n.prototype.close = function() {
      function t() {
        n.onClose("forced close"), c("socket closing - telling transport to close"), n.transport.close()
      }

      function e() {
        n.removeListener("upgrade", e), n.removeListener("upgradeError", e), t()
      }

      function r() {
        n.once("upgrade", e), n.once("upgradeError", e)
      }
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        var n = this;
        this.writeBuffer.length ? this.once("drain", function() {
          this.upgrading ? r() : t()
        }) : this.upgrading ? r() : t()
      }
      return this
    }, n.prototype.onError = function(t) {
      c("socket error %j", t), n.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
    }, n.prototype.onClose = function(t, e) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        c('socket close with reason: "%s"', t);
        var r = this;
        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), r.writeBuffer = [], r.prevBufferLen = 0
      }
    }, n.prototype.filterUpgrades = function(t) {
      for (var e = [], r = 0, n = t.length; r < n; r++) ~u(this.transports, t[r]) && e.push(t[r]);
      return e
    }
  }, function(t, e, r) {
    "use strict";

    function n(t) {
      var e, r = !1,
        n = !1,
        o = !1 !== t.jsonp;
      if (global.location) {
        var s = "https:" === location.protocol,
          i = location.port;
        i || (i = s ? 443 : 80), r = t.hostname !== location.hostname || i !== t.port, n = t.secure !== s
      }
      if (t.xdomain = r, t.xscheme = n, e = new XMLHttpRequest(t), "open" in e && !t.forceJSONP) return new XHR(t);
      if (!o) throw new Error("JSONP disabled");
      return new JSONP(t)
    }
    var o = r(4);
    e.polling = n, e.websocket = o
  }, function(t, e, r) {
    "use strict";

    function n(t) {
      var e = t && t.forceBase64;
      e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, o.call(this, t)
    }
    var o = r(5),
      s = r(6),
      i = r(18),
      a = r(19),
      c = r(20),
      u = r(21)("engine.io-client:websocket"),
      h = r(24).WebSocket;
    t.exports = n, a(n, o), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype.doOpen = function() {
      if (this.check()) {
        var t = this.uri(),
          e = {
            agent: this.agent,
            perMessageDeflate: this.perMessageDeflate
          };
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (e.headers = this.extraHeaders), this.ws = new h(t), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
      }
    }, n.prototype.addEventListeners = function() {
      var t = this;
      this.ws.onopen = function() {
        t.onOpen()
      }, this.ws.onclose = function() {
        t.onClose()
      }, this.ws.onmessage = function(e) {
        t.onData(e.data)
      }, this.ws.onerror = function(e) {
        t.onError("websocket error", e)
      }
    }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (n.prototype.onData = function(t) {
      var e = this;
      setTimeout(function() {
        o.prototype.onData.call(e, t)
      }, 0)
    }), n.prototype.write = function(t) {
      function e() {
        r.emit("flush"), setTimeout(function() {
          r.writable = !0, r.emit("drain")
        }, 0)
      }
      var r = this;
      this.writable = !1;
      for (var n = t.length, o = 0, i = n; o < i; o++) ! function(t) {
        s.encodePacket(t, r.supportsBinary, function(t) {
          try {
            r.ws.send(t)
          } catch (o) {
            u("websocket closed before onclose event")
          }--n || e()
        })
      }(t[o])
    }, n.prototype.onClose = function() {
      o.prototype.onClose.call(this)
    }, n.prototype.doClose = function() {
      "undefined" != typeof this.ws && this.ws.close()
    }, n.prototype.uri = function() {
      var t = this.query || {},
        e = this.secure ? "wss" : "ws",
        r = "";
      this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = i.encode(t), t.length && (t = "?" + t);
      var n = this.hostname.indexOf(":") !== -1;
      return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
    }, n.prototype.check = function() {
      return !(!h || "__initialize" in h && this.name === n.prototype.name)
    }
  }, function(t, e, r) {
    "use strict";

    function n(t) {
      this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders
    }
    var o = r(6),
      s = r(17);
    t.exports = n, s(n.prototype), n.prototype.onError = function(t, e) {
      var r = new Error(t);
      return r.type = "TransportError", r.description = e, this.emit("error", r), this
    }, n.prototype.open = function() {
      return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, n.prototype.close = function() {
      return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, n.prototype.send = function(t) {
      if ("open" !== this.readyState) throw new Error("Transport not open");
      this.write(t)
    }, n.prototype.onOpen = function() {
      this.readyState = "open", this.writable = !0, this.emit("open")
    }, n.prototype.onData = function(t) {
      var e = o.decodePacket(t, this.socket.binaryType);
      this.onPacket(e)
    }, n.prototype.onPacket = function(t) {
      this.emit("packet", t)
    }, n.prototype.onClose = function() {
      this.readyState = "closed", this.emit("close")
    }
  }, function(t, e, r) {
    "use strict";

    function n(t, r) {
      var n = "b" + e.packets[t.type] + t.data.data;
      return r(n)
    }

    function o(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      var o = t.data,
        s = new Uint8Array(o),
        i = new Uint8Array(1 + o.byteLength);
      i[0] = v[t.type];
      for (var a = 0; a < s.length; a++) i[a + 1] = s[a];
      return n(i.buffer)
    }

    function s(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      var o = new FileReader;
      return o.onload = function() {
        t.data = o.result, e.encodePacket(t, r, !0, n)
      }, o.readAsArrayBuffer(t.data)
    }

    function i(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      if (m) return s(t, r, n);
      var o = new Uint8Array(1);
      o[0] = v[t.type];
      var i = new k([o.buffer, t.data]);
      return n(i)
    }

    function a(t) {
      try {
        t = d.decode(t)
      } catch (e) {
        return !1
      }
      return t
    }

    function c(t, e, r) {
      for (var n = new Array(t.length), o = f(t.length, r), s = function(t, r, o) {
          e(r, function(e, r) {
            n[t] = r, o(e, n)
          })
        }, i = 0; i < t.length; i++) s(i, t[i], o)
    }
    var u, h = r(7),
      p = r(8),
      l = r(10),
      f = r(11),
      d = r(12);
    global && global.ArrayBuffer && (u = r(15));
    var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
      g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
      m = y || g;
    e.protocol = 3;
    var v = e.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
      },
      b = h(v),
      w = {
        type: "error",
        data: "parser error"
      },
      k = r(16);
    e.encodePacket = function(t, e, r, s) {
      "function" == typeof e && (s = e, e = !1), "function" == typeof r && (s = r, r = null);
      var a = void 0 === t.data ? void 0 : t.data.buffer || t.data;
      if (global.ArrayBuffer && a instanceof ArrayBuffer) return o(t, e, s);
      if (k && a instanceof global.Blob) return i(t, e, s);
      if (a && a.base64) return n(t, s);
      var c = v[t.type];
      return void 0 !== t.data && (c += r ? d.encode(String(t.data)) : String(t.data)), s("" + c)
    }, e.encodeBase64Packet = function(t, r) {
      var n = "b" + e.packets[t.type];
      if (k && t.data instanceof global.Blob) {
        var o = new FileReader;
        return o.onload = function() {
          var t = o.result.split(",")[1];
          r(n + t)
        }, o.readAsDataURL(t.data)
      }
      var s;
      try {
        s = String.fromCharCode.apply(null, new Uint8Array(t.data))
      } catch (i) {
        for (var a = new Uint8Array(t.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
        s = String.fromCharCode.apply(null, c)
      }
      return n += global.btoa(s), r(n)
    }, e.decodePacket = function(t, r, n) {
      if ("string" == typeof t || void 0 === t) {
        if ("b" == t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
        if (n && (t = a(t), t === !1)) return w;
        var o = t.charAt(0);
        return Number(o) == o && b[o] ? t.length > 1 ? {
          type: b[o],
          data: t.substring(1)
        } : {
          type: b[o]
        } : w
      }
      var s = new Uint8Array(t),
        o = s[0],
        i = l(t, 1);
      return k && "blob" === r && (i = new k([i])), {
        type: b[o],
        data: i
      }
    }, e.decodeBase64Packet = function(t, e) {
      var r = b[t.charAt(0)];
      if (!u) return {
        type: r,
        data: {
          base64: !0,
          data: t.substr(1)
        }
      };
      var n = u.decode(t.substr(1));
      return "blob" === e && k && (n = new k([n])), {
        type: r,
        data: n
      }
    }, e.encodePayload = function(t, r, n) {
      function o(t) {
        return t.length + ":" + t
      }

      function s(t, n) {
        e.encodePacket(t, !!i && r, !0, function(t) {
          n(null, o(t))
        })
      }
      "function" == typeof r && (n = r, r = null);
      var i = p(t);
      return r && i ? k && !m ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void c(t, s, function(t, e) {
        return n(e.join(""))
      }) : n("0:")
    }, e.decodePayload = function(t, r, n) {
      if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
      "function" == typeof r && (n = r, r = null);
      var o;
      if ("" == t) return n(w, 0, 1);
      for (var s, i, a = "", c = 0, u = t.length; c < u; c++) {
        var h = t.charAt(c);
        if (":" != h) a += h;
        else {
          if ("" == a || a != (s = Number(a))) return n(w, 0, 1);
          if (i = t.substr(c + 1, s), a != i.length) return n(w, 0, 1);
          if (i.length) {
            if (o = e.decodePacket(i, r, !0), w.type == o.type && w.data == o.data) return n(w, 0, 1);
            var p = n(o, c + s, u);
            if (!1 === p) return
          }
          c += s, a = ""
        }
      }
      return "" != a ? n(w, 0, 1) : void 0
    }, e.encodePayloadAsArrayBuffer = function(t, r) {
      function n(t, r) {
        e.encodePacket(t, !0, !0, function(t) {
          return r(null, t)
        })
      }
      return t.length ? void c(t, n, function(t, e) {
        var n = e.reduce(function(t, e) {
            var r;
            return r = "string" == typeof e ? e.length : e.byteLength, t + r.toString().length + r + 2
          }, 0),
          o = new Uint8Array(n),
          s = 0;
        return e.forEach(function(t) {
          var e = "string" == typeof t,
            r = t;
          if (e) {
            for (var n = new Uint8Array(t.length), i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
            r = n.buffer
          }
          e ? o[s++] = 0 : o[s++] = 1;
          for (var a = r.byteLength.toString(), i = 0; i < a.length; i++) o[s++] = parseInt(a[i]);
          o[s++] = 255;
          for (var n = new Uint8Array(r), i = 0; i < n.length; i++) o[s++] = n[i]
        }), r(o.buffer)
      }) : r(new ArrayBuffer(0))
    }, e.encodePayloadAsBlob = function(t, r) {
      function n(t, r) {
        e.encodePacket(t, !0, !0, function(t) {
          var e = new Uint8Array(1);
          if (e[0] = 1, "string" == typeof t) {
            for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
            t = n.buffer, e[0] = 0
          }
          for (var s = t instanceof ArrayBuffer ? t.byteLength : t.size, i = s.toString(), a = new Uint8Array(i.length + 1), o = 0; o < i.length; o++) a[o] = parseInt(i[o]);
          if (a[i.length] = 255, k) {
            var c = new k([e.buffer, a.buffer, t]);
            r(null, c)
          }
        })
      }
      c(t, n, function(t, e) {
        return r(new k(e))
      })
    }, e.decodePayloadAsBinary = function(t, r, n) {
      "function" == typeof r && (n = r, r = null);
      for (var o = t, s = [], i = !1; o.byteLength > 0;) {
        for (var a = new Uint8Array(o), c = 0 === a[0], u = "", h = 1; 255 != a[h]; h++) {
          if (u.length > 310) {
            i = !0;
            break
          }
          u += a[h]
        }
        if (i) return n(w, 0, 1);
        o = l(o, 2 + u.length), u = parseInt(u);
        var p = l(o, 0, u);
        if (c) try {
          p = String.fromCharCode.apply(null, new Uint8Array(p))
        } catch (f) {
          var d = new Uint8Array(p);
          p = "";
          for (var h = 0; h < d.length; h++) p += String.fromCharCode(d[h])
        }
        s.push(p), o = l(o, u)
      }
      var y = s.length;
      s.forEach(function(t, o) {
        n(e.decodePacket(t, r, !0), o, y)
      })
    }
  }, function(t, e) {
    "use strict";
    t.exports = Object.keys || function(t) {
      var e = [],
        r = Object.prototype.hasOwnProperty;
      for (var n in t) r.call(t, n) && e.push(n);
      return e
    }
  }, function(t, e, r) {
    "use strict";

    function n(t) {
      function e(t) {
        if (!t) return !1;
        if (global.Buffer && global.Buffer.isBuffer(t) || global.ArrayBuffer && t instanceof ArrayBuffer || global.Blob && t instanceof Blob || global.File && t instanceof File) return !0;
        if (s(t)) {
          for (var r = 0; r < t.length; r++)
            if (e(t[r])) return !0
        } else if (t && "object" == ("undefined" == typeof t ? "undefined" : o(t))) {
          t.toJSON && (t = t.toJSON());
          for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return !0
        }
        return !1
      }
      return e(t)
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      s = r(9);
    t.exports = n
  }, function(t, e) {
    "use strict";
    t.exports = Array.isArray || function(t) {
      return "[object Array]" == Object.prototype.toString.call(t)
    }
  }, function(t, e) {
    "use strict";
    t.exports = function(t, e, r) {
      var n = t.byteLength;
      if (e = e || 0, r = r || n, t.slice) return t.slice(e, r);
      if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n) return new ArrayBuffer(0);
      for (var o = new Uint8Array(t), s = new Uint8Array(r - e), i = e, a = 0; i < r; i++, a++) s[a] = o[i];
      return s.buffer
    }
  }, function(t, e) {
    "use strict";

    function r(t, e, r) {
      function o(t, n) {
        if (o.count <= 0) throw new Error("after called too many times");
        --o.count, t ? (s = !0, e(t), e = r) : 0 !== o.count || s || e(null, n)
      }
      var s = !1;
      return r = r || n, o.count = t, 0 === t ? e() : o
    }

    function n() {}
    t.exports = r
  }, function(t, e, r) {
    var n;
    (function(t) {
      "use strict";
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
      ! function(s) {
        function i(t) {
          for (var e, r, n = [], o = 0, s = t.length; o < s;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < s ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
          return n
        }

        function a(t) {
          for (var e, r = t.length, n = -1, o = ""; ++n < r;) e = t[n], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
          return o
        }

        function c(t, e) {
          return w(t >> e & 63 | 128)
        }

        function u(t) {
          if (0 == (4294967168 & t)) return w(t);
          var e = "";
          return 0 == (4294965248 & t) ? e = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (e = w(t >> 12 & 15 | 224), e += c(t, 6)) : 0 == (4292870144 & t) && (e = w(t >> 18 & 7 | 240), e += c(t, 12), e += c(t, 6)), e += w(63 & t | 128)
        }

        function h(t) {
          for (var e, r = i(t), n = r.length, o = -1, s = ""; ++o < n;) e = r[o], s += u(e);
          return s
        }

        function p() {
          if (b >= v) throw Error("Invalid byte index");
          var t = 255 & m[b];
          if (b++, 128 == (192 & t)) return 63 & t;
          throw Error("Invalid continuation byte")
        }

        function l() {
          var t, e, r, n, o;
          if (b > v) throw Error("Invalid byte index");
          if (b == v) return !1;
          if (t = 255 & m[b], b++, 0 == (128 & t)) return t;
          if (192 == (224 & t)) {
            var e = p();
            if (o = (31 & t) << 6 | e, o >= 128) return o;
            throw Error("Invalid continuation byte")
          }
          if (224 == (240 & t)) {
            if (e = p(), r = p(), o = (15 & t) << 12 | e << 6 | r, o >= 2048) return o;
            throw Error("Invalid continuation byte")
          }
          if (240 == (248 & t) && (e = p(), r = p(), n = p(), o = (15 & t) << 18 | e << 12 | r << 6 | n, o >= 65536 && o <= 1114111)) return o;
          throw Error("Invalid WTF-8 detected")
        }

        function f(t) {
          m = i(t), v = m.length, b = 0;
          for (var e, r = [];
            (e = l()) !== !1;) r.push(e);
          return a(r)
        }
        var d = "object" == o(e) && e,
          y = "object" == o(t) && t && t.exports == d && t,
          g = "object" == ("undefined" == typeof global ? "undefined" : o(global)) && global;
        g.global !== g && g.window !== g || (s = g);
        var m, v, b, w = String.fromCharCode,
          k = {
            version: "1.0.0",
            encode: h,
            decode: f
          };
        if ("object" == o(r(14)) && r(14)) n = function() {
          return k
        }.call(e, r, e, t), !(void 0 !== n && (t.exports = n));
        else if (d && !d.nodeType)
          if (y) y.exports = k;
          else {
            var S = {},
              x = S.hasOwnProperty;
            for (var A in k) x.call(k, A) && (d[A] = k[A])
          }
        else s.wtf8 = k
      }(void 0)
    }).call(e, r(13)(t))
  }, function(t, e) {
    "use strict";
    t.exports = function(t) {
      return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
  }, function(t, e) {
    (function(e) {
      t.exports = e
    }).call(e, {})
  }, function(t, e) {
    "use strict";
    ! function() {
      for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++) r[t.charCodeAt(n)] = n;
      e.encode = function(e) {
        var r, n = new Uint8Array(e),
          o = n.length,
          s = "";
        for (r = 0; r < o; r += 3) s += t[n[r] >> 2], s += t[(3 & n[r]) << 4 | n[r + 1] >> 4], s += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], s += t[63 & n[r + 2]];
        return o % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="), s
      }, e.decode = function(t) {
        var e, n, o, s, i, a = .75 * t.length,
          c = t.length,
          u = 0;
        "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
        var h = new ArrayBuffer(a),
          p = new Uint8Array(h);
        for (e = 0; e < c; e += 4) n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], s = r[t.charCodeAt(e + 2)], i = r[t.charCodeAt(e + 3)], p[u++] = n << 2 | o >> 4, p[u++] = (15 & o) << 4 | s >> 2, p[u++] = (3 & s) << 6 | 63 & i;
        return h
      }
    }()
  }, function(t, e) {
    "use strict";

    function r(t) {
      for (var e = 0; e < t.length; e++) {
        var r = t[e];
        if (r.buffer instanceof ArrayBuffer) {
          var n = r.buffer;
          if (r.byteLength !== n.byteLength) {
            var o = new Uint8Array(r.byteLength);
            o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer
          }
          t[e] = n
        }
      }
    }

    function n(t, e) {
      e = e || {};
      var n = new s;
      r(t);
      for (var o = 0; o < t.length; o++) n.append(t[o]);
      return e.type ? n.getBlob(e.type) : n.getBlob()
    }

    function o(t, e) {
      return r(t), new Blob(t, e || {})
    }
    var s = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder,
      i = function() {
        try {
          var t = new Blob(["hi"]);
          return 2 === t.size
        } catch (e) {
          return !1
        }
      }(),
      a = i && function() {
        try {
          var t = new Blob([new Uint8Array([1, 2])]);
          return 2 === t.size
        } catch (e) {
          return !1
        }
      }(),
      c = s && s.prototype.append && s.prototype.getBlob;
    t.exports = function() {
      return i ? a ? global.Blob : o : c ? n : void 0
    }()
  }, function(t, e) {
    "use strict";

    function r(t) {
      if (t) return n(t)
    }

    function n(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];
      return t
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
    }, r.prototype.once = function(t, e) {
      function r() {
        n.off(t, r), e.apply(this, arguments)
      }
      var n = this;
      return this._callbacks = this._callbacks || {}, r.fn = e, this.on(t, r), this
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var r = this._callbacks[t];
      if (!r) return this;
      if (1 == arguments.length) return delete this._callbacks[t], this;
      for (var n, o = 0; o < r.length; o++)
        if (n = r[o], n === e || n.fn === e) {
          r.splice(o, 1);
          break
        }
      return this
    }, r.prototype.emit = function(t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
        r = this._callbacks[t];
      if (r) {
        r = r.slice(0);
        for (var n = 0, o = r.length; n < o; ++n) r[n].apply(this, e)
      }
      return this
    }, r.prototype.listeners = function(t) {
      return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
    }, r.prototype.hasListeners = function(t) {
      return !!this.listeners(t).length
    }
  }, function(t, e) {
    "use strict";
    e.encode = function(t) {
      var e = "";
      for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
      return e
    }, e.decode = function(t) {
      for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
        var s = r[n].split("=");
        e[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
      }
      return e
    }
  }, function(t, e) {
    "use strict";
    t.exports = function(t, e) {
      var r = function() {};
      r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
    }
  }, function(t, e) {
    "use strict";

    function r(t) {
      var e = "";
      do e = i[t % a] + e, t = Math.floor(t / a); while (t > 0);
      return e
    }

    function n(t) {
      var e = 0;
      for (h = 0; h < t.length; h++) e = e * a + c[t.charAt(h)];
      return e
    }

    function o() {
      var t = r(+new Date);
      return t !== s ? (u = 0, s = t) : t + "." + r(u++)
    }
    for (var s, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, u = 0, h = 0; h < a; h++) c[i[h]] = h;
    o.encode = r, o.decode = n, t.exports = o
  }, function(t, e, r) {
    "use strict";

    function n() {
      return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
    }

    function o() {
      var t = arguments,
        r = this.useColors;
      if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff), !r) return t;
      var n = "color: " + this.color;
      t = [t[0], n, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
      var o = 0,
        s = 0;
      return t[0].replace(/%[a-z%]/g, function(t) {
        "%%" !== t && (o++, "%c" === t && (s = o))
      }), t.splice(s, 0, n), t
    }

    function s() {
      return "object" === ("undefined" == typeof console ? "undefined" : u(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
    }

    function i(t) {
      try {
        null == t ? e.storage.removeItem("debug") : e.storage.debug = t
      } catch (r) {}
    }

    function a() {
      var t;
      try {
        t = e.storage.debug
      } catch (r) {}
      return t
    }

    function c() {
      try {
        return window.localStorage
      } catch (t) {}
    }
    var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e = t.exports = r(22), e.log = s, e.formatArgs = o, e.save = i, e.load = a, e.useColors = n, e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function(t) {
      return JSON.stringify(t)
    }, e.enable(a())
  }, function(t, e, r) {
    "use strict";

    function n() {
      return e.colors[h++ % e.colors.length]
    }

    function o(t) {
      function r() {}

      function o() {
        var t = o,
          r = +new Date,
          s = r - (u || r);
        t.diff = s, t.prev = u, t.curr = r, u = r, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = n());
        var i = Array.prototype.slice.call(arguments);
        i[0] = e.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
        var a = 0;
        i[0] = i[0].replace(/%([a-z%])/g, function(r, n) {
          if ("%%" === r) return r;
          a++;
          var o = e.formatters[n];
          if ("function" == typeof o) {
            var s = i[a];
            r = o.call(t, s), i.splice(a, 1), a--
          }
          return r
        }), "function" == typeof e.formatArgs && (i = e.formatArgs.apply(t, i));
        var c = o.log || e.log || console.log.bind(console);
        c.apply(t, i)
      }
      r.enabled = !1, o.enabled = !0;
      var s = e.enabled(t) ? o : r;
      return s.namespace = t, s
    }

    function s(t) {
      e.save(t);
      for (var r = (t || "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++) r[o] && (t = r[o].replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
    }

    function i() {
      e.enable("")
    }

    function a(t) {
      var r, n;
      for (r = 0, n = e.skips.length; r < n; r++)
        if (e.skips[r].test(t)) return !1;
      for (r = 0, n = e.names.length; r < n; r++)
        if (e.names[r].test(t)) return !0;
      return !1
    }

    function c(t) {
      return t instanceof Error ? t.stack || t.message : t
    }
    e = t.exports = o, e.coerce = c, e.disable = i, e.enable = s, e.enabled = a, e.humanize = r(23), e.names = [], e.skips = [], e.formatters = {};
    var u, h = 0
  }, function(t, e) {
    "use strict";

    function r(t) {
      if (t = "" + t, !(t.length > 1e4)) {
        var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
        if (e) {
          var r = parseFloat(e[1]),
            n = (e[2] || "ms").toLowerCase();
          switch (n) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return r * h;
            case "days":
            case "day":
            case "d":
              return r * u;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return r * c;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return r * a;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return r * i;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return r
          }
        }
      }
    }

    function n(t) {
      return t >= u ? Math.round(t / u) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= i ? Math.round(t / i) + "s" : t + "ms"
    }

    function o(t) {
      return s(t, u, "day") || s(t, c, "hour") || s(t, a, "minute") || s(t, i, "second") || t + " ms"
    }

    function s(t, e, r) {
      if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s"
    }
    var i = 1e3,
      a = 60 * i,
      c = 60 * a,
      u = 24 * c,
      h = 365.25 * u;
    t.exports = function(t, e) {
      return e = e || {}, "string" == typeof t ? r(t) : e["long"] ? o(t) : n(t)
    }
  }, function(t, e, r) {
    "use strict";
    var n = r(25);
    t.exports = {
      WebSocket: n
    }, null == navigator && (navigator = {}, navigator.userAgent = "WeApp")
  }, function(t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function(e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = r(26),
      i = r(27),
      a = function() {
        function t(e) {
          var r = this;
          if (n(this, t), null == e) throw new TypeError("1 argument needed");
          try {
            var o = i.parse(e);
            if ("wss:" != o.protocol) throw new Error("protocol must be wss")
          } catch (s) {
            throw new SyntaxError("url in wrong format,protocol must be wss")
          }
          null != t.instance && (t.instance.close(), t.instance = null), t.instance = this, this.url = e, this.readyState = 0, this.onopen = null, this.onclose = null, this.onerror = null, this.onmessage = null, wx.connectSocket({
            url: e,
            header: {
              "content-type": "application/json"
            },
            method: "GET"
          }), wx.onSocketOpen(function() {
            r.readyState = t.OPEN, r.onopen && r.onopen.call(r), r.dispatchEvent({
              type: "open"
            })
          }), wx.onSocketError(function(t) {
            if ("" !== t.message) {
              var e = {
                type: "error",
                data: t
              };
              r.onerror && r.onerror.call(r, e), r.dispatchEvent(e)
            }
          }), wx.onSocketMessage(function(e) {
            if (r.readyState === t.OPEN || r.readyState === t.CLOSING) {
              var n = {
                type: "message",
                data: e.data
              };
              r.onmessage && r.onmessage.call(r, n), r.dispatchEvent(n)
            }
          }), wx.onSocketClose(function() {
            if (r.readyState = t.CLOSED, r.onclose) {
              var e = {
                type: "close",
                wasClean: !0,
                code: 0,
                reason: ""
              };
              r.onclose.call(r, e)
            }
          })
        }
        return o(t, [{
          key: "close",
          value: function() {
            wx.closeSocket()
          }
        }, {
          key: "send",
          value: function(t) {
            wx.sendSocketMessage({
              data: t
            })
          }
        }]), t
      }();
    a.prototype.addEventListener = s.addEventListener, a.prototype.removeEventListener = s.removeEventListener, a.prototype.dispatchEvent = s.dispatchEvent, a.CONNECTING = 0, a.OPEN = 1, a.CLOSING = 2, a.CLOSED = 3, a.instance = null, t.exports = a
  }, function(t, e) {
    "use strict";
    t.exports = function() {
      function t(t, e, r) {
        i.value = r, a(t, e, i), i.value = null
      }

      function e(e, r, n) {
        var o;
        u.call(e, r) ? o = e[r] : t(e, r, o = []), c.call(o, n) < 0 && o.push(n)
      }

      function r(t, e, r) {
        var n, o, s;
        if (u.call(t, e))
          for (r.target = t, n = t[e].slice(0), s = 0; s < n.length; s++) o = n[s], "function" == typeof o ? o.call(t, r) : "function" == typeof o.handleEvent && o.handleEvent(r)
      }

      function n(t, e, r) {
        var n, o;
        u.call(t, e) && (n = t[e], o = c.call(n, r), -1 < o && (n.splice(o, 1), n.length || delete t[e]))
      }
      var o = "@@",
        s = {},
        i = {
          configurable: !0,
          value: null
        },
        a = Object.defineProperty || function(t, e, r) {
          t[e] = r.value
        },
        c = [].indexOf || function(t) {
          for (var e = this.length; e-- && this[e] !== t;);
          return e
        },
        u = s.hasOwnProperty;
      return t(s, "addEventListener", function(t, r) {
        e(this, o + t, r)
      }), t(s, "dispatchEvent", function(t) {
        r(this, o + t.type, t)
      }), t(s, "removeEventListener", function(t, e) {
        n(this, o + t, e)
      }), s
    }()
  }, function(t, e, r) {
    "use strict";

    function n() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }

    function o(t, e, r) {
      if (t && u(t) && t instanceof n) return t;
      var o = new n;
      return o.parse(t, e, r), o
    }

    function s(t) {
      return c(t) && (t = o(t)), t instanceof n ? t.format() : n.prototype.format.call(t)
    }

    function i(t, e) {
      return o(t, !1, !0).resolve(e)
    }

    function a(t, e) {
      return t ? o(t, !1, !0).resolveObject(e) : e
    }

    function c(t) {
      return "string" == typeof t
    }

    function u(t) {
      return "object" === ("undefined" == typeof t ? "undefined" : l(t)) && null !== t
    }

    function h(t) {
      return null === t
    }

    function p(t) {
      return null == t
    }
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      f = r(28);
    e.parse = o, e.resolve = i, e.resolveObject = a, e.format = s, e.Url = n;
    var d = /^([a-z0-9.+-]+:)/i,
      y = /:[0-9]*$/,
      g = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
      m = ["{", "}", "|", "\\", "^", "`"].concat(g),
      v = ["'"].concat(m),
      b = ["%", "/", "?", ";", "#"].concat(v),
      w = ["/", "?", "#"],
      k = 255,
      S = /^[a-z0-9A-Z_-]{0,63}$/,
      x = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
      A = {
        javascript: !0,
        "javascript:": !0
      },
      C = {
        javascript: !0,
        "javascript:": !0
      },
      B = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
      },
      O = r(29);
    n.prototype.parse = function(t, e, r) {
      if (!c(t)) throw new TypeError("Parameter 'url' must be a string, not " + ("undefined" == typeof t ? "undefined" : l(t)));
      var n = t;
      n = n.trim();
      var o = d.exec(n);
      if (o) {
        o = o[0];
        var s = o.toLowerCase();
        this.protocol = s, n = n.substr(o.length)
      }
      if (r || o || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var i = "//" === n.substr(0, 2);
        !i || o && C[o] || (n = n.substr(2), this.slashes = !0)
      }
      if (!C[o] && (i || o && !B[o])) {
        for (var a = -1, u = 0; u < w.length; u++) {
          var h = n.indexOf(w[u]);
          h !== -1 && (a === -1 || h < a) && (a = h)
        }
        var p, y;
        y = a === -1 ? n.lastIndexOf("@") : n.lastIndexOf("@", a), y !== -1 && (p = n.slice(0, y), n = n.slice(y + 1), this.auth = decodeURIComponent(p)), a = -1;
        for (var u = 0; u < b.length; u++) {
          var h = n.indexOf(b[u]);
          h !== -1 && (a === -1 || h < a) && (a = h)
        }
        a === -1 && (a = n.length), this.host = n.slice(0, a), n = n.slice(a), this.parseHost(), this.hostname = this.hostname || "";
        var g = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!g)
          for (var m = this.hostname.split(/\./), u = 0, P = m.length; u < P; u++) {
            var j = m[u];
            if (j && !j.match(S)) {
              for (var E = "", U = 0, L = j.length; U < L; U++) E += j.charCodeAt(U) > 127 ? "x" : j[U];
              if (!E.match(S)) {
                var T = m.slice(0, u),
                  I = m.slice(u + 1),
                  q = j.match(x);
                q && (T.push(q[1]), I.unshift(q[2])), I.length && (n = "/" + I.join(".") + n), this.hostname = T.join(".");
                break
              }
            }
          }
        if (this.hostname.length > k ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !g) {
          for (var R = this.hostname.split("."), D = [], u = 0; u < R.length; ++u) {
            var M = R[u];
            D.push(M.match(/[^A-Za-z0-9_-]/) ? "xn--" + f.encode(M) : M)
          }
          this.hostname = D.join(".")
        }
        var z = this.port ? ":" + this.port : "",
          N = this.hostname || "";
        this.host = N + z, this.href += this.host, g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
      }
      if (!A[s])
        for (var u = 0, P = v.length; u < P; u++) {
          var _ = v[u],
            H = encodeURIComponent(_);
          H === _ && (H = escape(_)), n = n.split(_).join(H)
        }
      var F = n.indexOf("#");
      F !== -1 && (this.hash = n.substr(F), n = n.slice(0, F));
      var J = n.indexOf("?");
      if (J !== -1 ? (this.search = n.substr(J), this.query = n.substr(J + 1), e && (this.query = O.parse(this.query)), n = n.slice(0, J)) : e && (this.search = "", this.query = {}), n && (this.pathname = n), B[s] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        var z = this.pathname || "",
          M = this.search || "";
        this.path = z + M
      }
      return this.href = this.format(), this
    }, n.prototype.format = function() {
      var t = this.auth || "";
      t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
      var e = this.protocol || "",
        r = this.pathname || "",
        n = this.hash || "",
        o = !1,
        s = "";
      this.host ? o = t + this.host : this.hostname && (o = t + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && u(this.query) && Object.keys(this.query).length && (s = O.stringify(this.query));
      var i = this.search || s && "?" + s || "";
      return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || B[e]) && o !== !1 ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), i && "?" !== i.charAt(0) && (i = "?" + i), r = r.replace(/[?#]/g, function(t) {
        return encodeURIComponent(t)
      }), i = i.replace("#", "%23"), e + o + r + i + n
    }, n.prototype.resolve = function(t) {
      return this.resolveObject(o(t, !1, !0)).format()
    }, n.prototype.resolveObject = function(t) {
      if (c(t)) {
        var e = new n;
        e.parse(t, !1, !0), t = e
      }
      var r = new n;
      if (Object.keys(this).forEach(function(t) {
          r[t] = this[t]
        }, this), r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
      if (t.slashes && !t.protocol) return Object.keys(t).forEach(function(e) {
        "protocol" !== e && (r[e] = t[e])
      }), B[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
      if (t.protocol && t.protocol !== r.protocol) {
        if (!B[t.protocol]) return Object.keys(t).forEach(function(e) {
          r[e] = t[e]
        }), r.href = r.format(), r;
        if (r.protocol = t.protocol, t.host || C[t.protocol]) r.pathname = t.pathname;
        else {
          for (var o = (t.pathname || "").split("/"); o.length && !(t.host = o.shift()););
          t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== o[0] && o.unshift(""), o.length < 2 && o.unshift(""), r.pathname = o.join("/")
        }
        if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
          var s = r.pathname || "",
            i = r.search || "";
          r.path = s + i
        }
        return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
      }
      var a = r.pathname && "/" === r.pathname.charAt(0),
        u = t.host || t.pathname && "/" === t.pathname.charAt(0),
        l = u || a || r.host && t.pathname,
        f = l,
        d = r.pathname && r.pathname.split("/") || [],
        o = t.pathname && t.pathname.split("/") || [],
        y = r.protocol && !B[r.protocol];
      if (y && (r.hostname = "", r.port = null, r.host && ("" === d[0] ? d[0] = r.host : d.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === o[0] ? o[0] = t.host : o.unshift(t.host)), t.host = null), l = l && ("" === o[0] || "" === d[0])), u) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, d = o;
      else if (o.length) d || (d = []), d.pop(), d = d.concat(o), r.search = t.search, r.query = t.query;
      else if (!p(t.search)) {
        if (y) {
          r.hostname = r.host = d.shift();
          var g = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
          g && (r.auth = g.shift(), r.host = r.hostname = g.shift())
        }
        return r.search = t.search, r.query = t.query, h(r.pathname) && h(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
      }
      if (!d.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
      for (var m = d.slice(-1)[0], v = (r.host || t.host) && ("." === m || ".." === m) || "" === m, b = 0, w = d.length; w >= 0; w--) m = d[w], "." == m ? d.splice(w, 1) : ".." === m ? (d.splice(w, 1), b++) : b && (d.splice(w, 1), b--);
      if (!l && !f)
        for (; b--; b) d.unshift("..");
      !l || "" === d[0] || d[0] && "/" === d[0].charAt(0) || d.unshift(""), v && "/" !== d.join("/").substr(-1) && d.push("");
      var k = "" === d[0] || d[0] && "/" === d[0].charAt(0);
      if (y) {
        r.hostname = r.host = k ? "" : d.length ? d.shift() : "";
        var g = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
        g && (r.auth = g.shift(), r.host = r.hostname = g.shift())
      }
      return l = l || r.host && d.length, l && !k && d.unshift(""), d.length ? r.pathname = d.join("/") : (r.pathname = null, r.path = null), h(r.pathname) && h(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
    }, n.prototype.parseHost = function() {
      var t = this.host,
        e = y.exec(t);
      e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    }
  }, function(t, e, r) {
    var n;
    (function(t) {
      "use strict";
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
      ! function(s) {
        function i(t) {
          throw RangeError(q[t])
        }

        function a(t, e) {
          for (var r = t.length, n = []; r--;) n[r] = e(t[r]);
          return n
        }

        function c(t, e) {
          var r = t.split("@"),
            n = "";
          r.length > 1 && (n = r[0] + "@", t = r[1]), t = t.replace(I, ".");
          var o = t.split("."),
            s = a(o, e).join(".");
          return n + s
        }

        function u(t) {
          for (var e, r, n = [], o = 0, s = t.length; o < s;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < s ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
          return n
        }

        function h(t) {
          return a(t, function(t) {
            var e = "";
            return t > 65535 && (t -= 65536, e += M(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += M(t)
          }).join("")
        }

        function p(t) {
          return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : A
        }

        function l(t, e) {
          return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
        }

        function f(t, e, r) {
          var n = 0;
          for (t = r ? D(t / P) : t >> 1, t += D(t / e); t > R * B >> 1; n += A) t = D(t / R);
          return D(n + (R + 1) * t / (t + O))
        }

        function d(t) {
          var e, r, n, o, s, a, c, u, l, d, y = [],
            g = t.length,
            m = 0,
            v = E,
            b = j;
          for (r = t.lastIndexOf(U), r < 0 && (r = 0), n = 0; n < r; ++n) t.charCodeAt(n) >= 128 && i("not-basic"), y.push(t.charCodeAt(n));
          for (o = r > 0 ? r + 1 : 0; o < g;) {
            for (s = m, a = 1, c = A; o >= g && i("invalid-input"), u = p(t.charCodeAt(o++)), (u >= A || u > D((x - m) / a)) && i("overflow"), m += u * a, l = c <= b ? C : c >= b + B ? B : c - b, !(u < l); c += A) d = A - l, a > D(x / d) && i("overflow"), a *= d;
            e = y.length + 1, b = f(m - s, e, 0 == s), D(m / e) > x - v && i("overflow"), v += D(m / e), m %= e, y.splice(m++, 0, v)
          }
          return h(y)
        }

        function y(t) {
          var e, r, n, o, s, a, c, h, p, d, y, g, m, v, b, w = [];
          for (t = u(t), g = t.length, e = E, r = 0, s = j, a = 0; a < g; ++a) y = t[a], y < 128 && w.push(M(y));
          for (n = o = w.length, o && w.push(U); n < g;) {
            for (c = x, a = 0; a < g; ++a) y = t[a], y >= e && y < c && (c = y);
            for (m = n + 1, c - e > D((x - r) / m) && i("overflow"), r += (c - e) * m, e = c, a = 0; a < g; ++a)
              if (y = t[a], y < e && ++r > x && i("overflow"), y == e) {
                for (h = r, p = A; d = p <= s ? C : p >= s + B ? B : p - s, !(h < d); p += A) b = h - d, v = A - d, w.push(M(l(d + b % v, 0))), h = D(b / v);
                w.push(M(l(h, 0))), s = f(r, m, n == o), r = 0, ++n
              }++r, ++e
          }
          return w.join("")
        }

        function g(t) {
          return c(t, function(t) {
            return L.test(t) ? d(t.slice(4).toLowerCase()) : t
          })
        }

        function m(t) {
          return c(t, function(t) {
            return T.test(t) ? "xn--" + y(t) : t
          })
        }
        var v = "object" == o(e) && e && !e.nodeType && e,
          b = "object" == o(t) && t && !t.nodeType && t,
          w = "object" == ("undefined" == typeof global ? "undefined" : o(global)) && global;
        w.global !== w && w.window !== w && w.self !== w || (s = w);
        var k, S, x = 2147483647,
          A = 36,
          C = 1,
          B = 26,
          O = 38,
          P = 700,
          j = 72,
          E = 128,
          U = "-",
          L = /^xn--/,
          T = /[^\x20-\x7E]/,
          I = /[\x2E\u3002\uFF0E\uFF61]/g,
          q = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          },
          R = A - C,
          D = Math.floor,
          M = String.fromCharCode;
        if (k = {
            version: "1.3.2",
            ucs2: {
              decode: u,
              encode: h
            },
            decode: d,
            encode: y,
            toASCII: m,
            toUnicode: g
          }, "object" == o(r(14)) && r(14)) n = function() {
          return k
        }.call(e, r, e, t), !(void 0 !== n && (t.exports = n));
        else if (v && b)
          if (t.exports == v) b.exports = k;
          else
            for (S in k) k.hasOwnProperty(S) && (v[S] = k[S]);
        else s.punycode = k
      }(void 0)
    }).call(e, r(13)(t))
  }, function(t, e, r) {
    "use strict";
    e.decode = e.parse = r(30), e.encode = e.stringify = r(31)
  }, function(t, e) {
    "use strict";

    function r(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }
    t.exports = function(t, e, n, o) {
      e = e || "&", n = n || "=";
      var s = {};
      if ("string" != typeof t || 0 === t.length) return s;
      var i = /\+/g;
      t = t.split(e);
      var a = 1e3;
      o && "number" == typeof o.maxKeys && (a = o.maxKeys);
      var c = t.length;
      a > 0 && c > a && (c = a);
      for (var u = 0; u < c; ++u) {
        var h, p, l, f, d = t[u].replace(i, "%20"),
          y = d.indexOf(n);
        y >= 0 ? (h = d.substr(0, y), p = d.substr(y + 1)) : (h = d, p = ""), l = decodeURIComponent(h), f = decodeURIComponent(p), r(s, l) ? Array.isArray(s[l]) ? s[l].push(f) : s[l] = [s[l], f] : s[l] = f
      }
      return s
    }
  }, function(t, e) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      n = function(t) {
        switch ("undefined" == typeof t ? "undefined" : r(t)) {
          case "string":
            return t;
          case "boolean":
            return t ? "true" : "false";
          case "number":
            return isFinite(t) ? t : "";
          default:
            return ""
        }
      };
    t.exports = function(t, e, o, s) {
      return e = e || "&", o = o || "=", null === t && (t = void 0), "object" === ("undefined" == typeof t ? "undefined" : r(t)) ? Object.keys(t).map(function(r) {
        var s = encodeURIComponent(n(r)) + o;
        return Array.isArray(t[r]) ? t[r].map(function(t) {
          return s + encodeURIComponent(n(t))
        }).join(e) : s + encodeURIComponent(n(t[r]))
      }).join(e) : s ? encodeURIComponent(n(s)) + o + encodeURIComponent(n(t)) : ""
    }
  }, function(t, e) {
    "use strict";
    var r = [].indexOf;
    t.exports = function(t, e) {
      if (r) return t.indexOf(e);
      for (var n = 0; n < t.length; ++n)
        if (t[n] === e) return n;
      return -1
    }
  }, function(t, e) {
    "use strict";
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function(t) {
      var e = t,
        o = t.indexOf("["),
        s = t.indexOf("]");
      o != -1 && s != -1 && (t = t.substring(0, o) + t.substring(o, s).replace(/:/g, ";") + t.substring(s, t.length));
      for (var i = r.exec(t || ""), a = {}, c = 14; c--;) a[n[c]] = i[c] || "";
      return o != -1 && s != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
    }
  }])
});
(function(ns) {
  var CLIENT_VERSION = "2.5.11";
  var CLIENT_TYPE = "WX";
  ns.wrapper = function(goog, wd) {
    var h, n = this;

    function p(a) {
      return void 0 !== a
    }

    function aa() {}

    function ba(a) {
      a.ac = function() {
        return a.gf ? a.gf : a.gf = new a
      }
    }

    function da(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
          if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b
    }

    function ea(a) {
      return "array" == da(a)
    }

    function q(a) {
      return "string" == typeof a
    }

    function fa(a) {
      return "number" == typeof a
    }

    function ga(a) {
      return "function" == da(a)
    }

    function ha(a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b
    }

    function ia(a, b, c) {
      return a.call.apply(a.bind, arguments)
    }

    function ja(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c)
        }
      }
      return function() {
        return a.apply(b, arguments)
      }
    }

    function r(a, b, c) {
      r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
      return r.apply(null, arguments)
    }

    function ka(a, b) {
      var c = a.split("."),
        d = n;
      c[0] in d || !d.execScript || d.execScript("var " + c[0]);
      for (var e; c.length && (e = c.shift());) !c.length && p(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }

    function la(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.yh = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.ph = function(a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
      }
    };
    var ma = {},
      na = {
        NETWORK_ERROR: "Unable to contact the Wilddog server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
      };

    function oa(a) {
      var b = t(na, a),
        b = Error(b, a);
      b.code = a;
      return b
    };

    function pa(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    }

    function t(a, b) {
      if (Object.prototype.hasOwnProperty.call(a, b)) return a[b]
    }

    function qa(a, b) {
      for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function ra(a) {
      var b = {};
      qa(a, function(a, d) {
        b[a] = d
      });
      return b
    };

    function sa(a) {
      var b = [];
      qa(a, function(a, d) {
        ea(d) ? ta(d, function(c) {
          b.push(encodeURIComponent(a) + "=" + encodeURIComponent(c))
        }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d))
      });
      return b.length ? "&" + b.join("&") : ""
    }

    function ua(a) {
      var b = {};
      a = a.replace(/^\?/, "").split("&");
      ta(a, function(a) {
        a && (a = a.split("="), b[a[0]] = a[1])
      });
      return b
    };

    function va(a) {
      return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }

    function wa(a) {
      a = String(a);
      if (va(a)) try {
        return eval("(" + a + ")")
      } catch (b) {}
      throw Error("Invalid JSON string: " + a);
    }

    function xa() {
      this.Nd = void 0
    }

    function ya(a, b, c) {
      if (null == b) c.push("null");
      else {
        if ("object" == typeof b) {
          if (ea(b)) {
            var d = b;
            b = d.length;
            c.push("[");
            for (var e = "", f = 0; f < b; f++) c.push(e), e = d[f], ya(a, a.Nd ? a.Nd.call(d, String(f), e) : e, c), e = ",";
            c.push("]");
            return
          }
          if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
          else {
            c.push("{");
            f = "";
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (e = b[d], "function" != typeof e && (c.push(f), za(d, c), c.push(":"), ya(a, a.Nd ? a.Nd.call(b, d, e) : e, c), f = ","));
            c.push("}");
            return
          }
        }
        switch (typeof b) {
          case "string":
            za(b,
              c);
            break;
          case "number":
            c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
            break;
          case "boolean":
            c.push(String(b));
            break;
          case "function":
            c.push("null");
            break;
          default:
            throw Error("Unknown type: " + typeof b);
        }
      }
    }
    var Aa = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
      },
      Ba = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function za(a, b) {
      b.push('"', a.replace(Ba, function(a) {
        var b = Aa[a];
        b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Aa[a] = b);
        return b
      }), '"')
    };

    function Ca(a) {
      return "undefined" !== typeof JSON && p(JSON.parse) ? JSON.parse(a) : wa(a)
    }

    function u(a) {
      if ("undefined" !== typeof JSON && p(JSON.stringify)) a = JSON.stringify(a);
      else {
        var b = [];
        ya(new xa, a, b);
        a = b.join("")
      }
      return a
    };

    function Da(a) {
      a.method || (a.method = "GET");
      a.headers || (a.headers = {});
      this.options = a
    }
    Da.prototype.open = function(a, b, c) {
      var d = {
        Accept: "application/json;text/plain"
      };
      Ea(d, this.options.headers);
      a = {
        url: a,
        method: this.options.method.toUpperCase(),
        header: d,
        success: function(a) {
          c && (c(null, a.data), c = null)
        },
        fail: function(a) {
          500 <= a.Me && 600 > a.Me ? c(oa("SERVER_ERROR")) : c(oa("NETWORK_ERROR"));
          c = null
        }
      };
      a.data = b;
      a.headers = d;
      wx.request(a)
    };
    Da.isAvailable = function() {
      return wx && wx.request
    };
    var Fa = "auth.wilddog.com";

    function Ga() {
      var a = window.opener.frames,
        b;
      for (b = a.length - 1; 0 <= b; b--) try {
        if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name) return a[b]
      } catch (c) {}
      return null
    }

    function Ha(a, b, c) {
      a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }

    function Ia(a, b) {
      a.detachEvent ? a.detachEvent("onmessage", b) : a.removeEventListener && a.removeEventListener("message", b, !1)
    }

    function Ja() {
      var a = document.location.hash,
        b = "";
      try {
        var a = a.replace("#", ""),
          c = ua(a);
        c && pa(c, "__wilddog_request_key") && (b = t(c, "__wilddog_request_key"))
      } catch (d) {}
      return b
    }

    function Ka() {
      var a = La(Fa);
      return a.scheme + "://" + a.host + "/v2"
    }

    function Ma(a) {
      return Ka() + "/" + a + "/auth/channel"
    };

    function Na() {
      if ("undefined" === typeof navigator) return !1;
      var a = navigator.userAgent;
      if ("Microsoft Internet Explorer" === navigator.appName) {
        if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1])
      } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1]);
      return !1
    };

    function Oa() {}
    Oa.prototype.open = function(a, b, c) {
      wx.login({
        success: function(b) {
          b.code ? Pa(function(d, f) {
            if (d) c(d);
            else {
              var e = {};
              e.code = b.code;
              e.signature = f.signature;
              e.rawData = f.rawData;
              Qa(e, a, c)
            }
          }) : c(Error("\u5fae\u4fe1\u670d\u52a1\u7aef\u672a\u8fd4\u56decode"))
        },
        fail: function(a) {
          Ra("debug  WxImplicit fail" + JSON.stringify(a));
          c(Error("\u83b7\u53d6\u7528\u6237\u767b\u9646\u72b6\u6001\u5931\u8d25,res.Msg:" + a.rh), null)
        }
      })
    };

    function Qa(a, b, c) {
      wx.request({
        url: b,
        method: "POST",
        header: {
          Accept: "application/json;text/plain"
        },
        success: function(a) {
          if (a.data)
            if (null != a.data.idToken) c(null, a.data);
            else if (a.data.message) {
            var b = Error(a.data.message);
            b.code = a.data.code;
            c(b)
          } else c(Error("unkown error:" + a.data));
          else c(Error("unkown error: no data returned"));
          c = null
        },
        fail: function(a) {
          500 <= a.Me && 600 > a.Me ? c(oa("SERVER_ERROR")) : c(oa("NETWORK_ERROR"));
          c = null
        },
        data: a
      })
    }

    function Pa(a) {
      wx.getUserInfo({
        success: function(b) {
          a(null, {
            rawData: b.rawData,
            signature: b.signature
          })
        },
        fail: function() {
          a(Error("invoke wx.getUserInfo failed"))
        }
      })
    }
    Oa.isAvailable = function() {
      return wx && wx.request
    };

    function Sa() {
      this.xc = {}
    }
    Sa.prototype.set = function(a, b) {
      null == b ? delete this.xc[a] : this.xc[a] = b
    };
    Sa.prototype.get = function(a) {
      return pa(this.xc, a) ? this.xc[a] : null
    };
    Sa.prototype.remove = function(a) {
      delete this.xc[a]
    };

    function Ta() {
      this.Ag = "wilddog123:"
    }
    h = Ta.prototype;
    h.set = function(a, b) {
      null == b ? wx.removeStorageSync(this.Kd(a)) : wx.setStorageSync(this.Kd(a), b)
    };
    h.get = function(a) {
      var b;
      try {
        b = wx.getStorageSync(this.Kd(a))
      } catch (c) {}
      return null == b || "" == b ? null : b
    };
    h.Kd = function(a) {
      return this.Ag + a
    };
    h.remove = function(a) {
      wx.removeStorageSync(this.Kd(a))
    };
    h.toString = function() {
      return "wx-storage:{}"
    };
    var Ua = new Ta,
      v = new Sa;

    function Va(a) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, Va);
      else {
        var b = Error().stack;
        b && (this.stack = b)
      }
      a && (this.message = String(a))
    }
    la(Va, Error);
    Va.prototype.name = "CustomError";

    function Wa(a, b, c) {
      this.ga = c;
      this.Zf = a;
      this.Hg = b;
      this.Dd = 0;
      this.rd = null
    }
    Wa.prototype.get = function() {
      var a;
      0 < this.Dd ? (this.Dd--, a = this.rd, this.rd = a.next, a.next = null) : a = this.Zf();
      return a
    };
    Wa.prototype.put = function(a) {
      this.Hg(a);
      this.Dd < this.ga && (this.Dd++, a.next = this.rd, this.rd = a)
    };

    function Xa() {
      this.ce = this.vc = null
    }
    var Za = new Wa(function() {
      return new Ya
    }, function(a) {
      a.reset()
    }, 100);
    Xa.prototype.add = function(a, b) {
      var c = Za.get();
      c.set(a, b);
      this.ce ? this.ce.next = c : this.vc = c;
      this.ce = c
    };
    Xa.prototype.remove = function() {
      var a = null;
      this.vc && (a = this.vc, this.vc = this.vc.next, this.vc || (this.ce = null), a.next = null);
      return a
    };

    function Ya() {
      this.next = this.scope = this.ne = null
    }
    Ya.prototype.set = function(a, b) {
      this.ne = a;
      this.scope = b;
      this.next = null
    };
    Ya.prototype.reset = function() {
      this.next = this.scope = this.ne = null
    };
    var $a = Array.prototype.indexOf ? function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
      } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
          if (c in a && a[c] === b) return c;
        return -1
      },
      ta = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
      } : function(a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
      },
      ab = Array.prototype.filter ? function(a, b, c) {
        return Array.prototype.filter.call(a,
          b, c)
      } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = q(a) ? a.split("") : a, k = 0; k < d; k++)
          if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l)
          }
        return e
      },
      bb = Array.prototype.map ? function(a, b, c) {
        return Array.prototype.map.call(a, b, c)
      } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = q(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
      },
      cb = Array.prototype.reduce ? function(a, b, c, d) {
        d && (b = r(b, d));
        return Array.prototype.reduce.call(a, b, c)
      } : function(a, b, c, d) {
        var e = c;
        ta(a, function(c, g) {
          e = b.call(d,
            e, c, g, a)
        });
        return e
      },
      db = Array.prototype.every ? function(a, b, c) {
        return Array.prototype.every.call(a, b, c)
      } : function(a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
          if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
      };

    function eb(a, b) {
      var c = fb(a, b, void 0);
      return 0 > c ? null : q(a) ? a.charAt(c) : a[c]
    }

    function fb(a, b, c) {
      for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
      return -1
    }

    function gb(a, b) {
      var c = $a(a, b);
      0 <= c && Array.prototype.splice.call(a, c, 1)
    }

    function hb(a, b) {
      a.sort(b || ib)
    }

    function ib(a, b) {
      return a > b ? 1 : a < b ? -1 : 0
    };
    var jb;
    a: {
      var kb = n.navigator;
      if (kb) {
        var lb = kb.userAgent;
        if (lb) {
          jb = lb;
          break a
        }
      }
      jb = ""
    };

    function w(a, b) {
      for (var c in a) b.call(void 0, a[c], c, a)
    }

    function mb(a, b) {
      var c = {},
        d;
      for (d in a) c[d] = b.call(void 0, a[d], d, a);
      return c
    }

    function nb(a, b) {
      for (var c in a)
        if (!b.call(void 0, a[c], c, a)) return !1;
      return !0
    }

    function ob(a) {
      var b = 0,
        c;
      for (c in a) b++;
      return b
    }

    function pb(a) {
      for (var b in a) return b
    }

    function qb(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = a[d];
      return b
    }

    function rb(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = d;
      return b
    }

    function sb(a, b) {
      return null !== a && b in a
    }

    function tb(a, b) {
      for (var c in a)
        if (a[c] == b) return !0;
      return !1
    }

    function ub(a, b, c) {
      for (var d in a)
        if (b.call(c, a[d], d, a)) return d
    }

    function vb(a, b) {
      var c = ub(a, b, void 0);
      return c && a[c]
    }

    function wb(a) {
      for (var b in a) return !1;
      return !0
    }

    function xb(a) {
      var b = {},
        c;
      for (c in a) b[c] = a[c];
      return b
    }
    var yb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ea(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < yb.length; f++) c = yb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
      }
    };

    function zb(a) {
      n.setTimeout(function() {
        throw a;
      }, 0)
    }
    var Ab;

    function Bb() {
      var a = n.MessageChannel;
      "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == jb.indexOf("Presto") && (a = function() {
        var a = document.createElement("IFRAME");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
          a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
          d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
          a = r(function(a) {
            if (("*" == d || a.origin ==
                d) && a.data == c) this.port1.onmessage()
          }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
          postMessage: function() {
            b.postMessage(c, d)
          }
        }
      });
      if ("undefined" !== typeof a && -1 == jb.indexOf("Trident") && -1 == jb.indexOf("MSIE")) {
        var b = new a,
          c = {},
          d = c;
        b.port1.onmessage = function() {
          if (p(c.next)) {
            c = c.next;
            var a = c.pb;
            c.pb = null;
            a()
          }
        };
        return function(a) {
          d.next = {
            pb: a
          };
          d = d.next;
          b.port2.postMessage(0)
        }
      }
      return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
        var b =
          document.createElement("SCRIPT");
        b.onreadystatechange = function() {
          b.onreadystatechange = null;
          b.parentNode.removeChild(b);
          b = null;
          a();
          a = null
        };
        document.documentElement.appendChild(b)
      } : function(a) {
        n.setTimeout(a, 0)
      }
    };

    function Cb(a, b) {
      Db || Eb();
      Fb || (Db(), Fb = !0);
      Gb.add(a, b)
    }
    var Db;

    function Eb() {
      var a = n.Promise;
      if (-1 != String(a).indexOf("[native code]")) {
        var b = a.resolve(void 0);
        Db = function() {
          b.then(Hb)
        }
      } else Db = function() {
        var a = Hb,
          b;
        !(b = !ga(n.setImmediate)) && (b = n.Window && n.Window.prototype) && (b = -1 == jb.indexOf("Edge") && n.Window.prototype.setImmediate == n.setImmediate);
        b ? (Ab || (Ab = Bb()), Ab(a)) : n.setImmediate(a)
      }
    }
    var Fb = !1,
      Gb = new Xa;

    function Hb() {
      for (var a; a = Gb.remove();) {
        try {
          a.ne.call(a.scope)
        } catch (b) {
          zb(b)
        }
        Za.put(a)
      }
      Fb = !1
    };

    function Ib(a, b) {
      this.da = Jb;
      this.zf = void 0;
      this.Vb = this.ob = this.Ea = null;
      this.od = this.le = !1;
      if (a != aa) try {
        var c = this;
        a.call(b, function(a) {
          Kb(c, Lb, a)
        }, function(a) {
          if (!(a instanceof Mb)) try {
            if (a instanceof Error) throw a;
            throw Error("Promise rejected.");
          } catch (e) {}
          Kb(c, Nb, a)
        })
      } catch (d) {
        Kb(this, Nb, d)
      }
    }
    var Jb = 0,
      Lb = 2,
      Nb = 3;

    function Ob() {
      this.next = this.context = this.nc = this.Pc = this.w = null;
      this.Yc = !1
    }
    Ob.prototype.reset = function() {
      this.context = this.nc = this.Pc = this.w = null;
      this.Yc = !1
    };
    var Pb = new Wa(function() {
      return new Ob
    }, function(a) {
      a.reset()
    }, 100);

    function Qb(a, b, c) {
      var d = Pb.get();
      d.Pc = a;
      d.nc = b;
      d.context = c;
      return d
    }
    Ib.prototype.then = function(a, b, c) {
      return Rb(this, ga(a) ? a : null, ga(b) ? b : null, c)
    };
    Ib.prototype.then = Ib.prototype.then;
    Ib.prototype.$goog_Thenable = !0;
    h = Ib.prototype;
    h.ah = function(a, b) {
      return Rb(this, null, a, b)
    };
    h.cancel = function(a) {
      this.da == Jb && Cb(function() {
        var b = new Mb(a);
        Sb(this, b)
      }, this)
    };

    function Sb(a, b) {
      if (a.da == Jb)
        if (a.Ea) {
          var c = a.Ea;
          if (c.ob) {
            for (var d = 0, e = null, f = null, g = c.ob; g && (g.Yc || (d++, g.w == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
            e && (c.da == Jb && 1 == d ? Sb(c, b) : (f ? (d = f, d.next == c.Vb && (c.Vb = d), d.next = d.next.next) : Tb(c), Ub(c, e, Nb, b)))
          }
          a.Ea = null
        } else Kb(a, Nb, b)
    }

    function Vb(a, b) {
      a.ob || a.da != Lb && a.da != Nb || Wb(a);
      a.Vb ? a.Vb.next = b : a.ob = b;
      a.Vb = b
    }

    function Rb(a, b, c, d) {
      var e = Qb(null, null, null);
      e.w = new Ib(function(a, g) {
        e.Pc = b ? function(c) {
          try {
            var e = b.call(d, c);
            a(e)
          } catch (m) {
            g(m)
          }
        } : a;
        e.nc = c ? function(b) {
          try {
            var e = c.call(d, b);
            !p(e) && b instanceof Mb ? g(b) : a(e)
          } catch (m) {
            g(m)
          }
        } : g
      });
      e.w.Ea = a;
      Vb(a, e);
      return e.w
    }
    h.dh = function(a) {
      this.da = Jb;
      Kb(this, Lb, a)
    };
    h.eh = function(a) {
      this.da = Jb;
      Kb(this, Nb, a)
    };

    function Kb(a, b, c) {
      if (a.da == Jb) {
        a === c && (b = Nb, c = new TypeError("Promise cannot resolve to itself"));
        a.da = 1;
        var d;
        a: {
          var e = c,
            f = a.dh,
            g = a.eh;
          if (e instanceof Ib) Vb(e, Qb(f || aa, g || null, a)),
          d = !0;
          else {
            var k;
            if (e) try {
              k = !!e.$goog_Thenable
            } catch (m) {
              k = !1
            } else k = !1;
            if (k) e.then(f, g, a), d = !0;
            else {
              if (ha(e)) try {
                var l = e.then;
                if (ga(l)) {
                  Xb(e, l, f, g, a);
                  d = !0;
                  break a
                }
              } catch (m) {
                g.call(a, m);
                d = !0;
                break a
              }
              d = !1
            }
          }
        }
        d || (a.zf = c, a.da = b, a.Ea = null, Wb(a), b != Nb || c instanceof Mb || Yb(a, c))
      }
    }

    function Xb(a, b, c, d, e) {
      function f(a) {
        k || (k = !0, d.call(e, a))
      }

      function g(a) {
        k || (k = !0, c.call(e, a))
      }
      var k = !1;
      try {
        b.call(a, g, f)
      } catch (l) {
        f(l)
      }
    }

    function Wb(a) {
      a.le || (a.le = !0, Cb(a.dg, a))
    }

    function Tb(a) {
      var b = null;
      a.ob && (b = a.ob, a.ob = b.next, b.next = null);
      a.ob || (a.Vb = null);
      return b
    }
    h.dg = function() {
      for (var a; a = Tb(this);) Ub(this, a, this.da, this.zf);
      this.le = !1
    };

    function Ub(a, b, c, d) {
      if (c == Nb && b.nc && !b.Yc)
        for (; a && a.od; a = a.Ea) a.od = !1;
      if (b.w) b.w.Ea = null, Zb(b, c, d);
      else try {
        b.Yc ? b.Pc.call(b.context) : Zb(b, c, d)
      } catch (e) {
        $b.call(null, e)
      }
      Pb.put(b)
    }

    function Zb(a, b, c) {
      b == Lb ? a.Pc.call(a.context, c) : a.nc && a.nc.call(a.context, c)
    }

    function Yb(a, b) {
      a.od = !0;
      Cb(function() {
        a.od && $b.call(null, b)
      })
    }
    var $b = zb;

    function Mb(a) {
      Va.call(this, a)
    }
    la(Mb, Va);
    Mb.prototype.name = "cancel";
    var ac = "undefined" != typeof Promise ? Promise : "undefined" != typeof n.Promise ? n.Promise : Ib;
    n.setTimeout || (n.setTimeout = function() {
      setTimeout.apply(null, arguments)
    });
    Ib.prototype["catch"] = Ib.prototype.ah;

    function x() {
      var a = this;
      this.reject = this.resolve = null;
      this.o = new ac(function(b, c) {
        a.resolve = b;
        a.reject = c
      })
    }

    function y(a, b) {
      return function(c, d) {
        c ? a.reject(c) : a.resolve(d);
        ga(b) && (bc(a.o), 1 === b.length ? b(c) : b(c, d))
      }
    }

    function bc(a) {
      a.then(void 0, aa)
    };
    var cc = global.eio;

    function dc() {
      this.lf = {
        WxHttp: Da,
        WxImplicit: Oa
      };
      this.Wc = "s-dalwx-nss-1.wilddogio.com"
    }

    function ec(a) {
      var b = [];
      a.forEach(function(a) {
        null != this.lf[a] && b.push(this.lf[a])
      }, fc);
      return b
    }
    dc.prototype.wf = function(a) {
      function b(a, b) {
        if (null == b) return -1;
        for (var c = 0; c < a.length; c++)
          if (a[c][".key"] === b) return c;
        return -1
      }

      function c(a) {
        return {
          ".key": a.key(),
          ".value": a.val(),
          ".priority": a.getPriority()
        }
      }
      a.prototype.bindAsArray = function(a, e, f) {
        function d() {
          var b = {};
          b[e] = k;
          a.setData(b)
        }
        if (null == a) throw Error("please provide page as 1st param");
        if (null == e || "string" != typeof e) throw Error("please provide varible name as 2nd param");
        if (null == a[".bindWilddogFuncs"] || "object" != typeof a[".bindWilddogFuncs"]) a[".bindWilddogFuncs"] = {};
        if (null != a[".bindWilddogFuncs"][e]) throw Error(e + " bind more than once");
        var k = [],
          l = {
            child_added: function(a, e) {
              var f = c(a);
              k.splice(b(k, e) + 1, 0, f);
              d()
            },
            child_removed: function(a) {
              a = a.key();
              k.splice(b(k, a), 1);
              d()
            },
            child_moved: function(a, c) {
              var e = b(k, a.key()),
                e = k.splice(e, 1);
              k.splice(b(k, c) + 1, 0, e[0]);
              d()
            },
            child_changed: function(a) {
              a = c(a);
              k[b(k, a[".key"])] = a;
              d()
            }
          },
          m = ["child_added", "child_removed", "child_moved", "child_changed"],
          A = new x;
        bc(A.o);
        this.once("value", function() {
          f && f(null);
          A.resolve()
        }, function(a) {
          f &&
            f(a);
          A.reject(a)
        });
        for (var H = 0; H < m.length; H++) this.on(m[H], l[m[H]]);
        a[".bindWilddogFuncs"][e] = l;
        return A.o
      };
      a.prototype.bindAsObject = function(a, b, f) {
        if (null == a) throw Error("please provide page as 1st param");
        if (null == b || "string" != typeof b) throw Error("please provide varible name as 2nd param");
        if (null == a[".bindWilddogFuncs"] || "object" != typeof a[".bindWilddogFuncs"]) a[".bindWilddogFuncs"] = {};
        if (null != a[".bindWilddogFuncs"][b]) throw Error(b + " bind more than once");
        var d = null,
          e = {
            value: function(e) {
              d =
                c(e);
              e = {};
              e[b] = d;
              a.setData(e)
            }
          },
          l = new x;
        bc(l.o);
        this.once("value", function() {
          f && f(null);
          l.resolve()
        }, function(a) {
          f && f(a);
          l.reject(a)
        });
        this.on("value", e.value);
        a[".bindWilddogFuncs"][b] = e;
        return l.o
      };
      a.prototype.unbind = function(a, b) {
        if (null == a) throw Error("please provide page as 1st param");
        if (null == b || "string" != typeof b) throw Error("please provide varible name as 2nd param");
        if (null != a[".bindWilddogFuncs"]) {
          var c = a[".bindWilddogFuncs"][b];
          if (null != c && "object" == typeof c) {
            for (var d = ["child_added",
                "child_removed", "child_moved", "child_changed", "value"
              ], e = 0; e < d.length; e++) {
              var l = d[e];
              null != c[l] && "function" == typeof c[l] && this.off(l, c[l])
            }
            delete a[".bindWilddogFuncs"][b]
          }
        }
      }
    };
    var fc = new dc;

    function gc(a) {
      this.M = a
    }
    gc.prototype.Nf = function(a) {
      this.M.bind(this.M.Ha.Na, a)
    };
    gc.prototype.addAuthTokenListener = gc.prototype.Nf;
    gc.prototype.Eg = function() {
      this.M.unbind(this.M.Ha.Na, listener)
    };
    gc.prototype.removeAuthTokenListener = gc.prototype.Eg;
    gc.prototype.Mf = function(a) {
      this.M.bind(this.M.Ha.bd, a)
    };
    gc.prototype.addAuthRevokListener = gc.prototype.Mf;
    gc.prototype.Dg = function() {
      this.M.unbind(this.M.Ha.bd, listener)
    };
    gc.prototype.removeAuthRevokListener = gc.prototype.Dg;

    function hc() {
      this.nb = -1
    };

    function ic() {
      this.nb = 64;
      this.W = [];
      this.ge = [];
      this.Kf = [];
      this.Id = [];
      this.Id[0] = 128;
      for (var a = 1; a < this.nb; ++a) this.Id[a] = 0;
      this.Zd = this.gc = 0;
      this.reset()
    }
    la(ic, hc);
    ic.prototype.reset = function() {
      this.W[0] = 1732584193;
      this.W[1] = 4023233417;
      this.W[2] = 2562383102;
      this.W[3] = 271733878;
      this.W[4] = 3285377520;
      this.Zd = this.gc = 0
    };

    function jc(a, b, c) {
      c || (c = 0);
      var d = a.Kf;
      if (q(b))
        for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
      else
        for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
      for (e = 16; 80 > e; e++) {
        var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
        d[e] = (f << 1 | f >>> 31) & 4294967295
      }
      b = a.W[0];
      c = a.W[1];
      for (var g = a.W[2], k = a.W[3], l = a.W[4], m, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k), m = 1518500249) : (f = c ^ g ^ k, m = 1859775393) : 60 > e ? (f = c & g | k & (c | g), m = 2400959708) : (f = c ^ g ^ k, m = 3395469782), f = (b <<
        5 | b >>> 27) + f + l + m + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
      a.W[0] = a.W[0] + b & 4294967295;
      a.W[1] = a.W[1] + c & 4294967295;
      a.W[2] = a.W[2] + g & 4294967295;
      a.W[3] = a.W[3] + k & 4294967295;
      a.W[4] = a.W[4] + l & 4294967295
    }
    ic.prototype.update = function(a, b) {
      if (null != a) {
        p(b) || (b = a.length);
        for (var c = b - this.nb, d = 0, e = this.ge, f = this.gc; d < b;) {
          if (0 == f)
            for (; d <= c;) jc(this, a, d), d += this.nb;
          if (q(a))
            for (; d < b;) {
              if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.nb) {
                jc(this, e);
                f = 0;
                break
              }
            } else
              for (; d < b;)
                if (e[f] = a[d], ++f, ++d, f == this.nb) {
                  jc(this, e);
                  f = 0;
                  break
                }
        }
        this.gc = f;
        this.Zd += b
      }
    };
    ic.prototype.digest = function() {
      var a = [],
        b = 8 * this.Zd;
      56 > this.gc ? this.update(this.Id, 56 - this.gc) : this.update(this.Id, this.nb - (this.gc - 56));
      for (var c = this.nb - 1; 56 <= c; c--) this.ge[c] = b & 255, b /= 256;
      jc(this, this.ge);
      for (c = b = 0; 5 > c; c++)
        for (var d = 24; 0 <= d; d -= 8) a[b] = this.W[c] >> d & 255, ++b;
      return a
    };
    var kc = null,
      lc = null;

    function mc(a) {
      var b = "";
      nc(a, function(a) {
        b += String.fromCharCode(a)
      });
      return b
    }

    function nc(a, b) {
      function c(b) {
        for (; d < a.length;) {
          var c = a.charAt(d++),
            e = lc[c];
          if (null != e) return e;
          if (!/^[\s\xa0]*$/.test(c)) throw Error("Unknown base64 encoding at char: " + c);
        }
        return b
      }
      oc();
      for (var d = 0;;) {
        var e = c(-1),
          f = c(0),
          g = c(64),
          k = c(64);
        if (64 === k && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k))
      }
    }

    function oc() {
      if (!kc) {
        kc = {};
        lc = {};
        for (var a = 0; 65 > a; a++) kc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), lc[kc[a]] = a, 62 <= a && (lc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
      }
    };
    var pc = function() {
      var a = 1;
      return function() {
        return a++
      }
    }();

    function z(a, b) {
      if (!a) throw qc(b);
    }

    function qc(a) {
      return Error("Wilddog (" + wilddog.Pe + ") INTERNAL ASSERT FAILED: " + a)
    }

    function rc(a) {
      try {
        return "NODE" == CLIENT_TYPE ? (new Buffer(a, "base64")).toString("utf8") : "undefined" !== typeof atob ? atob(a) : mc(a)
      } catch (b) {
        Ra("base64Decode failed: ", b)
      }
      return null
    }

    function sc(a) {
      for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        55296 <= e && 56319 >= e && (e -= 55296, d++, z(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
      }
      a = new ic;
      a.update(b);
      b = a.digest();
      oc();
      a = kc;
      c = [];
      for (d = 0; d < b.length; d += 3) {
        var f = b[d],
          g = (e = d + 1 < b.length) ? b[d + 1] : 0,
          k = d + 2 < b.length,
          l = k ? b[d + 2] : 0,
          m = f >> 2,
          f = (f & 3) <<
          4 | g >> 4,
          g = (g & 15) << 2 | l >> 6,
          l = l & 63;
        k || (l = 64, e || (g = 64));
        c.push(a[m], a[f], a[g], a[l])
      }
      return c.join("")
    }

    function tc(a) {
      for (var b = "", c = 0; c < arguments.length; c++) var d = arguments[c],
        e = da(d),
        b = "array" == e || "object" == e && "number" == typeof d.length ? b + tc.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + u(arguments[c]) : b + arguments[c],
        b = b + " ";
      return b
    }
    var uc = null,
      vc = !0;

    function Ra(a) {
      !0 === vc && (vc = !1, null === uc && !0 === v.get("logging_enabled") && Wilddog.Xe(!0));
      if (uc) {
        var b = tc.apply(null, arguments);
        uc(b)
      }
    }

    function wc(a) {
      return function() {
        Ra(a, arguments)
      }
    }

    function xc(a) {
      if ("undefined" !== typeof console) {
        var b = "WILDDOG INTERNAL ERROR: " + tc.apply(null, arguments);
        "undefined" !== typeof console.error ? console.error(b) : console.log(b)
      }
    }

    function yc(a) {
      var b = tc.apply(null, arguments);
      throw Error("WILDDOG FATAL ERROR: " + b);
    }

    function B(a) {
      if ("undefined" !== typeof console) {
        var b = "WILDDOG WARNING: " + tc.apply(null, arguments);
        "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
      }
    }

    function La(a) {
      var b = "",
        c = "",
        d = "",
        e = "",
        f = !0,
        g = "https",
        k = 443;
      if (q(a)) {
        var l = a.indexOf("//");
        0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
        l = a.indexOf("/"); - 1 === l && (l = a.length);
        b = a.substring(0, l);
        e = "";
        a = a.substring(l).split("/");
        for (l = 0; l < a.length; l++)
          if (0 < a[l].length) {
            var m = a[l];
            try {
              m = decodeURIComponent(m.replace(/\+/g, " "))
            } catch (A) {}
            e += "/" + m
          }
        a = b.split(".");
        3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
        l = b.indexOf(":");
        0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
          (k = String(k)), k = q(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
      }
      return {
        host: b,
        port: k,
        domain: c,
        Zg: d,
        Pb: f,
        scheme: g,
        Lb: e
      }
    }

    function zc(a) {
      return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }

    function Ac(a, b) {
      if (a === b) return 0;
      if ("[MIN_NAME]" === a || "[MAX_NAME]" === b) return -1;
      if ("[MIN_NAME]" === b || "[MAX_NAME]" === a) return 1;
      var c = Bc(a),
        d = Bc(b);
      return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1
    }

    function Cc(a) {
      if ("object" !== typeof a || null === a) return u(a);
      var b = [],
        c;
      for (c in a) b.push(c);
      b.sort();
      c = "{";
      for (var d = 0; d < b.length; d++) 0 !== d && (c += ","), c += u(b[d]), c += ":", c += Cc(a[b[d]]);
      return c + "}"
    }

    function Dc(a, b) {
      if (ea(a))
        for (var c = 0; c < a.length; ++c) b(c, a[c]);
      else w(a, b)
    }

    function Ec(a) {
      z(!zc(a), "Invalid JSON number");
      var b, c, d, e;
      0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
      e = [];
      for (a = 52; a; --a) e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
      for (a = 11; a; --a) e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
      e.push(b ? 1 : 0);
      e.reverse();
      b = e.join("");
      c = "";
      for (a = 0; 64 > a; a += 8) d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
        (d = "0" + d), c += d;
      return c.toLowerCase()
    }
    var Fc = /^-?\d{1,10}$/;

    function Bc(a) {
      return Fc.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
    }

    function Gc(a) {
      try {
        a()
      } catch (b) {
        setTimeout(function() {
          B("Exception was thrown by user callback.", b.stack || "");
          throw b;
        }, Math.floor(0))
      }
    }

    function C(a, b) {
      if (ga(a)) {
        var c = Array.prototype.slice.call(arguments, 1).slice();
        Gc(function() {
          a.apply(null, c)
        })
      }
    };

    function Hc(a) {
      z(ea(a) && 0 < a.length, "Requires a non-empty array");
      this.Of = a;
      this.tb = {}
    }
    Hc.prototype.$d = function(a, b) {
      for (var c = this.tb[a] || [], d = 0; d < c.length; d++)
        if (c[d].Cf) {
          var e = c.splice(d, 1)[0];
          e.yb.apply(e.context, Array.prototype.slice.call(arguments, 1))
        } else c[d].yb.apply(c[d].context, Array.prototype.slice.call(arguments, 1))
    };
    Hc.prototype.Hb = function(a, b, c) {
      Ic(this, a);
      this.tb[a] = this.tb[a] || [];
      this.tb[a].push({
        yb: b,
        context: c,
        Cf: !1
      });
      (a = this.nd(a)) && b.apply(c, [a])
    };
    Hc.prototype.Gd = function(a, b, c) {
      Ic(this, a);
      var d = this.nd(a);
      d ? b.apply(c, [d]) : (this.tb[a] = this.tb[a] || [], this.tb[a].push({
        yb: b,
        context: c,
        Cf: !0
      }))
    };
    Hc.prototype.mc = function(a, b, c) {
      Ic(this, a);
      a = this.tb[a] || [];
      for (var d = 0; d < a.length; d++)
        if (a[d].yb === b && (!c || c === a[d].context)) {
          a.splice(d, 1);
          break
        }
    };

    function Ic(a, b) {
      z(eb(a.Of, function(a) {
        return a === b
      }), "Unknown event: " + b)
    };

    function D(a, b) {
      Hc.call(this, ["authStateChanged", "authTokenExpired"]);
      this.Lf = {
        Bf: !1
      };
      this.Qe = {};
      Object.defineProperty(this, "name", {
        value: b,
        writable: !1
      });
      Object.defineProperty(this, "options", {
        value: a,
        writable: !1
      });
      this.INTERNAL = new gc(this)
    }
    la(D, Hc);

    function Jc(a, b) {
      D.prototype[a] = function() {
        return b(this)
      }
    }
    D.prototype.ag = function(a, b) {
      var c = !0,
        d;
      for (d in Kc)
        if (Kc.hasOwnProperty(d) && Kc[d] === a) {
          c = !1;
          break
        }
      if (c) throw Error("Unknown event " + a);
      this.Qe[a] = b;
      switch (a) {
        case Kc.Na:
          this.Lf.Bf = b && b.Bf
      }
      this.$d(a, b)
    };
    D.prototype.emit = D.prototype.ag;
    D.prototype.Rf = function(a, b) {
      this.Gd(a, b)
    };
    D.prototype.bindOnce = D.prototype.Rf;
    D.prototype.bind = function(a, b) {
      this.Hb(a, b)
    };
    D.prototype.bind = D.prototype.bind;
    D.prototype.bh = function(a, b) {
      this.mc(a, b)
    };
    D.prototype.unbind = D.prototype.bh;
    D.prototype.nd = function(a) {
      switch (a) {
        case Kc.Na:
          return this.Qe[Kc.Na]
      }
      return null
    };
    var Kc = {
      Na: "authStateChanged",
      bd: "authTokenExpired"
    };
    D.prototype.Ha = Kc;

    function Lc(a, b, c, d, e, f) {
      this.uid = e;
      this.displayName = a;
      this.phone = f;
      this.email = b;
      this.photoURL = c;
      this.providerId = d
    };

    function E(a, b, c, d, e) {
      Lc.call(this, b.displayName, b.email, b.photoURL, b.providerId, b.uid, b.phone);
      this.isAnonymous = "anonymous" === this.providerId;
      this.emailVerified = !0 === c;
      this.phoneVerified = !0 === d;
      this.providerData = e || [];
      this.refreshToken = null;
      Object.defineProperty(this, "__authManager", {
        value: a,
        writable: !1
      })
    }
    la(E, Lc);
    ka("wd.User", E);
    E.prototype["delete"] = function(a) {
      var b = new x;
      Mc(this.__authManager, this.Ka(), y(b, a));
      return b.o
    };
    E.prototype["delete"] = E.prototype["delete"];
    E.prototype.Ka = function() {
      return (this.__authManager.Wa || null).idToken
    };
    E.prototype.getToken = E.prototype.Ka;
    E.prototype.re = function() {
      return this.phone
    };
    E.prototype.getPhone = E.prototype.re;
    E.prototype.link = function(a, b) {
      F("wilddog.User.link", 1, 2, arguments.length);
      Nc("wilddog.User.link", a);
      var c = a.provider,
        d = new x,
        e = {};
      e.idToken = this.Ka();
      "password" == c ? (e.email = a.email, e.password = a.password, Oc(this.__authManager, e, y(d, b))) : (e.providerId = a.provider, e.accessToken = a.accessToken, e.openId = a.openId || "", e.authType = "link", Pc(this.__authManager, e, y(d, b)));
      return d.o
    };
    E.prototype.link = E.prototype.link;
    E.prototype.fh = function(a, b) {
      F("wilddog.User.unlink", 1, 2, arguments.length);
      Qc("wilddog.User.unlink", 1, a);
      var c = new x,
        d = this;
      Rc(this.__authManager, "unlink", {
        idToken: this.Ka(),
        deleteProvider: [a]
      }, y(c, function(c, f) {
        f && (d.providerData = d.providerData.filter(function(b) {
          if (b.providerId != a) return b
        }), 0 === d.providerData.length && Sc(d.__authManager));
        b && b(c, f)
      }));
      return c.o
    };
    E.prototype.unlink = E.prototype.fh;
    E.prototype.pg = function(a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Nc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Tc(this.__authManager, a, {
        authType: "link",
        idToken: this.Ka()
      }, y(c, b));
      return c.o
    };
    E.prototype.linkWithPopup = E.prototype.pg;
    E.prototype.qg = function(a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Nc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Uc(this.__authManager, a, {
        authType: "link",
        idToken: this.Ka()
      }, y(c, b));
      return c.o
    };
    E.prototype.linkWithRedirect = E.prototype.qg;
    E.prototype.jh = function(a, b) {
      F("wilddog.User.updateProfile", 1, 2, arguments.length);
      Nc("wilddog.User.updateProfile", a);
      var c = new x;
      a.idToken = this.Ka();
      Rc(this.__authManager, "profile", a, y(c, b));
      return c.o
    };
    E.prototype.updateProfile = E.prototype.jh;
    E.prototype.gh = function(a, b) {
      F("wilddog.User.updateEmail", 1, 2, arguments.length);
      Qc("wilddog.User.updateEmail", 1, a);
      var c = new x;
      Oc(this.__authManager, {
        email: a,
        idToken: this.Ka()
      }, y(c, b));
      return c.o
    };
    E.prototype.updateEmail = E.prototype.gh;
    E.prototype.ih = function(a, b) {
      F("wilddog.User.updatePhone", 1, 2, arguments.length);
      Qc("wilddog.User.updatePhone", 1, a);
      var c = new x;
      Oc(this.__authManager, {
        phoneNumber: a,
        idToken: this.Ka()
      }, y(c, b));
      return c.o
    };
    E.prototype.updatePhone = E.prototype.ih;
    E.prototype.lh = function(a, b) {
      F("wilddog.User.verifiyPhone", 1, 2, arguments.length);
      Qc("wilddog.User.verifiyPhone", 1, a);
      var c = new x;
      Vc(this.__authManager, {
        phoneNumber: this.re(),
        smsCode: a
      }, y(c, b));
      return c.o
    };
    E.prototype.verifiyPhone = E.prototype.lh;
    E.prototype.hh = function(a, b) {
      F("wilddog.User.updatePassword", 1, 2, arguments.length);
      Qc("wilddog.User.updatePassword", 1, a);
      var c = new x;
      Oc(this.__authManager, {
        password: a,
        idToken: this.Ka()
      }, y(c, b));
      return c.o
    };
    E.prototype.updatePassword = E.prototype.hh;
    E.prototype.Ig = function(a) {
      F("wilddog.User.sendEmailVerification", 0, 1, arguments.length);
      G("wilddog.User.sendEmailVerification", 1, a, !0);
      var b = new x;
      Wc(this.__authManager, {
        idToken: this.Ka(),
        requestType: "VERIFY_EMAIL"
      }, y(b, a));
      return b.o
    };
    E.prototype.sendEmailVerification = E.prototype.Ig;
    E.prototype.Lg = function(a) {
      F("wilddog.User.sendPhoneVerification", 0, 1, arguments.length);
      G("wilddog.User.sendPhoneVerification", 1, a, !0);
      var b = new x;
      Xc(this.__authManager, {
        phoneNumber: this.re(),
        type: "PHONE_VERIFY"
      }, y(b, a));
      return b.o
    };
    E.prototype.sendPhoneVerification = E.prototype.Lg;
    E.prototype.reload = function(a) {
      F("wilddog.User.reload", 0, 1, arguments.length);
      G("wilddog.User.reload", 1, a, !0);
      var b = new x;
      Yc(this.__authManager, this.Ka(), y(b, a));
      return b.o
    };
    E.prototype.reload = E.prototype.reload;
    E.prototype.Cg = function(a, b) {
      F("wilddog.User.reload", 1, 2, arguments.length);
      G("wilddog.User.reload", 2, b, !0);
      if (!a || !a.provider) throw Error("Unknown credential object.");
      var c = new x;
      Pc(this.__authManager, a, y(c, b));
      return c.o
    };
    E.prototype.reauthenticate = E.prototype.Cg;

    function Zc(a) {
      var b = "POST";
      switch (a.providerId || a.provider) {
        case "password":
          a = "verifyPassword";
          break;
        case "anonymous":
          a = "verifyAnonymous";
          break;
        case "custom":
          a = "verifyCustomToken";
          break;
        default:
          a = "credential", b = "GET"
      }
      if (!a) throw Error("Unknown provider '" + provider + "'.");
      return {
        path: a,
        method: b
      }
    };

    function $c(a) {
      if (a && a.users && a.users[0]) return a = a.users[0], new Lc(a.displayName, a.email, a.photoUrl, a.providerId, a.localId, a.phoneNumber);
      throw Error("Bad response format.");
    }

    function ad(a, b) {
      var c = $c(b);
      if (!c) return null;
      var d = b.users[0],
        e = d.providerUserInfo.map(function(a) {
          a.photoURL = a.photoUrl;
          delete a.photoUrl;
          return a
        });
      return new E(a, c, d.emailVerified, d.phoneNumberVerified, e)
    };

    function bd(a) {
      var b = {},
        c = {},
        d = {},
        e = "";
      try {
        var f = a.split("."),
          g = rc(f[0]) || "",
          k = rc(f[1]) || "",
          b = Ca(g),
          c = Ca(k),
          e = f[2],
          d = c.d || {};
        delete c.d
      } catch (l) {
        console.warn("error", l)
      }
      return {
        th: b,
        ie: c,
        data: d,
        vh: e
      }
    }

    function cd(a) {
      a = bd(a).ie;
      return "object" === typeof a && a.hasOwnProperty("iat") ? t(a, "iat") : null
    };

    function dd(a, b, c) {
      this.De = ["session", b.Jd, b.wc, a].join(":");
      this.Xd = c
    }
    dd.prototype.set = function(a, b) {
      if (!b)
        if (this.Xd.length) b = this.Xd[0];
        else throw Error("wd.auth.SessionManager : No storage options available!");
      b.set(this.De, a)
    };
    dd.prototype.get = function() {
      var a = bb(this.Xd, r(this.kg, this)),
        a = ab(a, function(a) {
          return null !== a
        });
      hb(a, function(a, c) {
        return cd(c.idToken) - cd(a.idToken)
      });
      return 0 < a.length ? a.shift() : null
    };
    dd.prototype.kg = function(a) {
      try {
        var b = a.get(this.De);
        if (b.idToken) return b;
        this.clear(a)
      } catch (c) {}
      return null
    };
    dd.prototype.clear = function() {
      var a = this;
      ta(this.Xd, function(b) {
        b.remove(a.De)
      })
    };

    function ed(a, b, c) {
      this.fd = a || {};
      this.Xc = b || {};
      this.$ = c || {};
      this.fd.remember || (this.fd.remember = "default")
    }
    var fd = ["remember", "redirectTo"];

    function gd(a) {
      var b = {},
        c = {};
      qa(a || {}, function(a, e) {
        0 <= $a(fd, a) ? b[a] = e : c[a] = e
      });
      return new ed(b, {}, c)
    };

    function hd(a, b, c) {
      this.fb = a;
      this.M = a.app;
      this.Ub = b;
      this.rc = new dd(this.M.name, b, [Ua, v]);
      this.Wa = null;
      this.Ib = c;
      id(this)
    }

    function id(a) {
      v.get("redirect_request_id") && jd(a);
      var b = a.rc.get();
      b && b.idToken ? Yc(a, b.idToken, function(c, d) {
        if (!c && d) {
          var e = {
            signIn: !0
          };
          e.currentUser = d;
          e.idToken = b.idToken;
          ld(a, e, {});
          md(a, e)
        } else md(a, null)
      }) : md(a, null)
    }

    function nd(a, b, c, d) {
      b && b.idToken ? od(a, b.idToken, c, function(a, b) {
        d(a, b)
      }) : (md(a, null), d(Error("No idToken found in response.")))
    }

    function od(a, b, c, d) {
      Yc(a, b, function(e, f) {
        if (!e && f) {
          var g = {
            signIn: !0
          };
          g.currentUser = f;
          g.idToken = b;
          ld(a, g, c);
          md(a, g);
          d(null, f)
        } else md(a, null), d(e)
      })
    }

    function Sc(a, b) {
      a.M.bindOnce(a.M.Ha.Na, function() {
        md(a, null);
        b(null)
      })
    }

    function Pc(a, b, c) {
      pd(a);
      var d = new ed({}, {}, b || {});
      b = Zc(b);
      d.$._method = b.method;
      var e = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
      qd(a, e, "/auth/" + b.path, d, function(a, b) {
        C(c, a, b)
      })
    }

    function rd(a, b) {
      pd(a);
      var c = new ed({}, {}, {}),
        d = ec(["WxImplicit"]);
      qd(a, d, "/auth/wxapp", c, function(a, c) {
        C(b, a, c)
      })
    }

    function Tc(a, b, c, d) {
      pd(a);
      var e = ec(["Popup", "Cordova"]);
      requestInfo = gd(c);
      height = width = 625;
      b.id ? (requestInfo.$.providerId = b.id, requestInfo.$.scope = b.scope || "", requestInfo.$.appId = a.Ub.wc, requestInfo.Xc.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=" + height + ",width=" + width + ",top=" + ("object" === typeof screen ? .5 * (screen.height - height) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - width) : 0), requestInfo.Xc.relay_url = Ma(a.Ub.wc),
        requestInfo.Xc.requestWithCredential = r(a.cb, a), qd(a, e, "/auth/oauth", requestInfo, function(a, b) {
          C(d, a, b)
        })) : setTimeout(function() {
        C(d, oa("TRANSPORT_UNAVAILABLE_FOR_UNKNOWN_PROVIDER"))
      }, 0)
    }

    function Uc(a, b, c, d) {
      pd(a);
      var e = ec(["Redirect"]);
      c = gd(c);
      b.id ? (c.$.providerId = b.id, c.$.scope = b.scope || "", c.$.appId = a.Ub.wc, v.set("redirect_client_options", c.fd), qd(a, e, "/auth/oauth", c, function(a, b) {
        C(d, a, b)
      })) : C(d, oa("TRANSPORT_UNAVAILABLE"))
    }

    function jd(a) {
      var b = v.get("redirect_request_id");
      if (b) {
        var c = v.get("redirect_client_options"),
          d = ec(["XHR", "JSONP"]);
        serverParams = {
          requestId: b,
          requestKey: Ja()
        };
        transportOptions = {};
        requestInfo = new ed(c, transportOptions, serverParams);
        try {
          document.location.hash = document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/, "")
        } catch (e) {}
        qd(a, d, "/auth/session", requestInfo, function() {
          v.remove("redirect_request_id");
          v.remove("redirect_client_options")
        }.bind(a))
      }
    }

    function sd(a, b, c) {
      pd(a);
      b = gd(b);
      b.$._method = "POST";
      a.cb("/auth/signupNewUser", b, function(b, e) {
        !b && e && e.idToken ? od(a, e.idToken, null, function(a, b) {
          C(c, a, b)
        }) : C(c, b)
      })
    }

    function Rc(a, b, c, d) {
      var e = {
          idToken: c.idToken
        },
        f = c.photoURL || a.Wa.currentUser.photoURL,
        g = c.displayName || a.Wa.currentUser.displayName;
      switch (b) {
        case "unlink":
          e.deleteProvider = c.deleteProvider;
          break;
        case "profile":
          e.photoUrl = f, e.displayName = g
      }
      td(a, e, function(b, c) {
        b ? C(d, b) : (a.Wa.currentUser.displayName = g, a.Wa.currentUser.photoURL = f, ld(a, a.Wa), C(d, b, c))
      })
    }

    function Oc(a, b, c) {
      td(a, b, function(b, e) {
        b ? C(c, b) : nd(a, e, {}, c)
      })
    }

    function td(a, b, c) {
      b = gd(b);
      b.$._method = "POST";
      b.$.idToken = a.Wa.idToken;
      a.cb("/auth/setAccountInfo", b, function(a, b) {
        a ? c(a) : c(a, b)
      })
    }

    function Yc(a, b, c) {
      pd(a);
      b = gd({
        idToken: b
      });
      b.$._method = "POST";
      a.cb("/auth/getAccountInfo", b, function(b, e) {
        b ? c(b) : c(b, ad(a, e))
      })
    }

    function Mc(a, b, c) {
      pd(a);
      b = gd({
        idToken: b
      });
      b.$._method = "POST";
      a.cb("/auth/deleteAccount", b, function(b, e) {
        !b && e && "ok" == e.status && a.Wa && Sc(a);
        C(c, b)
      })
    }

    function Wc(a, b, c) {
      pd(a);
      b = gd(b);
      b.$._method = "POST";
      a.cb("/auth/getOobConfirmationCode", b, function(a, b) {
        C(c, a, b)
      })
    }
    hd.prototype.me = function(a, b) {
      pd(this);
      var c = gd({
        email: a
      });
      c.$._method = "POST";
      this.cb("/auth/getProvider", c, function(a, c) {
        a ? C(b, a) : C(b, a, c.allProviders || [])
      })
    };
    hd.prototype.cb = function(a, b, c) {
      var d = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
      ud(this, d, a, b, c)
    };

    function qd(a, b, c, d, e) {
      ud(a, b, c, d, function(b, c) {
        !b && c && c.idToken ? nd(a, c, d.fd, function(a, b) {
          a ? e(a) : e(null, b)
        }) : e(b || oa("UNKNOWN_ERROR"))
      })
    }

    function ud(a, b, c, d, e) {
      b = ab(b, function(a) {
        return "function" === typeof a.isAvailable && a.isAvailable()
      });
      0 === b.length ? setTimeout(function() {
        e(oa("TRANSPORT_UNAVAILABLE"))
      }, 0) : (b = b.shift(), d.Xc.method = d.$._method, b = new b(d.Xc), d = ra(d.$), d.v = CLIENT_TYPE + CLIENT_VERSION, d.transport = "json", d.suppress_status_codes = !0, a = Ka() + "/" + a.Ub.wc + c, b.open(a, d, function(a, b) {
        if (a) e(a);
        else if (b && b.error) {
          var c = Error(b.message);
          c.code = b.errcode;
          e(c)
        } else e(null, b)
      }))
    }

    function ld(a, b, c) {
      a.rc.clear();
      c = c || {};
      var d = Ua;
      "sessionOnly" === c.remember && (d = v);
      "none" !== c.remember && a.rc.set(b, d)
    }

    function md(a, b) {
      a.Wa = b;
      a.fb.currentUser = b && b.signIn ? b.currentUser : null;
      a.Ib && a.Ib(null !== b);
      b && b.signIn || a.rc.clear();
      a.M.emit(a.M.Ha.Na, b || {
        signIn: !1
      })
    }

    function pd(a) {
      if (a.Ub.hf && "auth.wilddog.com" === Fa) throw Error("This custom Wilddog server ('" + a.Ub.domain + "') does not support delegated login.");
    }

    function Vc(a, b, c) {
      b = gd(b);
      b.$._method = "POST";
      a.cb("/auth/verifyPhone", b, function(b, e) {
        !b && e && "ok" == e.status && a.fb.currentUser && (a.fb.currentUser.phoneVerified = !0);
        !b && e && e.idToken ? od(a, e.idToken, null, function(a) {
          C(c, a)
        }) : C(c, b)
      })
    }

    function vd(a, b, c) {
      pd(a);
      b = gd(b);
      b.$._method = "POST";
      a.cb("/auth/resetPhonePassword", b, function(a, b) {
        a ? C(c, a) : C(c, a, b)
      })
    }

    function Xc(a, b, c) {
      pd(a);
      b = gd(b);
      b.$._method = "POST";
      a.cb("/auth/sendSmsCode", b, function(a, b) {
        C(c, a, b)
      })
    };

    function F(a, b, c, d) {
      var e;
      d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
      if (e) throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }

    function xd(a, b, c) {
      switch (b) {
        case 1:
          b = c ? "first" : "First";
          break;
        case 2:
          b = c ? "second" : "Second";
          break;
        case 3:
          b = c ? "third" : "Third";
          break;
        case 4:
          b = c ? "fourth" : "Fourth";
          break;
        default:
          throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
      }
      return a + " failed: " + (b + " argument ")
    }

    function G(a, b, c, d) {
      if ((!d || p(c)) && !ga(c)) throw Error(xd(a, b, d) + "must be a valid function.");
    }

    function yd(a, b, c) {
      if (p(c) && (!ha(c) || null === c)) throw Error(xd(a, b, !0) + "must be a valid context object.");
    };

    function I(a, b) {
      if (1 == arguments.length) {
        this.C = a.split("/");
        for (var c = 0, d = 0; d < this.C.length; d++) 0 < this.C[d].length && (this.C[c] = this.C[d], c++);
        this.C.length = c;
        this.ca = 0
      } else this.C = a, this.ca = b
    }

    function J(a, b) {
      var c = K(a);
      if (null === c) return b;
      if (c === K(b)) return J(L(a), L(b));
      throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }

    function K(a) {
      return a.ca >= a.C.length ? null : a.C[a.ca]
    }

    function zd(a) {
      return a.C.length - a.ca
    }

    function L(a) {
      var b = a.ca;
      b < a.C.length && b++;
      return new I(a.C, b)
    }

    function Ad(a) {
      return a.ca < a.C.length ? a.C[a.C.length - 1] : null
    }
    h = I.prototype;
    h.toString = function() {
      for (var a = "", b = this.ca; b < this.C.length; b++) "" !== this.C[b] && (a += "/" + this.C[b]);
      return a || "/"
    };
    h.slice = function(a) {
      return this.C.slice(this.ca + (a || 0))
    };
    h.parent = function() {
      if (this.ca >= this.C.length) return null;
      for (var a = [], b = this.ca; b < this.C.length - 1; b++) a.push(this.C[b]);
      return new I(a, 0)
    };
    h.w = function(a) {
      for (var b = [], c = this.ca; c < this.C.length; c++) b.push(this.C[c]);
      if (a instanceof I)
        for (c = a.ca; c < a.C.length; c++) b.push(a.C[c]);
      else
        for (a = a.split("/"), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
      return new I(b, 0)
    };
    h.f = function() {
      return this.ca >= this.C.length
    };
    h.fa = function(a) {
      if (zd(this) !== zd(a)) return !1;
      for (var b = this.ca, c = a.ca; b <= this.C.length; b++, c++)
        if (this.C[b] !== a.C[c]) return !1;
      return !0
    };
    h.contains = function(a) {
      var b = this.ca,
        c = a.ca;
      if (zd(this) > zd(a)) return !1;
      for (; b < this.C.length;) {
        if (this.C[b] !== a.C[c]) return !1;
        ++b;
        ++c
      }
      return !0
    };
    var M = new I("");

    function Bd(a, b) {
      this.ab = a.slice();
      this.Oa = Math.max(1, this.ab.length);
      this.Ze = b;
      for (var c = 0; c < this.ab.length; c++) this.Oa += Cd(this.ab[c]);
      Dd(this)
    }
    Bd.prototype.push = function(a) {
      0 < this.ab.length && (this.Oa += 1);
      this.ab.push(a);
      this.Oa += Cd(a);
      Dd(this)
    };
    Bd.prototype.pop = function() {
      var a = this.ab.pop();
      this.Oa -= Cd(a);
      0 < this.ab.length && --this.Oa
    };

    function Dd(a) {
      if (768 < a.Oa) throw Error(a.Ze + "has a key path longer than 768 bytes (" + a.Oa + ").");
      if (32 < a.ab.length) throw Error(a.Ze + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + Ed(a));
    }

    function Ed(a) {
      return 0 == a.ab.length ? "" : "in property '" + a.ab.join(".") + "'"
    };

    function Cd(a) {
      for (var b = 0, c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3
      }
      return b
    };
    var Fd = /[\[\].#$\/\u0000-\u001F\u007F]/,
      Gd = /[\[\].#$\u0000-\u001F\u007F]/;

    function Hd(a) {
      return q(a) && 0 !== a.length && !Fd.test(a)
    }

    function Id(a) {
      return null === a || q(a) || fa(a) && !zc(a) || ha(a) && pa(a, ".sv")
    }

    function Jd(a, b, c, d) {
      d && !p(b) || Kd(xd(a, 1, d), b, c)
    }

    function Kd(a, b, c) {
      c instanceof I && (c = new Bd(c, a));
      if (!p(b)) throw Error(a + "contains undefined " + Ed(c));
      if (ga(b)) throw Error(a + "contains a function " + Ed(c) + " with contents: " + b.toString());
      if (zc(b)) throw Error(a + "contains " + b.toString() + " " + Ed(c));
      if (q(b) && b.length > 10485760 / 3 && 10485760 < Cd(b)) throw Error(a + "contains a string greater than 10485760 utf8 bytes " + Ed(c) + " ('" + b.substring(0, 50) + "...')");
      if (ha(b)) {
        var d = !1,
          e = !1;
        qa(b, function(b, g) {
          if (".value" === b) d = !0;
          else if (".priority" !== b && ".sv" !== b && (e = !0, !Hd(b))) throw Error(a + " contains an invalid key (" + b + ") " + Ed(c) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
          c.push(b);
          Kd(a, g, c);
          c.pop()
        });
        if (d && e) throw Error(a + ' contains ".value" child ' + Ed(c) + " in addition to actual children.");
      }
    }

    function Ld(a, b) {
      var c, d;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        for (var e = d.slice(), f = 0; f < e.length; f++)
          if ((".priority" !== e[f] || f !== e.length - 1) && !Hd(e[f])) throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
      }
      b.sort(I.qh);
      e = null;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        if (null !== e && e.contains(d)) throw Error(a + "contains a path " + e.toString() + " that is ancestor of another path " + d.toString());
        e = d
      }
    }

    function Md(a, b, c) {
      var d = xd(a, 1, !1);
      if (!ha(b) || ea(b)) throw Error(d + " must be an Object containing the children to replace.");
      if (pa(b, ".value")) throw Error(d + ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
      var e = [];
      qa(b, function(a, b) {
        var f = new I(a);
        Kd(d, b, c.w(f));
        if (".priority" === Ad(f) && !Id(b)) throw Error(d + "contains an invalid value for '" + f.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
        e.push(f)
      });
      Ld(d, e)
    }

    function Nd(a, b, c) {
      if (zc(c)) throw Error(xd(a, b, !1) + "is " + c.toString() + ", but must be a valid Wilddog priority (a string, finite number, server value, or null).");
      if (!Id(c)) throw Error(xd(a, b, !1) + "must be a valid Wilddog priority (a string, finite number, server value, or null).");
    }

    function Od(a, b, c) {
      if (!c || p(b)) switch (b) {
        case "value":
        case "child_added":
        case "child_removed":
        case "child_changed":
        case "child_moved":
          break;
        default:
          throw Error(xd(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
      }
    }

    function Pd(a, b, c, d) {
      if ((!d || p(c)) && !Hd(c)) throw Error(xd(a, b, d) + 'was an invalid key: "' + c + '".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }

    function Qd(a, b) {
      if (!q(b) || 0 === b.length || Gd.test(b)) throw Error(xd(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }

    function Rd(a, b) {
      b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
      Qd(a, b)
    }

    function Sd(a, b) {
      if (".info" === K(b)) throw Error(a + " failed: Can't modify data under /.info/");
    }

    function Qc(a, b, c) {
      if (!q(c)) throw Error(xd(a, b, !1) + "must be a valid string.");
    }

    function Nc(a, b) {
      if (!ha(b) || null === b) throw Error(xd(a, 1, !1) + "must be a valid object.");
    };

    function Td(a) {
      this.fb = a
    }
    Td.prototype.ig = function() {
      return this.fb.Te
    };
    Td.prototype.getAuthRevokListener = Td.prototype.ig;

    function N(a) {
      if (!a.options.authDomain) throw Error("Could not find 'authDomain' in options.");
      var b = this;
      this.Pf = function(a) {
        var b = /^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());
        if (!b) throw Error("Bad 'authDomain' format '" + a + "'.");
        return {
          wc: b[1],
          xh: b[2],
          oh: b[0],
          Jd: "",
          hf: "wilddog" !== b[2]
        }
      }(a.options.authDomain);
      this.app = a;
      this.ea = new hd(this, this.Pf);
      this.Te = function(a) {
        var c = b.ea;
        a = a.reason;
        c.fb.currentUser && (c.rc.clear(), c.Wa = null, c.fb.currentUser = null, c.M.emit(c.M.Ha.Na, {
            signIn: !1,
            reason: a
          }),
          c.Ib && c.Ib(!1))
      };
      this.app.bind(this.app.Ha.bd, this.Te);
      this.INTERNAL = new Td(this)
    }
    N.prototype.sg = function(a) {
      function b(b) {
        var d;
        if (!(d = b && b.signIn)) {
          var f = c.ea;
          d = v.get("redirect_request_id");
          f = f.rc.get();
          d = !(d || f && f.idToken)
        }
        d && a(b && b.signIn ? b.currentUser : null)
      }
      var c = this;
      F("wilddog.auth().onAuthStateChanged", 1, 1, arguments.length);
      G("wilddog.auth().onAuthStateChanged", 1, a, !1);
      this.app.bind(this.app.Ha.Na, b);
      return function() {
        c.app.unbind(c.app.Ha.Na, b)
      }
    };
    N.prototype.onAuthStateChanged = N.prototype.sg;
    N.prototype.Pg = function(a) {
      F("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
      G("wilddog.auth().signInAnonymously", 1, a, !0);
      var b = new x;
      sd(this.ea, {}, y(b, a));
      return b.o
    };
    N.prototype.signInAnonymously = N.prototype.Pg;
    N.prototype.Qg = function(a) {
      F("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
      G("wilddog.auth().signInAnonymously", 1, a, !0);
      var b = new x;
      rd(this.ea, y(b, a));
      return b.o
    };
    N.prototype.signInWeapp = N.prototype.Qg;
    N.prototype.Jg = function(a, b) {
      F("wilddog.auth().sendPasswordResetEmail", 1, 2, arguments.length);
      G("wilddog.auth().sendPasswordResetEmail", 2, b, !0);
      var c = new x;
      Wc(this.ea, {
        requestType: "RESET_PASSWORD",
        email: a
      }, y(c, b));
      return c.o
    };
    N.prototype.sendPasswordResetEmail = N.prototype.Jg;
    N.prototype.Kg = function(a, b) {
      F("wilddog.auth().sendPasswordResetSms", 1, 2, arguments.length);
      G("wilddog.auth().sendPasswordResetSms", 2, b, !0);
      var c = new x;
      Xc(this.ea, {
        type: "PASSWORD_RESET",
        phoneNumber: a
      }, y(c, b));
      return c.o
    };
    N.prototype.sendPasswordResetSms = N.prototype.Kg;
    N.prototype.Wf = function(a, b, c, d) {
      F("wilddog.auth().sendPasswordResetSms", 3, 4, arguments.length);
      G("wilddog.auth().sendPasswordResetSms", 4, d, !0);
      Qc("wilddog.auth().sendPasswordResetSms", 2, b);
      var e = new x;
      vd(this.ea, {
        phoneNumber: a,
        password: c,
        smsCode: b
      }, y(e, d));
      return e.o
    };
    N.prototype.confirmPasswordResetSms = N.prototype.Wf;
    N.prototype.me = function(a, b) {
      F("wilddog.auth().fetchProvidersForEmail", 1, 2, arguments.length);
      G("wilddog.auth().fetchProvidersForEmail", 2, b, !0);
      var c = new x;
      this.ea.me(a, y(c, b));
      return c.o
    };
    N.prototype.fetchProvidersForEmail = N.prototype.me;
    N.prototype.Sg = function(a, b) {
      F("wilddog.auth().signInWithCustomToken", 1, 2, arguments.length);
      G("wilddog.auth().signInWithCustomToken", 2, b, !0);
      var c = new x;
      Pc(this.ea, {
        providerId: "custom",
        token: a
      }, y(c, b));
      return c.o
    };
    N.prototype.signInWithCustomToken = N.prototype.Sg;
    N.prototype.Tg = function(a, b, c) {
      F("wilddog.auth().signInWithEmailAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().signInWithEmailAndPassword", 3, c, !0);
      var d = new x;
      Pc(this.ea, {
        providerId: "password",
        password: b,
        email: a
      }, y(d, c));
      return d.o
    };
    N.prototype.signInWithEmailAndPassword = N.prototype.Tg;
    N.prototype.Ug = function(a, b, c) {
      F("wilddog.auth().signInWithPhoneAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().signInWithPhoneAndPassword", 3, c, !0);
      var d = new x;
      Pc(this.ea, {
        providerId: "password",
        password: b,
        phoneNumber: a
      }, y(d, c));
      return d.o
    };
    N.prototype.signInWithPhoneAndPassword = N.prototype.Ug;
    N.prototype.Xg = function(a) {
      F("wilddog.auth().signOut", 0, 1, arguments.length);
      G("wilddog.auth().signOut", 1, a, !0);
      var b = new x;
      Sc(this.ea, y(b, a));
      return b.o
    };
    N.prototype.signOut = N.prototype.Xg;
    N.prototype.Xf = function(a, b, c) {
      F("wilddog.auth().createUserWithEmailAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().createUserWithEmailAndPassword", 3, c, !0);
      var d = new x;
      sd(this.ea, {
        email: a,
        password: b
      }, y(d, c));
      return d.o
    };
    N.prototype.createUserWithEmailAndPassword = N.prototype.Xf;
    N.prototype.Yf = function(a, b, c) {
      F("wilddog.auth().createUserWithPhoneAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().createUserWithPhoneAndPassword", 3, c, !0);
      var d = new x;
      sd(this.ea, {
        phoneNumber: a,
        password: b
      }, y(d, c));
      return d.o
    };
    N.prototype.createUserWithPhoneAndPassword = N.prototype.Yf;
    N.prototype.Vg = function(a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Nc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Tc(this.ea, a, {
        authType: "login"
      }, y(c, b));
      return c.o
    };
    N.prototype.signInWithPopup = N.prototype.Vg;
    N.prototype.Wg = function(a, b) {
      F("wilddog.auth().signInWithRedirect", 1, 2, arguments.length);
      Nc("wilddog.auth().signInWithRedirect", a);
      var c = new x;
      Uc(this.ea, a, {
        authType: "login"
      }, y(c, b));
      return c.o
    };
    N.prototype.signInWithRedirect = N.prototype.Wg;
    N.prototype.Rg = function(a, b) {
      F("wilddog.auth().signInWithCredential", 1, 2, arguments.length);
      Nc("wilddog.auth().signInWithCredential", a);
      var c = {};
      "password" == a.provider ? (c.providerId = a.provider, c.email = a.email, c.phoneNumber = a.phone, c.password = a.password) : (c.providerId = a.provider, c.accessToken = a.accessToken, c.openId = a.openId || a.email);
      c.authType = "login";
      var d = new x;
      Pc(this.ea, c, y(d, b));
      return d.o
    };
    N.prototype.signInWithCredential = N.prototype.Rg;

    function Ud() {
      this.We = "DEFAULT";
      this.rg = {};
      this.Zc = {};
      this.fe = this.app = null
    }
    Ud.prototype.ng = function(a, b) {
      var c = b || this.We;
      this.Zc[c] = new D(a, c);
      b == this.We || null == b ? this.app = this.Zc[c] : this[c] = this.Zc[c];
      return this.Zc[c]
    };
    Ud.prototype.initializeApp = Ud.prototype.ng;
    Ud.prototype.Ee = function(a, b) {
      this.rg[a] = b;
      Jc(a, b);
      this[a] = function() {
        if (this.app) return this.app[a]();
        throw Error("Default application not initialized!Please call wilddog.initializeApp first.");
      }
    };
    Ud.prototype.regService = Ud.prototype.Ee;
    Ud.prototype.Pe = CLIENT_VERSION;
    Ud.prototype.SDK_VERSION = Ud.prototype.Pe;
    var Vd = new Ud;

    function Wd(a, b) {
      return Ac(a.name, b.name)
    }

    function Xd(a, b) {
      return Ac(a, b)
    };

    function Yd() {}
    var Zd = {};

    function $d(a) {
      return r(a.compare, a)
    }
    Yd.prototype.td = function(a, b) {
      return 0 !== this.compare(new O("[MIN_NAME]", a), new O("[MIN_NAME]", b))
    };

    function ae(a) {
      this.ic = a
    }
    la(ae, Yd);
    h = ae.prototype;
    h.Ec = function(a) {
      return !a.S(this.ic).f()
    };
    h.compare = function(a, b) {
      var c = a.node.S(this.ic),
        d = b.node.S(this.ic),
        c = c.zc(d);
      return 0 === c ? Ac(a.name, b.name) : c
    };
    h.Jc = function(a, b) {
      var c = P(a),
        c = Q.V(this.ic, c);
      return new O(b, c)
    };
    h.Kc = function() {
      var a = Q.V(this.ic, be);
      return new O("[MAX_NAME]", a)
    };
    h.toString = function() {
      return this.ic
    };

    function ce() {}
    la(ce, Yd);
    h = ce.prototype;
    h.compare = function(a, b) {
      var c = a.node.H(),
        d = b.node.H(),
        c = c.zc(d);
      return 0 === c ? Ac(a.name, b.name) : c
    };
    h.Ec = function(a) {
      return !a.H().f()
    };
    h.td = function(a, b) {
      return !a.H().fa(b.H())
    };
    h.Kc = function() {
      return new O("[MAX_NAME]", new de("[PRIORITY-POST]", be))
    };
    h.Jc = function(a, b) {
      var c = P(a);
      return new O(b, new de("[PRIORITY-POST]", c))
    };
    h.toString = function() {
      return ".priority"
    };
    var R = new ce;

    function ee() {}
    la(ee, Yd);
    h = ee.prototype;
    h.compare = function(a, b) {
      return Ac(a.name, b.name)
    };
    h.Ec = function() {
      throw qc("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.td = function() {
      return !1
    };
    h.Kc = function() {
      return new O("[MAX_NAME]", Q)
    };
    h.Jc = function(a) {
      z(q(a), "KeyIndex indexValue must always be a string.");
      return new O(a, Q)
    };
    h.toString = function() {
      return ".key"
    };
    var fe = new ee;

    function ge() {}
    la(ge, Yd);
    h = ge.prototype;
    h.compare = function(a, b) {
      var c = a.node.zc(b.node);
      return 0 === c ? Ac(a.name, b.name) : c
    };
    h.Ec = function() {
      return !0
    };
    h.td = function(a, b) {
      return !a.fa(b)
    };
    h.Kc = function() {
      return he
    };
    h.Jc = function(a, b) {
      var c = P(a);
      return new O(b, c)
    };
    h.toString = function() {
      return ".value"
    };
    var ie = new ge;

    function je(a, b) {
      this.ud = a;
      this.jc = b
    }
    je.prototype.get = function(a) {
      var b = t(this.ud, a);
      if (!b) throw Error("No index defined for " + a);
      return b === Zd ? null : b
    };

    function ke(a, b, c) {
      var d = mb(a.ud, function(d, f) {
        var e = t(a.jc, f);
        z(e, "Missing index implementation for " + f);
        if (d === Zd) {
          if (e.Ec(b.node)) {
            for (var k = [], l = c.cc(le), m = S(l); m;) m.name != b.name && k.push(m), m = S(l);
            k.push(b);
            return me(k, $d(e))
          }
          return Zd
        }
        e = c.get(b.name);
        k = d;
        e && (k = k.remove(new O(b.name, e)));
        return k.Ya(b, b.node)
      });
      return new je(d, a.jc)
    }

    function ne(a, b, c) {
      var d = mb(a.ud, function(a) {
        if (a === Zd) return a;
        var d = c.get(b.name);
        return d ? a.remove(new O(b.name, d)) : a
      });
      return new je(d, a.jc)
    }
    var oe = new je({
      ".priority": Zd
    }, {
      ".priority": R
    });

    function O(a, b) {
      this.name = a;
      this.node = b
    }

    function le(a, b) {
      return new O(a, b)
    };

    function de(a, b) {
      this.J = a;
      z(p(this.J) && null !== this.J, "LeafNode shouldn't be created with null/undefined value.");
      this.ha = b || Q;
      pe(this.ha);
      this.Fb = null
    }
    h = de.prototype;
    h.T = function() {
      return !0
    };
    h.H = function() {
      return this.ha
    };
    h.ia = function(a) {
      return new de(this.J, a)
    };
    h.S = function(a) {
      return ".priority" === a ? this.ha : Q
    };
    h.va = function(a) {
      return a.f() ? this : ".priority" === K(a) ? this.ha : Q
    };
    h.Sa = function() {
      return !1
    };
    h.df = function() {
      return null
    };
    h.V = function(a, b) {
      return ".priority" === a ? this.ia(b) : b.f() && ".priority" !== a ? this : Q.V(a, b).ia(this.ha)
    };
    h.L = function(a, b) {
      var c = K(a);
      if (null === c) return b;
      if (b.f() && ".priority" !== c) return this;
      z(".priority" !== c || 1 === zd(a), ".priority must be the last token in a path");
      return this.V(c, Q.L(L(a), b))
    };
    h.f = function() {
      return !1
    };
    h.Gb = function() {
      return 0
    };
    h.R = function(a) {
      return a && !this.H().f() ? {
        ".value": this.La(),
        ".priority": this.H().R()
      } : this.La()
    };
    h.hash = function() {
      if (null === this.Fb) {
        var a = "";
        this.ha.f() || (a += "priority:" + qe(this.ha.R()) + ":");
        var b = typeof this.J,
          a = a + (b + ":"),
          a = "number" === b ? a + Ec(this.J) : a + this.J;
        this.Fb = sc(a)
      }
      return this.Fb
    };
    h.La = function() {
      return this.J
    };
    h.zc = function(a) {
      if (a === Q) return 1;
      if (a instanceof T) return -1;
      z(a.T(), "Unknown node type");
      var b = typeof a.J,
        c = typeof this.J,
        d = $a(re, b),
        e = $a(re, c);
      z(0 <= d, "Unknown leaf type: " + b);
      z(0 <= e, "Unknown leaf type: " + c);
      return d === e ? "object" === c ? 0 : this.J < a.J ? -1 : this.J === a.J ? 0 : 1 : e - d
    };
    var re = ["object", "boolean", "number", "string"];
    de.prototype.wb = function() {
      return this
    };
    de.prototype.Fc = function() {
      return !0
    };
    de.prototype.fa = function(a) {
      return a === this ? !0 : a.T() ? this.J === a.J && this.ha.fa(a.ha) : !1
    };
    de.prototype.toString = function() {
      return u(this.R(!0))
    };

    function se(a, b) {
      this.Xa = a;
      this.Fa = b ? b : te
    }
    h = se.prototype;
    h.Ya = function(a, b) {
      return new se(this.Xa, this.Fa.Ya(a, b, this.Xa).ba(null, null, ue, null, null))
    };
    h.remove = function(a) {
      return new se(this.Xa, this.Fa.remove(a, this.Xa).ba(null, null, ue, null, null))
    };
    h.get = function(a) {
      for (var b, c = this.Fa; !c.f();) {
        b = this.Xa(a, c.key);
        if (0 === b) return c.value;
        0 > b ? c = c.left : 0 < b && (c = c.right)
      }
      return null
    };

    function ve(a, b) {
      for (var c, d = a.Fa, e = null; !d.f();) {
        c = a.Xa(b, d.key);
        if (0 === c) {
          if (d.left.f()) return e ? e.key : null;
          for (d = d.left; !d.right.f();) d = d.right;
          return d.key
        }
        0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
      }
      throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    h.f = function() {
      return this.Fa.f()
    };
    h.count = function() {
      return this.Fa.count()
    };
    h.Mc = function() {
      return this.Fa.Mc()
    };
    h.lc = function() {
      return this.Fa.lc()
    };
    h.ra = function(a) {
      return this.Fa.ra(a)
    };
    h.cc = function(a) {
      return new we(this.Fa, null, this.Xa, !1, a)
    };
    h.dc = function(a, b) {
      return new we(this.Fa, a, this.Xa, !1, b)
    };
    h.fc = function(a, b) {
      return new we(this.Fa, a, this.Xa, !0, b)
    };
    h.ef = function(a) {
      return new we(this.Fa, null, this.Xa, !0, a)
    };

    function we(a, b, c, d, e) {
      this.Pd = e || null;
      this.we = d;
      for (this.$a = []; !a.f();)
        if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e) a = this.we ? a.left : a.right;
        else if (0 === e) {
        this.$a.push(a);
        break
      } else this.$a.push(a), a = this.we ? a.right : a.left
    }

    function S(a) {
      if (0 === a.$a.length) return null;
      var b = a.$a.pop(),
        c;
      c = a.Pd ? a.Pd(b.key, b.value) : {
        key: b.key,
        value: b.value
      };
      if (a.we)
        for (b = b.left; !b.f();) a.$a.push(b), b = b.right;
      else
        for (b = b.right; !b.f();) a.$a.push(b), b = b.left;
      return c
    }

    function xe(a) {
      if (0 === a.$a.length) return null;
      var b;
      b = a.$a;
      b = b[b.length - 1];
      return a.Pd ? a.Pd(b.key, b.value) : {
        key: b.key,
        value: b.value
      }
    }

    function ye(a, b, c, d, e) {
      this.key = a;
      this.value = b;
      this.color = null != c ? c : ze;
      this.left = null != d ? d : te;
      this.right = null != e ? e : te
    }
    var ze = !0,
      ue = !1;
    h = ye.prototype;
    h.ba = function(a, b, c, d, e) {
      return new ye(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right)
    };
    h.count = function() {
      return this.left.count() + 1 + this.right.count()
    };
    h.f = function() {
      return !1
    };
    h.ra = function(a) {
      return this.left.ra(a) || a(this.key, this.value) || this.right.ra(a)
    };

    function Ae(a) {
      return a.left.f() ? a : Ae(a.left)
    }
    h.Mc = function() {
      return Ae(this).key
    };
    h.lc = function() {
      return this.right.f() ? this.key : this.right.lc()
    };
    h.Ya = function(a, b, c) {
      var d, e;
      e = this;
      d = c(a, e.key);
      e = 0 > d ? e.ba(null, null, null, e.left.Ya(a, b, c), null) : 0 === d ? e.ba(null, b, null, null, null) : e.ba(null, null, null, null, e.right.Ya(a, b, c));
      return Be(e)
    };

    function Ce(a) {
      if (a.left.f()) return te;
      a.left.la() || a.left.left.la() || (a = De(a));
      a = a.ba(null, null, null, Ce(a.left), null);
      return Be(a)
    }
    h.remove = function(a, b) {
      var c, d;
      c = this;
      if (0 > b(a, c.key)) c.left.f() || c.left.la() || c.left.left.la() || (c = De(c)), c = c.ba(null, null, null, c.left.remove(a, b), null);
      else {
        c.left.la() && (c = Ee(c));
        c.right.f() || c.right.la() || c.right.left.la() || (c = Fe(c), c.left.left.la() && (c = Ee(c), c = Fe(c)));
        if (0 === b(a, c.key)) {
          if (c.right.f()) return te;
          d = Ae(c.right);
          c = c.ba(d.key, d.value, null, null, Ce(c.right))
        }
        c = c.ba(null, null, null, null, c.right.remove(a, b))
      }
      return Be(c)
    };
    h.la = function() {
      return this.color
    };

    function Be(a) {
      a.right.la() && !a.left.la() && (a = Ge(a));
      a.left.la() && a.left.left.la() && (a = Ee(a));
      a.left.la() && a.right.la() && (a = Fe(a));
      return a
    }

    function De(a) {
      a = Fe(a);
      a.right.left.la() && (a = a.ba(null, null, null, null, Ee(a.right)), a = Ge(a), a = Fe(a));
      return a
    }

    function Ge(a) {
      return a.right.ba(null, null, a.color, a.ba(null, null, ze, null, a.right.left), null)
    }

    function Ee(a) {
      return a.left.ba(null, null, a.color, null, a.ba(null, null, ze, a.left.right, null))
    }

    function Fe(a) {
      return a.ba(null, null, !a.color, a.left.ba(null, null, !a.left.color, null, null), a.right.ba(null, null, !a.right.color, null, null))
    }

    function He() {}
    h = He.prototype;
    h.ba = function() {
      return this
    };
    h.Ya = function(a, b) {
      return new ye(a, b, null)
    };
    h.remove = function() {
      return this
    };
    h.count = function() {
      return 0
    };
    h.f = function() {
      return !0
    };
    h.ra = function() {
      return !1
    };
    h.Mc = function() {
      return null
    };
    h.lc = function() {
      return null
    };
    h.la = function() {
      return !1
    };
    var te = new He;

    function T(a, b, c) {
      this.A = a;
      (this.ha = b) && pe(this.ha);
      a.f() && z(!this.ha || this.ha.f(), "An empty node cannot have a priority");
      this.Db = c;
      this.Fb = null
    }
    h = T.prototype;
    h.T = function() {
      return !1
    };
    h.H = function() {
      return this.ha || Q
    };
    h.ia = function(a) {
      return this.A.f() ? this : new T(this.A, a, this.Db)
    };
    h.S = function(a) {
      if (".priority" === a) return this.H();
      a = this.A.get(a);
      return null === a ? Q : a
    };
    h.va = function(a) {
      var b = K(a);
      return null === b ? this : this.S(b).va(L(a))
    };
    h.Sa = function(a) {
      return null !== this.A.get(a)
    };
    h.V = function(a, b) {
      z(b, "We should always be passing snapshot nodes");
      if (".priority" === a) return this.ia(b);
      var c = new O(a, b),
        d, e;
      b.f() ? (d = this.A.remove(a), c = ne(this.Db, c, this.A)) : (d = this.A.Ya(a, b), c = ke(this.Db, c, this.A));
      e = d.f() ? Q : this.ha;
      return new T(d, e, c)
    };
    h.L = function(a, b) {
      var c = K(a);
      if (null === c) return b;
      z(".priority" !== K(a) || 1 === zd(a), ".priority must be the last token in a path");
      var d = this.S(c).L(L(a), b);
      return this.V(c, d)
    };
    h.f = function() {
      return this.A.f()
    };
    h.Gb = function() {
      return this.A.count()
    };
    var Ie = /^(0|[1-9]\d*)$/;
    h = T.prototype;
    h.R = function(a) {
      if (this.f()) return null;
      var b = {},
        c = 0,
        d = 0,
        e = !0;
      this.Y(R, function(f, g) {
        b[f] = g.R(a);
        c++;
        e && Ie.test(f) ? d = Math.max(d, Number(f)) : e = !1
      });
      if (!a && e && d < 2 * c) {
        var f = [],
          g;
        for (g in b) f[g] = b[g];
        return f
      }
      a && !this.H().f() && (b[".priority"] = this.H().R());
      return b
    };
    h.hash = function() {
      if (null === this.Fb) {
        var a = "";
        this.H().f() || (a += "priority:" + qe(this.H().R()) + ":");
        this.Y(R, function(b, c) {
          var d = c.hash();
          "" !== d && (a += ":" + b + ":" + d)
        });
        this.Fb = "" === a ? "" : sc(a)
      }
      return this.Fb
    };
    h.df = function(a, b, c) {
      return (c = Je(this, c)) ? (a = ve(c, new O(a, b))) ? a.name : null : ve(this.A, a)
    };

    function Ke(a, b) {
      var c;
      c = (c = Je(a, b)) ? (c = c.Mc()) && c.name : a.A.Mc();
      return c ? new O(c, a.A.get(c)) : null
    }

    function Le(a, b) {
      var c;
      c = (c = Je(a, b)) ? (c = c.lc()) && c.name : a.A.lc();
      return c ? new O(c, a.A.get(c)) : null
    }
    h.Y = function(a, b) {
      var c = Je(this, a);
      return c ? c.ra(function(a) {
        return b(a.name, a.node)
      }) : this.A.ra(b)
    };
    h.cc = function(a) {
      return this.dc(Me, a)
    };
    h.dc = function(a, b) {
      var c = Je(this, b);
      if (c) return c.dc(a, function(a) {
        return a
      });
      for (var c = this.A.dc(a.name, le), d = xe(c); null != d && 0 > b.compare(d, a);) S(c), d = xe(c);
      return c
    };
    h.ef = function(a) {
      return this.fc(a.Kc(), a)
    };
    h.fc = function(a, b) {
      var c = Je(this, b);
      if (c) return c.fc(a, function(a) {
        return a
      });
      for (var c = this.A.fc(a.name, le), d = xe(c); null != d && 0 < b.compare(d, a);) S(c), d = xe(c);
      return c
    };
    h.zc = function(a) {
      return this.f() ? a.f() ? 0 : -1 : a.T() || a.f() ? 1 : a === be ? -1 : 0
    };
    h.wb = function(a) {
      if (a === fe || tb(this.Db.jc, a.toString())) return this;
      var b = this.Db,
        c = this.A;
      z(a !== fe, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      for (var d = [], e = !1, c = c.cc(le), f = S(c); f;) e = e || a.Ec(f.node), d.push(f), f = S(c);
      d = e ? me(d, $d(a)) : Zd;
      e = a.toString();
      c = xb(b.jc);
      c[e] = a;
      a = xb(b.ud);
      a[e] = d;
      return new T(this.A, this.ha, new je(a, c))
    };
    h.Fc = function(a) {
      return a === fe || tb(this.Db.jc, a.toString())
    };
    h.fa = function(a) {
      if (a === this) return !0;
      if (a.T()) return !1;
      if (this.H().fa(a.H()) && this.A.count() === a.A.count()) {
        var b = this.cc(R);
        a = a.cc(R);
        for (var c = S(b), d = S(a); c && d;) {
          if (c.name !== d.name || !c.node.fa(d.node)) return !1;
          c = S(b);
          d = S(a)
        }
        return null === c && null === d
      }
      return !1
    };

    function Je(a, b) {
      return b === fe ? null : a.Db.get(b.toString())
    }
    h.toString = function() {
      return u(this.R(!0))
    };

    function P(a, b) {
      if (null === a) return Q;
      var c = null;
      "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
      z(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
      "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
      if ("object" !== typeof a || ".sv" in a) return new de(a, P(c));
      if (a instanceof Array) {
        var d = Q,
          e = a;
        w(e, function(a, b) {
          if (pa(e, b) && "." !== b.substring(0, 1)) {
            var c = P(a);
            if (c.T() || !c.f()) d =
              d.V(b, c)
          }
        });
        return d.ia(P(c))
      }
      var f = [],
        g = !1,
        k = a;
      qa(k, function(a) {
        if ("string" !== typeof a || "." !== a.substring(0, 1)) {
          var b = P(k[a]);
          b.f() || (g = g || !b.H().f(), f.push(new O(a, b)))
        }
      });
      if (0 == f.length) return Q;
      var l = me(f, Wd, function(a) {
        return a.name
      }, Xd);
      if (g) {
        var m = me(f, $d(R));
        return new T(l, P(c), new je({
          ".priority": m
        }, {
          ".priority": R
        }))
      }
      return new T(l, P(c), oe)
    }
    var Ne = Math.log(2);

    function Oe(a) {
      this.count = parseInt(Math.log(a + 1) / Ne, 10);
      this.Ve = this.count - 1;
      this.Sf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
    }

    function Pe(a) {
      var b = !(a.Sf & 1 << a.Ve);
      a.Ve--;
      return b
    }

    function me(a, b, c, d) {
      function e(b, d) {
        var f = d - b;
        if (0 == f) return null;
        if (1 == f) {
          var g = a[b],
            k = c ? c(g) : g;
          return new ye(k, g.node, ue, null, null)
        }
        var g = parseInt(f / 2, 10) + b,
          f = e(b, g),
          H = e(g + 1, d),
          g = a[g],
          k = c ? c(g) : g;
        return new ye(k, g.node, ue, f, H)
      }
      a.sort(b);
      var f = function(b) {
        function d(b, d) {
          var k = A - b,
            l = A;
          A -= b;
          var l = e(k + 1, l),
            k = a[k],
            m = c ? c(k) : k,
            l = new ye(m, k.node, d, null, l);
          f ? f.left = l : g = l;
          f = l
        }
        for (var f = null, g = null, A = a.length, H = 0; H < b.count; ++H) {
          var ca = Pe(b),
            kd = Math.pow(2, b.count - (H + 1));
          ca ? d(kd, ue) : (d(kd, ue), d(kd, ze))
        }
        return g
      }(new Oe(a.length));
      return null !== f ? new se(d || b, f) : new se(d || b)
    }

    function qe(a) {
      return "number" === typeof a ? "number:" + Ec(a) : "string:" + a
    }

    function pe(a) {
      if (a.T()) {
        var b = a.R();
        z("string" === typeof b || "number" === typeof b || "object" === typeof b && pa(b, ".sv"), "Priority must be a string or number.")
      } else z(a === be || a.f(), "priority of unexpected type.");
      z(a === be || a.H().f(), "Priority nodes can't have a priority of their own.")
    }
    var Q = new T(new se(Xd), null, oe);

    function Qe() {
      T.call(this, new se(Xd), Q, oe)
    }
    la(Qe, T);
    h = Qe.prototype;
    h.zc = function(a) {
      return a === this ? 0 : 1
    };
    h.fa = function(a) {
      return a === this
    };
    h.H = function() {
      return this
    };
    h.S = function() {
      return Q
    };
    h.f = function() {
      return !1
    };
    var be = new Qe,
      Me = new O("[MIN_NAME]", Q),
      he = new O("[MAX_NAME]", be);

    function U(a, b, c) {
      this.I = a;
      this.Z = b;
      this.g = c
    }
    U.prototype.R = function() {
      F("Wilddog.DataSnapshot.val", 0, 0, arguments.length);
      return this.I.R()
    };
    U.prototype.val = U.prototype.R;
    U.prototype.$e = function() {
      F("Wilddog.DataSnapshot.exportVal", 0, 0, arguments.length);
      return this.I.R(!0)
    };
    U.prototype.exportVal = U.prototype.$e;
    U.prototype.eg = function() {
      F("Wilddog.DataSnapshot.exists", 0, 0, arguments.length);
      return !this.I.f()
    };
    U.prototype.exists = U.prototype.eg;
    U.prototype.w = function(a) {
      F("Wilddog.DataSnapshot.child", 0, 1, arguments.length);
      fa(a) && (a = String(a));
      Qd("Wilddog.DataSnapshot.child", a);
      var b = new I(a),
        c = this.Z.w(b);
      return new U(this.I.va(b), c, R)
    };
    U.prototype.child = U.prototype.w;
    U.prototype.Sa = function(a) {
      F("Wilddog.DataSnapshot.hasChild", 1, 1, arguments.length);
      Qd("Wilddog.DataSnapshot.hasChild", a);
      var b = new I(a);
      return !this.I.va(b).f()
    };
    U.prototype.hasChild = U.prototype.Sa;
    U.prototype.H = function() {
      F("Wilddog.DataSnapshot.getPriority", 0, 0, arguments.length);
      return this.I.H().R()
    };
    U.prototype.getPriority = U.prototype.H;
    U.prototype.forEach = function(a) {
      F("Wilddog.DataSnapshot.forEach", 1, 1, arguments.length);
      G("Wilddog.DataSnapshot.forEach", 1, a, !1);
      if (this.I.T()) return !1;
      var b = this;
      return !!this.I.Y(this.g, function(c, d) {
        return a(new U(d, b.Z.w(c), R))
      })
    };
    U.prototype.forEach = U.prototype.forEach;
    U.prototype.pd = function() {
      F("Wilddog.DataSnapshot.hasChildren", 0, 0, arguments.length);
      return this.I.T() ? !1 : !this.I.f()
    };
    U.prototype.hasChildren = U.prototype.pd;
    U.prototype.name = function() {
      B("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");
      F("Wilddog.DataSnapshot.name", 0, 0, arguments.length);
      return this.key()
    };
    U.prototype.name = U.prototype.name;
    U.prototype.key = function() {
      F("Wilddog.DataSnapshot.key", 0, 0, arguments.length);
      return this.Z.key()
    };
    U.prototype.key = U.prototype.key;
    U.prototype.Gb = function() {
      F("Wilddog.DataSnapshot.numChildren", 0, 0, arguments.length);
      return this.I.Gb()
    };
    U.prototype.numChildren = U.prototype.Gb;
    U.prototype.qc = function() {
      F("Wilddog.DataSnapshot.ref", 0, 0, arguments.length);
      return this.Z
    };
    U.prototype.ref = U.prototype.qc;

    function Re() {
      Hc.call(this, ["online"]);
      this.Kb = !0;
      if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
        this.Kb = window.navigator ? window.navigator.onLine : !0;
        var a = this;
        window.addEventListener("online", function() {
          a.Kb || (a.Kb = !0, a.$d("online", !0))
        }, !1);
        window.addEventListener("offline", function() {
          a.Kb && (a.Kb = !1, a.$d("online", !1))
        }, !1)
      }
    }
    la(Re, Hc);
    Re.prototype.nd = function(a) {
      z("online" === a, "Unknown event type: " + a);
      return this.Kb
    };
    ba(Re);

    function Se() {
      Hc.call(this, ["visible"]);
      var a, b;
      "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
      this.uc = !0;
      if (b) {
        var c = this;
        document.addEventListener(b,
          function() {
            var b = !document[a];
            b !== c.uc && (c.uc = b, c.$d("visible", b))
          }, !1)
      }
    }
    la(Se, Hc);
    Se.prototype.nd = function(a) {
      z("visible" === a, "Unknown event type: " + a);
      return this.uc
    };
    ba(Se);

    function Te(a) {
      try {
        if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
          var b = window[a];
          b.setItem("wilddog:sentinel", "cache");
          b.removeItem("wilddog:sentinel")
        }
      } catch (c) {}
    }
    Te("localStorage");
    Te("sessionStorage");

    function Ue(a, b, c, d, e, f, g) {
      this.id = a;
      this.u = wc("c:" + this.id + ":");
      this.Za = c;
      this.Ge = null;
      this.Fd = d;
      this.Qc = e;
      this.Da = f;
      this.ug = g;
      this.B = b;
      this.da = 0;
      this.u("Connection created");
      Ve(this)
    }

    function Ve(a) {
      We(a, function(b) {
        a.Pa = b;
        a.Pa.on("open", Xe(a));
        a.Pa.on("error", Ye(a))
      })
    }

    function Xe(a) {
      return function() {
        a.Pa.on("message", Ze(a));
        a.Pa.on("close", $e(a))
      }
    }

    function Ze(a) {
      return function(b) {
        if (null == b) throw Error("data is null");
        if (0 != b.charAt(0))
          if (2 == b.charAt(0)) {
            var c = null;
            try {
              c = JSON.parse(b.substr(1))
            } catch (d) {
              throw d;
            }
            if ("object" != typeof c || 2 > c.length) throw Error("decodedData in wrong format");
            b = c[1];
            "wd" == c[0] ? "c" == b.t ? (c = b.d, "h" == c.t ? af(a, c.d) : "r" == c.t ? (c = c.d, a.u("Reset packet received.  New host: " + c), a.B.Td || (a.Ge = c, b = a.B.ka, b[b.indexOf(a.Za)] = c, bf(a.B, b), a.close())) : "s" == c.t && (a.ug(c.d), a.close())) : "d" == b.t && a.Fd(b.d) : a.u("eventType not known")
          } else 1 !=
            b.charAt(0) && a.u("data format error")
      }
    }

    function $e(a) {
      return function() {
        2 !== a.da && (a.u("Closing realtime connection."), a.da = 2, a.Da && (a.Da(a.Za, a.Ge), a.Da = null))
      }
    }

    function Ye(a) {
      return function() {
        a.close()
      }
    }

    function af(a, b) {
      var c = b.ts,
        d = b.v,
        e = b.h;
      a.sessionId = b.s;
      "1.0" != d && B("Protocol version mismatch detected");
      0 == a.da && (e == a.Za || a.B.Td ? (a.da = 1, a.u("realtime state connected"), cf(a.B, a.Za), a.Qc && (a.Qc(c, a.Za), a.Qc = null)) : (c = a.B.ka.indexOf(a.Za), d = a.B.ka, 0 <= c && (d[c] = e), bf(a.B, d), a.u("updateHost ", d.toString()), a.Pa.close(), a.Za = e, We(a, function(b) {
        a.Pa = b;
        a.Pa.on("open", Xe(a));
        a.Pa.on("error", Ye(a))
      })))
    }

    function We(a, b) {
      var c = ["websocket"],
        d = (a.B.Pb ? "https://" : "http://") + a.Za + "?v=1.0&cv=" + CLIENT_VERSION,
        e = a.B;
      e.host !== e.ka && (d = d + "&ns=" + a.B.ye);
      a.sessionId && (d = d + "&s=" + a.sessionId);
      0 < a.B.rb.length && (d = d + "&fst=" + encodeURIComponent(a.B.rb.join(",")));
      e = Ua.get("UUID");
      e || (e = a.je(), Ua.set("UUID", e));
      var f = {
        path: "/.ws",
        rememberUpgrade: !0
      };
      "undefined" == typeof document && (f.jsonp = !1);
      a.B.mh ? f.transports = ["websocket"] : null != c && (f.transports = c);
      c = cc(d + "&did=" + e, f);
      Ra("new Socket_", typeof c);
      b(c)
    }
    Ue.prototype.lb = function(a) {
      a = "2" + JSON.stringify(["wd", {
        t: "d",
        d: a
      }]);
      Ra("sendRequest by eio", a);
      this.Pa.send(a)
    };
    Ue.prototype.close = function() {
      2 !== this.da && (this.u("Closing realtime connection."), this.da = 2, this.Pa && this.Pa.close(), this.Da && (this.Da(this.Za, this.Ge), this.Da = null))
    };
    Ue.prototype.je = function() {
      for (var a = 0, b = ""; 32 > a;) b += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())], a++;
      return b
    };

    function df(a, b, c, d) {
      this.id = ef++;
      this.u = wc("p:" + this.id + ":");
      this.ad = this.jf = this.ve = !1;
      this.ma = {};
      this.wa = [];
      this.Sc = 0;
      this.Oc = [];
      this.qa = !1;
      this.j = {};
      this.na = 1E3;
      this.Ad = 3E5;
      this.Jb = b;
      this.Nc = c;
      this.Ce = d;
      this.B = a;
      this.Ie = null;
      this.Od = {};
      this.Gg = 0;
      this.Gc = this.bc = null;
      this.$c = 0;
      ff(this, 0);
      Se.ac().Hb("visible", this.zg, this); - 1 === a.host.indexOf("wd.local") && Re.ac().Hb("online", this.wg, this)
    }
    var ef = 0,
      gf = 0;
    h = df.prototype;
    h.lb = function(a, b, c) {
      var d = ++this.Gg;
      a = {
        r: d,
        a: a,
        b: b
      };
      this.u(u(a));
      z(this.qa, "sendRequest call when we're not connected not allowed.");
      this.Ma.lb(a);
      c && (this.Od[d] = c)
    };
    h.kf = function(a, b, c, d) {
      var e = hf(a),
        f = a.path.toString();
      this.u("Listen called for " + f + " " + e);
      this.ma[f] = this.ma[f] || {};
      z(!this.ma[f][e], "listen() called twice for same path/queryId.");
      a = {
        P: d,
        qd: b,
        query: a,
        tag: c
      };
      this.ma[f][e] = a;
      this.qa && jf(this, a)
    };

    function jf(a, b) {
      var c = b.query,
        d = c.path.toString(),
        e = hf(c);
      a.u("Listen on " + d + " for " + e);
      var f = {
        p: d
      };
      b.tag && (f.q = kf(c.D), f.t = b.tag);
      f.h = b.qd();
      a.lb("q", f, function(f) {
        var g = f.d,
          l = f.s,
          m = f.c;
        if (g && "object" === typeof g && pa(g, "w")) {
          var A = t(g, "w");
          ea(A) && 0 <= $a(A, "no_index") && B("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.D.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance")
        }(a.ma[d] && a.ma[d][e]) === b && (a.u("listen response", f), "ok" !== l && lf(a, d,
          e), b.P && b.P(l, g, m))
      })
    }
    h.fe = function(a, b, c) {
      this.Qa = {
        $f: a,
        af: !1,
        yb: b,
        dd: c
      };
      this.u("Authenticating using credential: " + a);
      mf(this);
      40 == a.length && (this.u("Admin auth credential detected.  Reducing max reconnect time."), this.Ad = 3E4)
    };
    h.Ff = function(a) {
      delete this.Qa;
      this.qa && this.lb("unauth", {}, function(b) {
        a(b.s, b.d, b.c || null)
      })
    };

    function mf(a) {
      var b = a.Qa;
      a.qa && b && a.lb("auth", {
        cred: b.$f
      }, function(c) {
        var d = c.s,
          e = c.d || "error";
        c = c.c || null;
        "ok" !== d && a.Qa === b && delete a.Qa;
        b.af ? "ok" !== d && b.dd && b.dd(d, e, c) : (b.af = !0, b.yb && b.yb(d, e))
      })
    }
    h.Gf = function(a, b) {
      var c = a.path.toString(),
        d = hf(a);
      this.u("Unlisten called for " + c + " " + d);
      if (lf(this, c, d) && this.qa) {
        var e = kf(a.D);
        this.u("Unlisten on " + c + " for " + d);
        c = {
          p: c
        };
        b && (c.q = e, c.t = b);
        this.lb("n", c)
      }
    };
    h.Be = function(a, b, c) {
      this.qa ? nf(this, "o", a, b, c) : this.Oc.push({
        Lb: a,
        action: "o",
        data: b,
        P: c
      })
    };
    h.pf = function(a, b, c) {
      this.qa ? nf(this, "om", a, b, c) : this.Oc.push({
        Lb: a,
        action: "om",
        data: b,
        P: c
      })
    };
    h.Ed = function(a, b) {
      this.qa ? nf(this, "oc", a, null, b) : this.Oc.push({
        Lb: a,
        action: "oc",
        data: null,
        P: b
      })
    };

    function nf(a, b, c, d, e) {
      c = {
        p: c,
        d: d
      };
      a.u("onDisconnect " + b, c);
      a.lb(b, c, function(a) {
        e && setTimeout(function() {
          e(a.s, a.d, a.c)
        }, Math.floor(0))
      })
    }
    h.put = function(a, b, c, d) { of (this, "p", a, b, c, d)
    };
    h.mf = function(a, b, c, d) { of (this, "m", a, b, c, d)
    };

    function of (a, b, c, d, e, f) {
      d = {
        p: c,
        d: d
      };
      p(f) && (d.h = f);
      a.wa.push({
        action: b,
        request: d,
        P: e
      });
      a.Sc++;
      b = a.wa.length - 1;
      a.qa ? pf(a, b) : a.u("Buffering put: " + c)
    }

    function pf(a, b) {
      var c = a.wa[b].action,
        d = a.wa[b].request,
        e = a.wa[b].P;
      a.wa[b].Bg = a.qa;
      a.lb(c, d, function(d) {
        a.u(c + " response", d);
        delete a.wa[b];
        a.Sc--;
        0 === a.Sc && (a.wa = []);
        e && e(d.s, d.d, d.c)
      })
    }
    h.Fe = function(a) {
      if (this.qa) {
        a = {
          c: a
        };
        this.u("reportStats", a);
        var b = this;
        this.lb("s", a, function(a) {
          "ok" !== a.s && b.u("reportStats", "Error sending stats: " + a.d, "Code:" + a.c)
        })
      }
    };
    h.tg = function(a) {
      if ("r" in a) {
        this.u("from server: " + u(a));
        var b = a.r,
          c = this.Od[b];
        c && (delete this.Od[b], c(a.b))
      } else {
        if ("error" in a) throw "A server-side error has occurred: " + a.error;
        "a" in a && (b = a.a, c = a.b, this.u("handleServerMessage", b, c), "d" === b ? this.Jb(c.p, c.d, !1, c.t) : "m" === b ? this.Jb(c.p, c.d, !0, c.t) : "c" === b ? qf(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Qa, delete this.Qa, c && c.dd && c.dd(a, b)) : "sd" === b ? this.Ie ? this.Ie(c) : "msg" in c && "undefined" !== typeof console && console.log("WILDDOG: " + c.msg.replace("\n",
          "\nWILDDOG: ")) : xc("Unrecognized action received from server: " + u(b) + "\nAre you using the latest client?"))
      }
    };
    h.Qc = function(a, b) {
      if (!1 === this.qa) {
        this.u("connection ready");
        this.qa = !0;
        this.Ma = this.j[b].za;
        for (var c in this.j) this.j.hasOwnProperty(c) && (clearTimeout(this.j[c].ze), delete this.j[c].ze);
        delete this.j[b];
        this.Gc = (new Date).getTime();
        this.Ce({
          serverTimeOffset: a - (new Date).getTime()
        });
        c = Ua.get("UUID");
        c || (c = this.je(), Ua.set("UUID", c));
        var d = {};
        d["sdk.js." + CLIENT_VERSION.replace(/\./g, "-")] = 1;
        d.did = c;
        "undefined" !== typeof window && (window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent) &&
          (d["framework.cordova"] = 1);
        this.Fe(d);
        rf(this);
        this.Nc(!0)
      } else this.j[b].za.close(), delete this.j[b]
    };

    function ff(a, b, c) {
      z(!a.Ma, "Scheduling a connect when we're already connected/ing?");
      sf(a, function() {
        var a = c || this.B.ka[0];
        this.j[a] = this.j[a] || {
          na: 1E3,
          $c: 0
        };
        this.j[a].ib && clearTimeout(this.j[a].ib);
        var e = this;
        this.j[a].ib = setTimeout(function() {
          e.j[a] && e.j[a].ib && (e.j[a].ib = null, tf(e, a))
        }, Math.floor(b))
      }.bind(a))
    }
    h.zg = function(a) {
      if (a && !this.uc) {
        this.u("Window became visible.  Reducing delay.");
        this.na = 1E3;
        var b = !1,
          c;
        for (c in this.j) this.j.hasOwnProperty(c) && c.za && (b = !0, c.na = 1E3);
        this.Ma || b || this.ad || ff(this, 0)
      }
      this.uc = a
    };
    h.wg = function(a) {
      if (a) {
        this.u("Browser went online.");
        this.na = 1E3;
        a = !1;
        for (var b in this.j) this.j.hasOwnProperty(b) && b.za && (a = !0, b.na = 1E3);
        this.Ma || a || this.ad || (this.bc && clearTimeout(this.bc), ff(this, 0))
      } else
        for (b in this.u("Browser went offline.  Killing connection."), this.Ma && this.Ma.close(), this.j) this.j.hasOwnProperty(b) && b.za && b.za.close()
    };
    h.xg = function(a, b) {
      this.u("data client disconnected");
      if (b) delete this.j[a];
      else if (this.qa && this.Ma.Za != a || -1 == this.B.ka.indexOf(a)) {
        delete this.j[a];
        return
      }
      var c = b || a;
      this.Nc(!1);
      this.qa = !1;
      this.Ma = null;
      this.j[a] && delete this.j[a].za;
      for (var d = 0; d < this.wa.length; d++) {
        var e = this.wa[d];
        e && "h" in e.request && e.Bg && (e.P && e.P("disconnect"), delete this.wa[d], this.Sc--)
      }
      0 === this.Sc && (this.wa = []);
      this.Od = {};
      if (uf(this)) {
        this.j[c] = this.j[c] || {
          na: 1E3,
          $c: 0
        };
        this.j[c].$c++;
        var d = !0,
          f;
        for (f in this.j) this.j.hasOwnProperty(f) &&
          5 > this.j[f].$c && (d = !1);
        e = this.B;
        !fc.Wc && null != c && 0 > e.rb.indexOf(c) && c != e.host && (e.rb.push(c), v.set("failHosts", JSON.stringify(e.rb)));
        if (d && Object.getOwnPropertyNames(this.j).length == this.B.ka.length && !this.B.Td) {
          this.u("error while connecting", c);
          bf(this.B, []);
          for (f in this.j) this.j.hasOwnProperty(f) && this.j[f].ib && clearTimeout(this.j[f].ib);
          this.j = {};
          ff(this, 0)
        } else this.uc ? this.Gc && (3E4 < (new Date).getTime() - this.Gc && (this.j[c].na = 1E3), this.Gc = null) : (this.u("Window isn't visible.  Delaying reconnect."),
          this.j[c].na = this.Ad, this.j[c].wd = (new Date).getTime()), f = Math.max(0, this.j[c].na - ((new Date).getTime() - this.j[c].wd)), f *= Math.random(), this.u("Trying to reconnect in " + f + "ms"), ff(this, f, c), this.j[c].na = Math.min(this.Ad, 1.3 * this.j[c].na)
      }
    };

    function tf(a, b) {
      if (!a.j[b] || !a.j[b].za) {
        a.u("Making a connection attempt");
        a.j[b].wd = (new Date).getTime();
        a.Gc = null;
        var c = r(a.tg, a),
          d = r(a.Qc, a),
          e = r(a.xg, a),
          f = a.id + ":" + gf++;
        a.j[b].za = new Ue(f, a.B, b, c, d, e, function(b) {
          B(b + " (" + a.B.toString() + ")");
          a.jf = !0
        });
        var g = a.B.ka[a.B.ka.indexOf(b) + 1];
        g && (a.j[b].ze = a.j[b].ze || setTimeout(function() {
          uf(a) && !a.Ma && ff(a, 0, g)
        }, 1E4))
      }
    }
    h.Dc = function() {
      this.ve = !0;
      if (this.Ma) this.Ma.close();
      else
        for (var a in this.j) this.j.hasOwnProperty(a) && (a.za ? a.za.close() : a.ib && (clearTimeout(a.ib), a.ib = null))
    };
    h.resume = function() {
      this.ve = !1;
      this.na = 1E3;
      var a = !1,
        b;
      for (b in this.j) this.j.hasOwnProperty(b) && b.za && (a = !0, b.na = 1E3);
      this.Ma || a || ff(this, 0)
    };

    function qf(a, b, c) {
      c = c ? bb(c, function(a) {
        return Cc(a)
      }).join("$") : "default";
      (a = lf(a, b, c)) && a.P && a.P("permission_denied")
    }

    function lf(a, b, c) {
      b = (new I(b)).toString();
      var d;
      p(a.ma[b]) ? (d = a.ma[b][c], delete a.ma[b][c], 0 === ob(a.ma[b]) && delete a.ma[b]) : d = void 0;
      return d
    }

    function rf(a) {
      mf(a);
      w(a.ma, function(b) {
        w(b, function(b) {
          jf(a, b)
        })
      });
      for (var b = 0; b < a.wa.length; b++) a.wa[b] && pf(a, b);
      for (; a.Oc.length;) b = a.Oc.shift(), nf(a, b.action, b.Lb, b.data, b.P)
    }

    function uf(a) {
      var b;
      b = Re.ac().Kb;
      return !a.jf && !a.ve && b
    }
    h.je = function() {
      for (var a = 0, b = ""; 32 > a;) b += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())], a++;
      return b
    };

    function sf(a, b) {
      if (0 != a.B.ka.length && a.B.ka) b(a.B.ka);
      else {
        a.wd = (new Date).getTime();
        var c = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]),
          c = ab(c, function(a) {
            return "function" === typeof a.isAvailable && a.isAvailable()
          });
        if (0 === c.length) setTimeout(function() {
          a.close()
        }, 0);
        else {
          var c = new(c.shift())({
              method: "GET"
            }),
            d = ("undefined" == typeof document ? "http" : "https") + "://ns.wilddog.com/v1/lookup?appId=" + a.B.ye;
          a.ad = !0;
          c.open(d, null, function(c, d) {
            a.ad = !1;
            if (d && (d.errcode || d.message)) throw c = Error(d.message || "Unknown error!"),
              c.code = d.errcode, c;
            if (c || !d.nssList) {
              var e = Math.max(0, a.na - ((new Date).getTime() - a.wd)),
                e = Math.random() * e;
              a.u("Trying to nslookup in " + e + "ms");
              a.bc && (clearTimeout(a.bc), a.bc = null);
              a.bc = setTimeout(function() {
                uf(a) && ff(a, 0)
              }, e);
              a.na = Math.min(a.Ad, 1.3 * a.na)
            } else bf(a.B, d.nssList), b(d.nssList)
          })
        }
      }
    };

    function vf(a, b) {
      this.u = wc("p:rest:");
      this.B = a;
      this.Jb = b;
      this.Qa = null;
      this.ma = {}
    }

    function wf(a, b) {
      if (p(b)) return "tag$" + b;
      var c = a.D;
      z(xf(c) && c.g == R, "should have a tag if it's not a default query.");
      return a.path.toString()
    }
    h = vf.prototype;
    h.kf = function(a, b, c, d) {
      var e = a.path.toString();
      this.u("Listen called for " + e + " " + hf(a));
      var f = wf(a, c),
        g = {};
      this.ma[f] = g;
      a = yf(a.D);
      var k = this;
      zf(this, e + ".json", a, function(a, b) {
        var l = b;
        404 === a && (a = l = null);
        null === a && k.Jb(e, l, !1, c);
        t(k.ma, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null)
      })
    };
    h.Gf = function(a, b) {
      var c = wf(a, b);
      delete this.ma[c]
    };
    h.fe = function(a, b) {
      this.Qa = a;
      var c = bd(a),
        d = c.data,
        c = c.ie && c.ie.exp;
      b && b("ok", {
        auth: d,
        expires: c
      })
    };
    h.Ff = function(a) {
      this.Qa = null;
      a("ok", null)
    };
    h.Be = function() {};
    h.pf = function() {};
    h.Ed = function() {};
    h.put = function() {};
    h.mf = function() {};
    h.Fe = function() {};

    function zf(a, b, c, d) {
      c = c || {};
      c.format = "export";
      a.Qa && (c.auth = a.Qa);
      var e = (a.B.Pb ? "https://" : "http://") + a.B.host + b + "?" + sa(c);
      a.u("Sending REST request for " + e);
      var f = new XMLHttpRequest;
      f.onreadystatechange = function() {
        if (d && 4 === f.readyState) {
          a.u("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
          var b = null;
          if (200 <= f.status && 300 > f.status) {
            try {
              b = Ca(f.responseText)
            } catch (k) {
              B("Failed to parse JSON response for " + e + ": " + f.responseText)
            }
            d(null, b)
          } else 401 !== f.status && 404 !==
            f.status && B("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
          d = null
        }
      };
      f.open("GET", e, !0);
      f.send()
    };

    function Af() {
      this.Qd = Q
    }
    Af.prototype.m = function(a) {
      return this.Qd.va(a)
    };
    Af.prototype.toString = function() {
      return this.Qd.toString()
    };

    function Bf() {
      this.set = {}
    }
    h = Bf.prototype;
    h.add = function(a, b) {
      this.set[a] = null !== b ? b : !0
    };
    h.contains = function(a) {
      return pa(this.set, a)
    };
    h.get = function(a) {
      return this.contains(a) ? this.set[a] : void 0
    };
    h.remove = function(a) {
      delete this.set[a]
    };
    h.clear = function() {
      this.set = {}
    };
    h.f = function() {
      return wb(this.set)
    };
    h.count = function() {
      return ob(this.set)
    };

    function Cf(a, b) {
      w(a.set, function(a, d) {
        b(d, a)
      })
    }
    h.keys = function() {
      var a = [];
      w(this.set, function(b, c) {
        a.push(c)
      });
      return a
    };

    function Df() {
      this.A = this.J = null
    }
    Df.prototype.find = function(a) {
      if (null != this.J) return this.J.va(a);
      if (a.f() || null == this.A) return null;
      var b = K(a);
      a = L(a);
      return this.A.contains(b) ? this.A.get(b).find(a) : null
    };

    function Ef(a, b, c) {
      if (b.f()) a.J = c, a.A = null;
      else if (null !== a.J) a.J = a.J.L(b, c);
      else {
        null == a.A && (a.A = new Bf);
        var d = K(b);
        a.A.contains(d) || a.A.add(d, new Df);
        a = a.A.get(d);
        b = L(b);
        Ef(a, b, c)
      }
    }

    function Ff(a, b) {
      if (b.f()) return a.J = null, a.A = null, !0;
      if (null !== a.J) {
        if (a.J.T()) return !1;
        var c = a.J;
        a.J = null;
        c.Y(R, function(b, c) {
          Ef(a, new I(b), c)
        });
        return Ff(a, b)
      }
      return null !== a.A ? (c = K(b), b = L(b), a.A.contains(c) && Ff(a.A.get(c), b) && a.A.remove(c), a.A.f() ? (a.A = null, !0) : !1) : !0
    }

    function Gf(a, b, c) {
      null !== a.J ? c(b, a.J) : a.Y(function(a, e) {
        var d = new I(b.toString() + "/" + a);
        Gf(e, d, c)
      })
    }
    Df.prototype.Y = function(a) {
      null !== this.A && Cf(this.A, function(b, c) {
        a(b, c)
      })
    };

    function Hf(a, b) {
      this.type = If;
      this.source = Jf;
      this.path = a;
      this.He = b
    }
    Hf.prototype.Rc = function() {
      return this.path.f() ? this : new Hf(L(this.path), this.He)
    };
    Hf.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.He + ")"
    };

    function Kf(a, b, c) {
      this.type = Lf;
      this.source = a;
      this.path = b;
      this.children = c
    }
    Kf.prototype.Rc = function(a) {
      if (this.path.f()) return a = this.children.subtree(new I(a)), a.f() ? null : a.value ? new Mf(this.source, M, a.value) : new Kf(this.source, M, a);
      z(K(this.path) === a, "Can't get a merge for a child not on the path of the operation");
      return new Kf(this.source, L(this.path), this.children)
    };
    Kf.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
    };

    function Mf(a, b, c) {
      this.type = Nf;
      this.source = a;
      this.path = b;
      this.Ta = c
    }
    Mf.prototype.Rc = function(a) {
      return this.path.f() ? new Mf(this.source, M, this.Ta.S(a)) : new Mf(this.source, L(this.path), this.Ta)
    };
    Mf.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ta.toString() + ")"
    };

    function Of(a, b) {
      this.type = Pf;
      this.source = a;
      this.path = b
    }
    Of.prototype.Rc = function() {
      return this.path.f() ? new Of(this.source, M) : new Of(this.source, L(this.path))
    };
    Of.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)"
    };
    var Nf = 0,
      Lf = 1,
      If = 2,
      Pf = 3;

    function Qf(a, b, c, d) {
      this.oe = a;
      this.bf = b;
      this.Nb = c;
      this.Oe = d;
      z(!d || b, "Tagged queries must be from server.")
    }
    var Jf = new Qf(!0, !1, null, !1),
      Rf = new Qf(!1, !0, null, !1);
    Qf.prototype.toString = function() {
      return this.oe ? "user" : this.Oe ? "server(queryID=" + this.Nb + ")" : "server"
    };

    function Sf(a, b) {
      this.value = a;
      this.children = b || Tf
    }
    var Tf = new se(function(a, b) {
      return a === b ? 0 : a < b ? -1 : 1
    });

    function Uf(a) {
      var b = Vf;
      w(a, function(a, d) {
        b = b.set(new I(d), a)
      });
      return b
    }
    h = Sf.prototype;
    h.f = function() {
      return null === this.value && this.children.f()
    };

    function Wf(a, b, c) {
      if (null != a.value && c(a.value)) return {
        path: M,
        value: a.value
      };
      if (b.f()) return null;
      var d = K(b);
      a = a.children.get(d);
      return null !== a ? (b = Wf(a, L(b), c), null != b ? {
        path: (new I(d)).w(b.path),
        value: b.value
      } : null) : null
    }

    function Xf(a, b) {
      return Wf(a, b, function() {
        return !0
      })
    }
    h.subtree = function(a) {
      if (a.f()) return this;
      var b = this.children.get(K(a));
      return null !== b ? b.subtree(L(a)) : Vf
    };
    h.set = function(a, b) {
      if (a.f()) return new Sf(b, this.children);
      var c = K(a),
        d = (this.children.get(c) || Vf).set(L(a), b),
        c = this.children.Ya(c, d);
      return new Sf(this.value, c)
    };
    h.remove = function(a) {
      if (a.f()) return this.children.f() ? Vf : new Sf(null, this.children);
      var b = K(a),
        c = this.children.get(b);
      return c ? (a = c.remove(L(a)), b = a.f() ? this.children.remove(b) : this.children.Ya(b, a), null === this.value && b.f() ? Vf : new Sf(this.value, b)) : this
    };
    h.get = function(a) {
      if (a.f()) return this.value;
      var b = this.children.get(K(a));
      return b ? b.get(L(a)) : null
    };

    function Yf(a, b, c) {
      if (b.f()) return c;
      var d = K(b);
      b = Yf(a.children.get(d) || Vf, L(b), c);
      d = b.f() ? a.children.remove(d) : a.children.Ya(d, b);
      return new Sf(a.value, d)
    }

    function Zf(a, b) {
      return $f(a, M, b)
    }

    function $f(a, b, c) {
      var d = {};
      a.children.ra(function(a, f) {
        d[a] = $f(f, b.w(a), c)
      });
      return c(b, a.value, d)
    }

    function ag(a, b, c) {
      return bg(a, b, M, c)
    }

    function bg(a, b, c, d) {
      var e = a.value ? d(c, a.value) : !1;
      if (e) return e;
      if (b.f()) return null;
      e = K(b);
      return (a = a.children.get(e)) ? bg(a, L(b), c.w(e), d) : null
    }

    function cg(a, b, c) {
      if (!b.f()) {
        var d = !0;
        a.value && (d = c(M, a.value));
        !0 === d && (d = K(b), (a = a.children.get(d)) && dg(a, L(b), M.w(d), c))
      }
    }

    function dg(a, b, c, d) {
      if (b.f()) return a;
      a.value && d(c, a.value);
      var e = K(b);
      return (a = a.children.get(e)) ? dg(a, L(b), c.w(e), d) : Vf
    }

    function eg(a, b) {
      fg(a, M, b)
    }

    function fg(a, b, c) {
      a.children.ra(function(a, e) {
        fg(e, b.w(a), c)
      });
      a.value && c(b, a.value)
    }

    function gg(a, b) {
      a.children.ra(function(a, d) {
        d.value && b(a, d.value)
      })
    }
    var Vf = new Sf(null);
    Sf.prototype.toString = function() {
      var a = {};
      eg(this, function(b, c) {
        a[b.toString()] = c.toString()
      });
      return u(a)
    };

    function hg(a, b, c) {
      this.I = a;
      this.O = b;
      this.Yb = c
    }

    function ig(a, b) {
      return a.O && !a.Yb || a.I.Sa(b)
    }
    hg.prototype.m = function() {
      return this.I
    };

    function jg(a, b) {
      this.K = a;
      this.Rd = b
    }

    function kg(a, b, c, d) {
      return new jg(new hg(b, c, d), a.Rd)
    }

    function lg(a) {
      return a.K.O ? a.K.m() : null
    }
    jg.prototype.F = function() {
      return this.Rd
    };

    function mg(a) {
      return a.Rd.O ? a.Rd.m() : null
    };

    function V(a, b, c, d) {
      this.type = a;
      this.Ua = b;
      this.hb = c;
      this.Ae = d;
      this.Ld = void 0
    };

    function ng(a, b, c, d) {
      this.ke = b;
      this.Sd = c;
      this.Ld = d;
      this.ld = a
    }
    ng.prototype.ec = function() {
      var a = this.Sd.qc();
      return "value" === this.ld ? a.path : a.parent().path
    };
    ng.prototype.qe = function() {
      return this.ld
    };
    ng.prototype.Zb = function() {
      return this.ke.Zb(this)
    };
    ng.prototype.toString = function() {
      return this.ec().toString() + ":" + this.ld + ":" + u(this.Sd.$e())
    };

    function og(a, b, c) {
      this.ke = a;
      this.error = b;
      this.path = c
    }
    og.prototype.ec = function() {
      return this.path
    };
    og.prototype.qe = function() {
      return "cancel"
    };
    og.prototype.Zb = function() {
      return this.ke.Zb(this)
    };
    og.prototype.toString = function() {
      return this.path.toString() + ":cancel"
    };

    function pg(a, b, c) {
      this.Wb = a;
      this.zb = b;
      this.Ab = c || null
    }
    h = pg.prototype;
    h.yf = function(a) {
      return "value" === a
    };
    h.createEvent = function(a, b) {
      var c = b.D.g;
      return new ng("value", this, new U(a.Ua, b.qc(), c))
    };
    h.Zb = function(a) {
      var b = this.Ab;
      if ("cancel" === a.qe()) {
        z(this.zb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.zb;
        return function() {
          c.call(b, a.error)
        }
      }
      var d = this.Wb;
      return function() {
        d.call(b, a.Sd)
      }
    };
    h.Ue = function(a, b) {
      return this.zb ? new og(this, a, b) : null
    };
    h.matches = function(a) {
      return a instanceof pg ? a.Wb && this.Wb ? a.Wb === this.Wb && a.Ab === this.Ab : !0 : !1
    };
    h.ff = function() {
      return null !== this.Wb
    };

    function qg(a, b, c) {
      this.pa = a;
      this.zb = b;
      this.Ab = c
    }
    h = qg.prototype;
    h.yf = function(a) {
      a = "children_added" === a ? "child_added" : a;
      return sb(this.pa, "children_removed" === a ? "child_removed" : a)
    };
    h.Ue = function(a, b) {
      return this.zb ? new og(this, a, b) : null
    };
    h.createEvent = function(a, b) {
      z(null != a.hb, "Child events should have a childName.");
      var c = b.qc().w(a.hb);
      return new ng(a.type, this, new U(a.Ua, c, b.D.g), a.Ld)
    };
    h.Zb = function(a) {
      var b = this.Ab;
      if ("cancel" === a.qe()) {
        z(this.zb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.zb;
        return function() {
          c.call(b, a.error)
        }
      }
      var d = this.pa[a.ld];
      return function() {
        d.call(b, a.Sd, a.Ld)
      }
    };
    h.matches = function(a) {
      if (a instanceof qg) {
        if (!this.pa || !a.pa) return !0;
        if (this.Ab === a.Ab) {
          var b = ob(a.pa);
          if (b === ob(this.pa)) {
            if (1 === b) {
              var b = pb(a.pa),
                c = pb(this.pa);
              return c === b && (!a.pa[b] || !this.pa[c] || a.pa[b] === this.pa[c])
            }
            return nb(this.pa, function(b, c) {
              return a.pa[c] === b
            })
          }
        }
      }
      return !1
    };
    h.ff = function() {
      return null !== this.pa
    };

    function rg(a) {
      this.Z = a;
      this.g = a.D.g
    }

    function sg(a, b, c, d) {
      var e = [],
        f = [];
      ta(b, function(b) {
        "child_changed" === b.type && a.g.td(b.Ae, b.Ua) && f.push(new V("child_moved", b.Ua, b.hb))
      });
      tg(a, e, "child_removed", b, d, c);
      tg(a, e, "child_added", b, d, c);
      tg(a, e, "child_moved", f, d, c);
      tg(a, e, "child_changed", b, d, c);
      tg(a, e, "value", b, d, c);
      return e
    }

    function tg(a, b, c, d, e, f) {
      d = ab(d, function(a) {
        return a.type === c
      });
      hb(d, r(a.Vf, a));
      ta(d, function(c) {
        var d = ug(a, c, f);
        ta(e, function(e) {
          e.yf(c.type) && b.push(e.createEvent(d, a.Z))
        })
      })
    }

    function ug(a, b, c) {
      "value" !== b.type && "child_removed" !== b.type && (b.Ld = c.df(b.hb, b.Ua, a.g));
      return b
    }
    rg.prototype.Vf = function(a, b) {
      if (null == a.hb || null == b.hb) throw qc("Should only compare child_ events.");
      return this.g.compare(new O(a.hb, a.Ua), new O(b.hb, b.Ua))
    };

    function vg() {}
    vg.prototype.cf = function() {
      return null
    };
    vg.prototype.pe = function() {
      return null
    };
    var wg = new vg;

    function xg(a, b, c) {
      this.Hf = a;
      this.Va = b;
      this.Hd = c
    }
    xg.prototype.cf = function(a) {
      var b = this.Va.K;
      if (ig(b, a)) return b.m().S(a);
      b = null != this.Hd ? new hg(this.Hd, !0, !1) : this.Va.F();
      return this.Hf.gb(a, b)
    };
    xg.prototype.pe = function(a, b, c) {
      var d = null != this.Hd ? this.Hd : mg(this.Va);
      a = this.Hf.he(d, b, 1, c, a);
      return 0 === a.length ? null : a[0]
    };

    function yg(a, b) {
      this.be = a;
      this.Tf = b
    }

    function zg(a) {
      this.N = a
    }
    zg.prototype.mb = function(a, b, c, d) {
      var e = new Ag,
        f;
      if (b.type === Nf) b.source.oe ? c = Bg(this, a, b.path, b.Ta, c, d, e) : (z(b.source.bf, "Unknown source."), f = b.source.Oe, c = Cg(this, a, b.path, b.Ta, c, d, f, e));
      else if (b.type === Lf) b.source.oe ? c = Dg(this, a, b.path, b.children, c, d, e) : (z(b.source.bf, "Unknown source."), f = b.source.Oe, c = Eg(this, a, b.path, b.children, c, d, f, e));
      else if (b.type === If)
        if (b.He)
          if (f = b.path, null != c.sc(f)) c = a;
          else {
            b = new xg(c, a, d);
            d = a.K.m();
            if (f.f() || ".priority" === K(f)) a.F().O ? b = c.Ca(mg(a)) : (b = a.F().m(), z(b instanceof T, "serverChildren would be complete if leaf node"), b = c.yc(b)), b = this.N.Ba(d, b, e);
            else {
              f = K(f);
              var g = c.gb(f, a.F());
              null == g && ig(a.F(), f) && (g = d.S(f));
              b = null != g ? this.N.L(d, f, g, b, e) : a.K.m().Sa(f) ? this.N.L(d, f, Q, b, e) : d;
              b.f() && a.F().O && (d = c.Ca(mg(a)), d.T() && (b = this.N.Ba(b, d, e)))
            }
            d = a.F().O || null != c.sc(M);
            c = kg(a, b, d, this.N.Ra())
          }
      else c = Fg(this, a, b.path, c, d, e);
      else if (b.type === Pf) d = b.path, b = a.F(), f = b.m(), g = b.O || d.f(), c = Gg(this, new jg(a.K, new hg(f, g, b.Yb)), d, c, wg, e);
      else throw qc("Unknown operation type: " + b.type);
      e = qb(e.qb);
      d = c;
      b = d.K;
      b.O && (f = b.m().T() || b.m().f(), g = lg(a), (0 < e.length || !a.K.O || f && !b.m().fa(g) || !b.m().H().fa(g.H())) && e.push(new V("value", lg(d))));
      return new yg(c, e)
    };

    function Gg(a, b, c, d, e, f) {
      var g = b.K;
      if (null != d.sc(c)) return b;
      var k;
      if (c.f()) z(b.F().O, "If change path is empty, we must have complete server data"), b.F().Yb ? (e = mg(b), d = d.yc(e instanceof T ? e : Q)) : d = d.Ca(mg(b)), f = a.N.Ba(b.K.m(), d, f);
      else {
        var l = K(c);
        if (".priority" == l) z(1 == zd(c), "Can't have a priority with additional path components"), f = g.m(), k = b.F().m(), d = d.cd(c, f, k), f = null != d ? a.N.ia(f, d) : g.m();
        else {
          var m = L(c);
          ig(g, l) ? (k = b.F().m(), d = d.cd(c, g.m(), k), d = null != d ? g.m().S(l).L(m, d) : g.m().S(l)) : d = d.gb(l, b.F());
          f = null != d ? a.N.L(g.m(), l, d, e, f) : g.m()
        }
      }
      return kg(b, f, g.O || c.f(), a.N.Ra())
    }

    function Cg(a, b, c, d, e, f, g, k) {
      var l = b.F();
      g = g ? a.N : a.N.$b();
      if (c.f()) d = g.Ba(l.m(), d, null);
      else if (g.Ra() && !l.Yb) d = l.m().L(c, d), d = g.Ba(l.m(), d, null);
      else {
        var m = K(c);
        if ((c.f() ? !l.O || l.Yb : !ig(l, K(c))) && 1 < zd(c)) return b;
        d = l.m().S(m).L(L(c), d);
        d = ".priority" == m ? g.ia(l.m(), d) : g.L(l.m(), m, d, wg, null)
      }
      l = l.O || c.f();
      b = new jg(b.K, new hg(d, l, g.Ra()));
      return Gg(a, b, c, e, new xg(e, b, f), k)
    }

    function Bg(a, b, c, d, e, f, g) {
      var k = b.K;
      e = new xg(e, b, f);
      if (c.f()) g = a.N.Ba(b.K.m(), d, g), a = kg(b, g, !0, a.N.Ra());
      else if (f = K(c), ".priority" === f) g = a.N.ia(b.K.m(), d), a = kg(b, g, k.O, k.Yb);
      else {
        var l = L(c);
        c = k.m().S(f);
        if (!l.f()) {
          var m = e.cf(f);
          d = null != m ? ".priority" === Ad(l) && m.va(l.parent()).f() ? m : m.L(l, d) : Q
        }
        c.fa(d) ? a = b : (g = a.N.L(k.m(), f, d, e, g), a = kg(b, g, k.O, a.N.Ra()))
      }
      return a
    }

    function Dg(a, b, c, d, e, f, g) {
      var k = b;
      eg(d, function(d, m) {
        var l = c.w(d);
        ig(b.K, K(l)) && (k = Bg(a, k, l, m, e, f, g))
      });
      eg(d, function(d, m) {
        var l = c.w(d);
        ig(b.K, K(l)) || (k = Bg(a, k, l, m, e, f, g))
      });
      return k
    }

    function Hg(a, b) {
      eg(b, function(b, d) {
        a = a.L(b, d)
      });
      return a
    }

    function Eg(a, b, c, d, e, f, g, k) {
      if (b.F().m().f() && !b.F().O) return b;
      var l = b;
      c = c.f() ? d : Yf(Vf, c, d);
      var m = b.F().m();
      c.children.ra(function(c, d) {
        if (m.Sa(c)) {
          var A = b.F().m().S(c),
            A = Hg(A, d);
          l = Cg(a, l, new I(c), A, e, f, g, k)
        }
      });
      c.children.ra(function(c, d) {
        var A = !b.F().O && null == d.value;
        m.Sa(c) || A || (A = b.F().m().S(c), A = Hg(A, d), l = Cg(a, l, new I(c), A, e, f, g, k))
      });
      return l
    }

    function Fg(a, b, c, d, e, f) {
      if (null != d.sc(c)) return b;
      var g = new xg(d, b, e),
        k = e = b.K.m();
      if (b.F().O) {
        if (c.f()) e = d.Ca(mg(b)), k = a.N.Ba(b.K.m(), e, f);
        else if (".priority" === K(c)) {
          var l = d.gb(K(c), b.F());
          null == l || e.f() || e.H().fa(l) || (k = a.N.ia(e, l))
        } else l = K(c), e = d.gb(l, b.F()), null != e && (k = a.N.L(b.K.m(), l, e, g, f));
        e = !0
      } else if (b.K.O || c.f()) k = e, e = b.K.m(), e.T() || e.Y(R, function(c) {
        var e = d.gb(c, b.F());
        null != e && (k = a.N.L(k, c, e, g, f))
      }), e = b.K.O;
      else {
        l = K(c);
        if (1 == zd(c) || ig(b.K, l)) c = d.gb(l, b.F()), null != c && (k = a.N.L(e, l, c, g,
          f));
        e = !1
      }
      return kg(b, k, e, a.N.Ra())
    };

    function Ig(a, b) {
      this.Z = a;
      var c = a.D,
        d = new Jg(c.g),
        c = xf(c) ? new Jg(c.g) : c.sa ? new Kg(c) : new Lg(c);
      this.uf = new zg(c);
      var e = b.F(),
        f = b.K,
        g = d.Ba(Q, e.m(), null),
        k = c.Ba(Q, f.m(), null);
      this.Va = new jg(new hg(k, f.O, c.Ra()), new hg(g, e.O, d.Ra()));
      this.jb = [];
      this.bg = new rg(a)
    }
    h = Ig.prototype;
    h.F = function() {
      return this.Va.F().m()
    };
    h.sb = function(a) {
      var b = mg(this.Va);
      return b && (xf(this.Z.D) || !a.f() && !b.S(K(a)).f()) ? b.va(a) : null
    };
    h.f = function() {
      return 0 === this.jb.length
    };
    h.Tb = function(a) {
      this.jb.push(a)
    };
    h.ub = function(a, b) {
      var c = [];
      if (b) {
        z(null == a, "A cancel should cancel all event registrations.");
        var d = this.Z.path;
        ta(this.jb, function(a) {
          (a = a.Ue(b, d)) && c.push(a)
        })
      }
      if (a) {
        for (var e = [], f = 0; f < this.jb.length; ++f) {
          var g = this.jb[f];
          if (!g.matches(a)) e.push(g);
          else if (a.ff()) {
            e = e.concat(this.jb.slice(f + 1));
            break
          }
        }
        this.jb = e
      } else this.jb = [];
      return c
    };
    h.mb = function(a, b, c) {
      a.type === Lf && null !== a.source.Nb && (z(mg(this.Va), "We should always have a full cache before handling merges"), z(lg(this.Va), "Missing event cache, even though we have a server cache"));
      var d = this.Va;
      a = this.uf.mb(d, a, b, c);
      b = this.uf;
      c = a.be;
      z(c.K.m().Fc(b.N.g), "Event snap not indexed");
      z(c.F().m().Fc(b.N.g), "Server snap not indexed");
      z(a.be.F().O || !d.F().O, "Once a server snap is complete, it should never go back");
      this.Va = a.be;
      return Mg(this, a.Tf, a.be.K.m(), null)
    };

    function Ng(a, b) {
      var c = a.Va.K,
        d = [];
      c.m().T() || c.m().Y(R, function(a, b) {
        d.push(new V("child_added", b, a))
      });
      c.O && d.push(new V("value", c.m()));
      return Mg(a, d, c.m(), b)
    }

    function Mg(a, b, c, d) {
      return sg(a.bg, b, c, d ? [d] : a.jb)
    };

    function Og() {
      this.Ga = {}
    }
    h = Og.prototype;
    h.f = function() {
      return wb(this.Ga)
    };
    h.mb = function(a, b, c) {
      var d = a.source.Nb;
      if (null !== d) return d = t(this.Ga, d), z(null != d, "SyncTree gave us an op for an invalid query."), d.mb(a, b, c);
      var e = [];
      w(this.Ga, function(d) {
        e = e.concat(d.mb(a, b, c))
      });
      return e
    };
    h.Tb = function(a, b, c, d, e) {
      var f = hf(a),
        g = t(this.Ga, f);
      g || ((g = c.Ca(e ? d : null)) ? c = !0 : (g = d instanceof T ? c.yc(d) : Q, c = !1), g = new Ig(a, new jg(new hg(g, c, !1), new hg(d, e, !1))), this.Ga[f] = g);
      g.Tb(b);
      return Ng(g, b)
    };
    h.ub = function(a, b, c) {
      var d = hf(a),
        e = [],
        f = [],
        g = null != Pg(this);
      if ("default" === d) {
        var k = this;
        w(this.Ga, function(a, d) {
          f = f.concat(a.ub(b, c));
          a.f() && (delete k.Ga[d], xf(a.Z.D) || e.push(a.Z))
        })
      } else {
        var l = t(this.Ga, d);
        l && (f = f.concat(l.ub(b, c)), l.f() && (delete this.Ga[d], xf(l.Z.D) || e.push(l.Z)))
      }
      g && null == Pg(this) && e.push(new W(a.G.M, a.G, a.path));
      return {
        Fg: e,
        cg: f
      }
    };

    function Qg(a) {
      return ab(qb(a.Ga), function(a) {
        return !xf(a.Z.D)
      })
    }
    h.sb = function(a) {
      var b = null;
      w(this.Ga, function(c) {
        b = b || c.sb(a)
      });
      return b
    };

    function Rg(a, b) {
      if (xf(b.D)) return Pg(a);
      var c = hf(b);
      return t(a.Ga, c)
    }

    function Pg(a) {
      return vb(a.Ga, function(a) {
        return xf(a.Z.D)
      }) || null
    };

    function Sg(a) {
      this.aa = a
    }
    var Tg = new Sg(new Sf(null));

    function Ug(a, b, c) {
      if (b.f()) return new Sg(new Sf(c));
      var d = Xf(a.aa, b);
      if (null != d) {
        var e = d.path,
          d = d.value;
        b = J(e, b);
        d = d.L(b, c);
        return new Sg(a.aa.set(e, d))
      }
      a = Yf(a.aa, b, new Sf(c));
      return new Sg(a)
    }

    function Vg(a, b, c) {
      var d = a;
      qa(c, function(a, c) {
        d = Ug(d, b.w(a), c)
      });
      return d
    }
    Sg.prototype.Md = function(a) {
      if (a.f()) return Tg;
      a = Yf(this.aa, a, Vf);
      return new Sg(a)
    };

    function Wg(a, b) {
      var c = Xf(a.aa, b);
      return null != c ? a.aa.get(c.path).va(J(c.path, b)) : null
    }

    function Xg(a) {
      var b = [],
        c = a.aa.value;
      null != c ? c.T() || c.Y(R, function(a, c) {
        b.push(new O(a, c))
      }) : a.aa.children.ra(function(a, c) {
        null != c.value && b.push(new O(a, c.value))
      });
      return b
    }

    function Yg(a, b) {
      if (b.f()) return a;
      var c = Wg(a, b);
      return null != c ? new Sg(new Sf(c)) : new Sg(a.aa.subtree(b))
    }
    Sg.prototype.f = function() {
      return this.aa.f()
    };
    Sg.prototype.apply = function(a) {
      return Zg(M, this.aa, a)
    };

    function Zg(a, b, c) {
      if (null != b.value) return c.L(a, b.value);
      var d = null;
      b.children.ra(function(b, f) {
        ".priority" === b ? (z(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Zg(a.w(b), f, c)
      });
      c.va(a).f() || null === d || (c = c.L(a.w(".priority"), d));
      return c
    };

    function $g() {
      this.X = Tg;
      this.Ia = [];
      this.Hc = -1
    }
    h = $g.prototype;
    h.Md = function(a) {
      var b = fb(this.Ia, function(b) {
        return b.de === a
      });
      z(0 <= b, "removeWrite called with nonexistent writeId.");
      var c = this.Ia[b];
      this.Ia.splice(b, 1);
      for (var d = c.visible, e = !1, f = this.Ia.length - 1; d && 0 <= f;) {
        var g = this.Ia[f];
        g.visible && (f >= b && ah(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
        f--
      }
      if (d) {
        if (e) this.X = bh(this.Ia, ch, M), this.Hc = 0 < this.Ia.length ? this.Ia[this.Ia.length - 1].de : -1;
        else if (c.Ta) this.X = this.X.Md(c.path);
        else {
          var k = this;
          w(c.children, function(a, b) {
            k.X = k.X.Md(c.path.w(b))
          })
        }
        return c.path
      }
      return null
    };
    h.Ca = function(a, b, c, d) {
      if (c || d) {
        var e = Yg(this.X, a);
        return !d && e.f() ? b : d || null != b || null != Wg(e, M) ? (e = bh(this.Ia, function(b) {
          return (b.visible || d) && (!c || !(0 <= $a(c, b.de))) && (b.path.contains(a) || a.contains(b.path))
        }, a), b = b || Q, e.apply(b)) : null
      }
      e = Wg(this.X, a);
      if (null != e) return e;
      e = Yg(this.X, a);
      return e.f() ? b : null != b || null != Wg(e, M) ? (b = b || Q, e.apply(b)) : null
    };
    h.yc = function(a, b) {
      var c = Q,
        d = Wg(this.X, a);
      if (d) d.T() || d.Y(R, function(a, b) {
        c = c.V(a, b)
      });
      else if (b) {
        var e = Yg(this.X, a);
        b.Y(R, function(a, b) {
          var d = Yg(e, new I(a)).apply(b);
          c = c.V(a, d)
        });
        ta(Xg(e), function(a) {
          c = c.V(a.name, a.node)
        })
      } else e = Yg(this.X, a), ta(Xg(e), function(a) {
        c = c.V(a.name, a.node)
      });
      return c
    };
    h.cd = function(a, b, c, d) {
      z(c || d, "Either existingEventSnap or existingServerSnap must exist");
      a = a.w(b);
      if (null != Wg(this.X, a)) return null;
      a = Yg(this.X, a);
      return a.f() ? d.va(b) : a.apply(d.va(b))
    };
    h.gb = function(a, b, c) {
      a = a.w(b);
      var d = Wg(this.X, a);
      return null != d ? d : ig(c, b) ? Yg(this.X, a).apply(c.m().S(b)) : null
    };
    h.sc = function(a) {
      return Wg(this.X, a)
    };
    h.he = function(a, b, c, d, e, f) {
      var g;
      a = Yg(this.X, a);
      g = Wg(a, M);
      if (null == g)
        if (null != b) g = a.apply(b);
        else return [];
      g = g.wb(f);
      if (g.f() || g.T()) return [];
      b = [];
      a = $d(f);
      e = e ? g.fc(c, f) : g.dc(c, f);
      for (f = S(e); f && b.length < d;) 0 !== a(f, c) && b.push(f), f = S(e);
      return b
    };

    function ah(a, b) {
      return a.Ta ? a.path.contains(b) : !!ub(a.children, function(c, d) {
        return a.path.w(d).contains(b)
      })
    }

    function ch(a) {
      return a.visible
    }

    function bh(a, b, c) {
      for (var d = Tg, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (b(f)) {
          var g = f.path;
          if (f.Ta) c.contains(g) ? (g = J(c, g), d = Ug(d, g, f.Ta)) : g.contains(c) && (g = J(g, c), d = Ug(d, M, f.Ta.va(g)));
          else if (f.children)
            if (c.contains(g)) g = J(c, g), d = Vg(d, g, f.children);
            else {
              if (g.contains(c))
                if (g = J(g, c), g.f()) d = Vg(d, M, f.children);
                else if (f = t(f.children, K(g))) f = f.va(L(g)), d = Ug(d, M, f)
            }
          else throw qc("WriteRecord should have .snap or .children");
        }
      }
      return d
    }

    function dh(a, b) {
      this.Rb = a;
      this.aa = b
    }
    h = dh.prototype;
    h.Ca = function(a, b, c) {
      return this.aa.Ca(this.Rb, a, b, c)
    };
    h.yc = function(a) {
      return this.aa.yc(this.Rb, a)
    };
    h.cd = function(a, b, c) {
      return this.aa.cd(this.Rb, a, b, c)
    };
    h.sc = function(a) {
      return this.aa.sc(this.Rb.w(a))
    };
    h.he = function(a, b, c, d, e) {
      return this.aa.he(this.Rb, a, b, c, d, e)
    };
    h.gb = function(a, b) {
      return this.aa.gb(this.Rb, a, b)
    };
    h.w = function(a) {
      return new dh(this.Rb.w(a), this.aa)
    };

    function eh(a) {
      this.Aa = Vf;
      this.Mb = new $g;
      this.Ne = {};
      this.pc = {};
      this.Ic = a
    }

    function fh(a, b, c, d, e) {
      var f = a.Mb,
        g = e;
      z(d > f.Hc, "Stacking an older write on top of newer ones");
      p(g) || (g = !0);
      f.Ia.push({
        path: b,
        Ta: c,
        de: d,
        visible: g
      });
      g && (f.X = Ug(f.X, b, c));
      f.Hc = d;
      return e ? gh(a, new Mf(Jf, b, c)) : []
    }

    function hh(a, b, c, d) {
      var e = a.Mb;
      z(d > e.Hc, "Stacking an older merge on top of newer ones");
      e.Ia.push({
        path: b,
        children: c,
        de: d,
        visible: !0
      });
      e.X = Vg(e.X, b, c);
      e.Hc = d;
      c = Uf(c);
      return gh(a, new Kf(Jf, b, c))
    }

    function ih(a, b, c) {
      c = c || !1;
      b = a.Mb.Md(b);
      return null == b ? [] : gh(a, new Hf(b, c))
    }

    function jh(a, b, c) {
      c = Uf(c);
      return gh(a, new Kf(Rf, b, c))
    }

    function kh(a, b, c, d) {
      d = lh(a, d);
      if (null != d) {
        var e = mh(d);
        d = e.path;
        e = e.Nb;
        b = J(d, b);
        c = new Mf(new Qf(!1, !0, e, !0), b, c);
        return nh(a, d, c)
      }
      return []
    }

    function oh(a, b, c, d) {
      if (d = lh(a, d)) {
        var e = mh(d);
        d = e.path;
        e = e.Nb;
        b = J(d, b);
        c = Uf(c);
        c = new Kf(new Qf(!1, !0, e, !0), b, c);
        return nh(a, d, c)
      }
      return []
    }
    eh.prototype.Tb = function(a, b) {
      var c = a.path,
        d = null,
        e = !1;
      cg(this.Aa, c, function(a, b) {
        var f = J(a, c);
        d = b.sb(f);
        e = e || null != Pg(b);
        return !d
      });
      var f = this.Aa.get(c);
      f ? (e = e || null != Pg(f), d = d || f.sb(M)) : (f = new Og, this.Aa = this.Aa.set(c, f));
      var g;
      null != d ? g = !0 : (g = !1, d = Q, gg(this.Aa.subtree(c), function(a, b) {
        var c = b.sb(M);
        c && (d = d.V(a, c))
      }));
      var k = null != Rg(f, a);
      if (!k && !xf(a.D)) {
        var l = ph(a);
        z(!sb(this.pc, l), "View does not exist, but we have a tag");
        var m = qh++;
        this.pc[l] = m;
        this.Ne["_" + m] = l
      }
      g = f.Tb(a, b, new dh(c, this.Mb), d,
        g);
      k || e || (f = Rg(f, a), g = g.concat(rh(this, a, f)));
      return g
    };
    eh.prototype.ub = function(a, b, c) {
      var d = a.path,
        e = this.Aa.get(d),
        f = [];
      if (e && ("default" === hf(a) || null != Rg(e, a))) {
        f = e.ub(a, b, c);
        e.f() && (this.Aa = this.Aa.remove(d));
        e = f.Fg;
        f = f.cg;
        b = -1 !== fb(e, function(a) {
          return xf(a.D)
        });
        var g = ag(this.Aa, d, function(a, b) {
          return null != Pg(b)
        });
        if (b && !g && (d = this.Aa.subtree(d), !d.f()))
          for (var d = sh(d), k = 0; k < d.length; ++k) {
            var l = d[k],
              m = l.Z,
              l = th(this, l);
            this.Ic.Je(m, uh(this, m), l.qd, l.P)
          }
        if (!g && 0 < e.length && !c)
          if (b) this.Ic.Wd(a, null);
          else {
            var A = this;
            ta(e, function(a) {
              hf(a);
              var b = A.pc[ph(a)];
              A.Ic.Wd(a, b)
            })
          }
        vh(this, e)
      }
      return f
    };
    eh.prototype.Ca = function(a, b) {
      var c = this.Mb,
        d = ag(this.Aa, a, function(b, c) {
          var d = J(b, a);
          if (d = c.sb(d)) return d
        });
      return c.Ca(a, d, b, !0)
    };

    function sh(a) {
      return Zf(a, function(a, c, d) {
        if (c && null != Pg(c)) return [Pg(c)];
        var b = [];
        c && (b = Qg(c));
        w(d, function(a) {
          b = b.concat(a)
        });
        return b
      })
    }

    function vh(a, b) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        if (!xf(d.D)) {
          var d = ph(d),
            e = a.pc[d];
          delete a.pc[d];
          delete a.Ne["_" + e]
        }
      }
    }

    function rh(a, b, c) {
      var d = b.path,
        e = uh(a, b);
      c = th(a, c);
      b = a.Ic.Je(b, e, c.qd, c.P);
      d = a.Aa.subtree(d);
      if (e) z(null == Pg(d.value), "If we're adding a query, it shouldn't be shadowed");
      else
        for (e = Zf(d, function(a, b, c) {
            if (!a.f() && b && null != Pg(b)) return [Pg(b).Z];
            var d = [];
            b && (d = d.concat(bb(Qg(b), function(a) {
              return a.Z
            })));
            w(c, function(a) {
              d = d.concat(a)
            });
            return d
          }), d = 0; d < e.length; ++d) c = e[d], a.Ic.Wd(c, uh(a, c));
      return b
    }

    function th(a, b) {
      var c = b.Z,
        d = uh(a, c);
      return {
        qd: function() {
          return (b.F() || Q).hash()
        },
        P: function(b, f, g) {
          if ("ok" === b) return d ? (f = c.path, (g = lh(a, d)) ? (b = mh(g), g = b.path, b = b.Nb, f = J(g, f), f = new Of(new Qf(!1, !0, b, !0), f), g = nh(a, g, f)) : g = []) : g = gh(a, new Of(Rf, c.path)), g;
          b = (b || "error").toUpperCase();
          f && (b += ": " + f);
          f = Error(b);
          f.code = g;
          B(f.message);
          return a.ub(c, null, f)
        }
      }
    }

    function ph(a) {
      return a.path.toString() + "$" + hf(a)
    }

    function mh(a) {
      var b = a.indexOf("$");
      z(-1 !== b && b < a.length - 1, "Bad queryKey.");
      return {
        Nb: a.substr(b + 1),
        path: new I(a.substr(0, b))
      }
    }

    function lh(a, b) {
      var c = a.Ne,
        d = "_" + b;
      return null !== c && d in c ? c[d] : void 0
    }

    function uh(a, b) {
      var c = ph(b);
      return t(a.pc, c)
    }
    var qh = 1;

    function nh(a, b, c) {
      var d = a.Aa.get(b);
      z(d, "Missing sync point for query tag that we're tracking");
      return d.mb(c, new dh(b, a.Mb), null)
    }

    function gh(a, b) {
      return wh(a, b, a.Aa, null, new dh(M, a.Mb))
    }

    function wh(a, b, c, d, e) {
      if (b.path.f()) return xh(a, b, c, d, e);
      var f = c.get(M);
      null == d && null != f && (d = f.sb(M));
      var g = [],
        k = K(b.path),
        l = b.Rc(k);
      if ((c = c.children.get(k)) && l) var m = d ? d.S(k) : null,
        k = e.w(k),
        g = g.concat(wh(a, l, c, m, k));
      f && (g = g.concat(f.mb(b, e, d)));
      return g
    }

    function xh(a, b, c, d, e) {
      var f = c.get(M);
      null == d && null != f && (d = f.sb(M));
      var g = [];
      c.children.ra(function(c, f) {
        var k = d ? d.S(c) : null,
          l = e.w(c),
          H = b.Rc(c);
        H && (g = g.concat(xh(a, H, f, k, l)))
      });
      f && (g = g.concat(f.mb(b, e, d)));
      return g
    };

    function yh() {
      this.Ac = {}
    }
    yh.prototype.get = function() {
      return xb(this.Ac)
    };

    function zh(a) {
      this.Uf = a;
      this.xd = null
    }
    zh.prototype.get = function() {
      var a = this.Uf.get(),
        b = xb(a);
      if (this.xd)
        for (var c in this.xd) b[c] -= this.xd[c];
      this.xd = a;
      return b
    };

    function Ah(a, b) {
      this.Df = {};
      this.Ud = new zh(a);
      this.oa = b;
      var c = 1E4 + 2E4 * Math.random();
      setTimeout(r(this.xf, this), Math.floor(c))
    }
    Ah.prototype.xf = function() {
      var a = this.Ud.get(),
        b = {},
        c = !1,
        d;
      for (d in a) 0 < a[d] && pa(this.Df, d) && (b[d] = a[d], c = !0);
      c && this.oa.Fe(b);
      setTimeout(r(this.xf, this), Math.floor(6E5 * Math.random()))
    };
    var Bh = {},
      Ch = {};

    function Dh(a) {
      a = a.toString();
      Bh[a] || (Bh[a] = new yh);
      return Bh[a]
    }

    function Eh(a, b) {
      var c = a.toString();
      Ch[c] || (Ch[c] = b());
      return Ch[c]
    };

    function Fh(a, b) {
      return a && "object" === typeof a ? (z(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a
    }

    function Gh(a, b) {
      var c = new Df;
      Gf(a, new I(""), function(a, e) {
        Ef(c, a, Hh(e, b))
      });
      return c
    }

    function Hh(a, b) {
      var c = a.H().R(),
        c = Fh(c, b),
        d;
      if (a.T()) {
        var e = Fh(a.La(), b);
        return e !== a.La() || c !== a.H().R() ? new de(e, P(c)) : a
      }
      d = a;
      c !== a.H().R() && (d = d.ia(new de(c)));
      a.Y(R, function(a, c) {
        var e = Hh(c, b);
        e !== c && (d = d.V(a, e))
      });
      return d
    };

    function Ih() {
      this.children = {};
      this.ed = 0;
      this.value = null
    }

    function Jh(a, b, c) {
      this.Bd = a ? a : "";
      this.Ea = b ? b : null;
      this.I = c ? c : new Ih
    }

    function Kh(a, b) {
      for (var c = b instanceof I ? b : new I(b), d = a, e; null !== (e = K(c));) var f = t(d.I.children, e) || new Ih,
        d = new Jh(e, d, f),
        c = L(c);
      return d
    }
    h = Jh.prototype;
    h.La = function() {
      return this.I.value
    };

    function Lh(a, b) {
      z("undefined" !== typeof b, "Cannot set value to undefined");
      a.I.value = b;
      Mh(a)
    }
    h.clear = function() {
      this.I.value = null;
      this.I.children = {};
      this.I.ed = 0;
      Mh(this)
    };
    h.pd = function() {
      return 0 < this.I.ed
    };
    h.f = function() {
      return null === this.La() && !this.pd()
    };
    h.Y = function(a) {
      var b = this;
      w(this.I.children, function(c, d) {
        a(new Jh(d, b, c))
      })
    };

    function Nh(a, b, c, d) {
      c && !d && b(a);
      a.Y(function(a) {
        Nh(a, b, !0, d)
      });
      c && d && b(a)
    }

    function Oh(a, b) {
      for (var c = a.parent(); null !== c && !b(c);) c = c.parent()
    }
    h.path = function() {
      return new I(null === this.Ea ? this.Bd : this.Ea.path() + "/" + this.Bd)
    };
    h.name = function() {
      return this.Bd
    };
    h.parent = function() {
      return this.Ea
    };

    function Mh(a) {
      if (null !== a.Ea) {
        var b = a.Ea,
          c = a.Bd,
          d = a.f(),
          e = pa(b.I.children, c);
        d && e ? (delete b.I.children[c], b.I.ed--, Mh(b)) : d || e || (b.I.children[c] = a.I, b.I.ed++, Mh(b))
      }
    };

    function Ph() {
      this.Bb = []
    }

    function Qh(a, b) {
      for (var c = null, d = 0; d < b.length; d++) {
        var e = b[d],
          f = e.ec();
        null === c || f.fa(c.ec()) || (a.Bb.push(c), c = null);
        null === c && (c = new Rh(f));
        c.add(e)
      }
      c && a.Bb.push(c)
    }

    function Sh(a, b, c) {
      Qh(a, c);
      Th(a, function(a) {
        return a.fa(b)
      })
    }

    function Uh(a, b, c) {
      Qh(a, c);
      Th(a, function(a) {
        return a.contains(b) || b.contains(a)
      })
    }

    function Th(a, b) {
      for (var c = !0, d = 0; d < a.Bb.length; d++) {
        var e = a.Bb[d];
        if (e)
          if (e = e.ec(), b(e)) {
            for (var e = a.Bb[d], f = 0; f < e.md.length; f++) {
              var g = e.md[f];
              if (null !== g) {
                e.md[f] = null;
                var k = g.Zb();
                uc && Ra("event: " + g.toString());
                Gc(k)
              }
            }
            a.Bb[d] = null
          } else c = !1
      }
      c && (a.Bb = [])
    }

    function Rh(a) {
      this.xa = a;
      this.md = []
    }
    Rh.prototype.add = function(a) {
      this.md.push(a)
    };
    Rh.prototype.ec = function() {
      return this.xa
    };

    function Vh(a, b, c) {
      this.B = b;
      this.M = a;
      this.Vd = Dh(b);
      this.ja = new Ph;
      this.Cd = 1;
      this.oa = this.kb = null;
      c || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.oa = new vf(this.B, r(this.Jb, this)), setTimeout(r(this.Nc, this, !0), 0)) : this.oa = this.kb = new df(this.B, r(this.Jb, this), r(this.Nc, this), r(this.Ce, this));
      this.Yg = Eh(b, r(function() {
        return new Ah(this.Vd, this.oa)
      }, this));
      this.tc =
        new Jh;
      this.te = new Af;
      var d = this;
      this.vd = new eh({
        Je: function(a, b, c, k) {
          b = [];
          c = d.te.m(a.path);
          c.f() || (b = gh(d.vd, new Mf(Rf, a.path, c)), setTimeout(function() {
            k("ok")
          }, 0));
          return b
        },
        Wd: aa
      });
      this.Ef = function(a) {
        a && a.signIn ? d.oa.fe(a.idToken, function(b, c) {
          d.fb(b, c, a)
        }, function(a, b) {
          Wh(d, a, b)
        }) : d.oa.Ff(function(a, b) {
          Wh(d, a, b)
        })
      };
      this.M.bind(this.M.Ha.Na, this.Ef);
      Xh(this, "connected", !1);
      this.Da = new Df;
      this.kd = 0;
      this.ue = null;
      this.U = new eh({
        Je: function(a, b, c, k) {
          d.oa.kf(a, c, b, function(b, c, e) {
            b = k(b, c, e);
            Uh(d.ja,
              a.path, b)
          });
          return []
        },
        Wd: function(a, b) {
          d.oa.Gf(a, b)
        }
      })
    }
    h = Vh.prototype;
    h.fb = function() {
      this.Ib(!0)
    };

    function Wh(a, b, c) {
      a.Ib(!1);
      "expired_token" == b && a.M.emit(a.M.Ha.bd, {
        status: b,
        reason: c
      })
    }
    h.toString = function() {
      return (this.B.Pb ? "https://" : "http://") + this.B.host
    };
    h.name = function() {
      return this.B.ye
    };

    function Yh(a) {
      a = a.te.m(new I(".info/serverTimeOffset")).R() || 0;
      return (new Date).getTime() + a
    }

    function Zh(a) {
      a = a = {
        timestamp: Yh(a)
      };
      a.timestamp = a.timestamp || (new Date).getTime();
      return a
    }
    h.Jb = function(a, b, c, d) {
      this.kd++;
      var e = new I(a);
      b = this.ue ? this.ue(a, b) : b;
      a = [];
      d ? c ? (b = mb(b, function(a) {
        return P(a)
      }), a = oh(this.U, e, b, d)) : (b = P(b), a = kh(this.U, e, b, d)) : c ? (d = mb(b, function(a) {
        return P(a)
      }), a = jh(this.U, e, d)) : (d = P(b), a = gh(this.U, new Mf(Rf, e, d)));
      d = e;
      0 < a.length && (d = $h(this, e));
      Uh(this.ja, d, a)
    };
    h.Nc = function(a) {
      Xh(this, "connected", a);
      !1 === a && ai(this)
    };
    h.Ce = function(a) {
      var b = this;
      Dc(a, function(a, d) {
        Xh(b, d, a)
      })
    };
    h.Ib = function(a) {
      Xh(this, "authenticated", a)
    };

    function Xh(a, b, c) {
      b = new I("/.info/" + b);
      c = P(c);
      var d = a.te;
      d.Qd = d.Qd.L(b, c);
      c = gh(a.vd, new Mf(Rf, b, c));
      Uh(a.ja, b, c)
    }
    h.vb = function(a, b, c, d) {
      this.u("set", {
        path: a.toString(),
        value: b,
        uh: c
      });
      var e = Zh(this);
      b = P(b, c);
      var e = Hh(b, e),
        f = this.Cd++,
        e = fh(this.U, a, e, f, !0);
      Qh(this.ja, e);
      var g = this;
      this.oa.put(a.toString(), b.R(!0), function(b, c, e) {
        var k = "ok" === b;
        k || B("set at " + a + " failed: " + b);
        k = ih(g.U, f, !k);
        Uh(g.ja, a, k);
        bi(d, b, c, e)
      });
      e = ci(this, a);
      $h(this, e);
      Uh(this.ja, e, [])
    };
    h.update = function(a, b, c) {
      this.u("update", {
        path: a.toString(),
        value: b
      });
      var d = !0,
        e = Zh(this),
        f = {};
      w(b, function(a, b) {
        d = !1;
        var c = P(a);
        f[b] = Hh(c, e)
      });
      if (d) Ra("update() called with empty data.  Don't do anything."), bi(c, "ok");
      else {
        var g = this.Cd++,
          k = hh(this.U, a, f, g);
        Qh(this.ja, k);
        var l = this;
        this.oa.mf(a.toString(), b, function(b, d, e) {
          var f = "ok" === b;
          f || B("update at " + a + " failed: " + b);
          var f = ih(l.U, g, !f),
            k = a;
          0 < f.length && (k = $h(l, a));
          Uh(l.ja, k, f);
          bi(c, b, d, e)
        });
        b = ci(this, a);
        $h(this, b);
        Uh(this.ja, a, [])
      }
    };

    function ai(a) {
      a.u("onDisconnectEvents");
      var b = Zh(a),
        c = [];
      Gf(Gh(a.Da, b), M, function(b, e) {
        c = c.concat(gh(a.U, new Mf(Rf, b, e)));
        var d = ci(a, b);
        $h(a, d)
      });
      a.Da = new Df;
      Uh(a.ja, M, c)
    }
    h.Ed = function(a, b) {
      var c = this;
      this.oa.Ed(a.toString(), function(d, e, f) {
        "ok" === d && Ff(c.Da, a);
        bi(b, d, e, f)
      })
    };

    function di(a, b, c, d) {
      var e = P(c);
      a.oa.Be(b.toString(), e.R(!0), function(c, g, k) {
        "ok" === c && Ef(a.Da, b, e);
        bi(d, c, g, k)
      })
    }

    function ei(a, b, c, d, e) {
      var f = P(c, d);
      a.oa.Be(b.toString(), f.R(!0), function(c, d, l) {
        "ok" === c && Ef(a.Da, b, f);
        bi(e, c, d, l)
      })
    }

    function fi(a, b, c, d) {
      var e = !0,
        f;
      for (f in c) e = !1;
      e ? (Ra("onDisconnect().update() called with empty data.  Don't do anything."), bi(d, "ok")) : a.oa.pf(b.toString(), c, function(e, f, l) {
        if ("ok" === e)
          for (var g in c)
            if (c.hasOwnProperty(g)) {
              var k = P(c[g]);
              Ef(a.Da, b.w(g), k)
            }
        bi(d, e, f, l)
      })
    }

    function gi(a, b, c) {
      c = ".info" === K(b.path) ? a.vd.Tb(b, c) : a.U.Tb(b, c);
      Sh(a.ja, b.path, c)
    }
    h.Dc = function() {
      this.kb && this.kb.Dc()
    };
    h.resume = function() {
      this.kb && this.kb.resume()
    };
    h.Ke = function(a) {
      if ("undefined" !== typeof console) {
        a ? (this.Ud || (this.Ud = new zh(this.Vd)), a = this.Ud.get()) : a = this.Vd.get();
        var b = cb(rb(a), function(a, b) {
            return Math.max(b.length, a)
          }, 0),
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            for (var d = a[c], e = c.length; e < b + 2; e++) c += " ";
            console.log(c + d)
          }
      }
    };
    h.Le = function(a) {
      var b = this.Vd,
        c;
      p(c) || (c = 1);
      pa(b.Ac, a) || (b.Ac[a] = 0);
      b.Ac[a] += c;
      this.Yg.Df[a] = !0
    };
    h.u = function(a) {
      var b = "";
      this.kb && (b = this.kb.id + ":");
      Ra(b, arguments)
    };

    function bi(a, b, c, d) {
      a && Gc(function() {
        if ("ok" == b) a(null);
        else {
          var e = (b || "error").toUpperCase();
          c && (e += ": " + (c || "Unknown error"));
          e = Error(e);
          e.code = d || 29999;
          a(e)
        }
      })
    };

    function hi(a, b, c, d, e) {
      this.host = a.toLowerCase();
      this.domain = this.host.substr(this.host.indexOf(".") + 1);
      this.Pb = b;
      this.ye = c;
      this.mh = d;
      this.Jd = e || "";
      fc.Wc ? (this.Td = !0, this.ka = [fc.Wc]) : (this.ka = (a = Ua.get("host:" + a)) && a.split(",ts:")[1] >= Date.now() - 6E5 ? a.split(",ts:")[0].split(",") : [], this.Td = !1);
      this.rb = JSON.parse(v.get("failHosts")) || []
    }
    hi.prototype.hf = function() {
      return "wilddogio.com" !== this.domain && "wilddogio-demo.com" !== this.domain
    };

    function bf(a, b) {
      fc.Wc || (null == b || 0 == b.length ? (a.ka = [], Ua.remove("host:" + a.host)) : (a.ka = b, Ua.set("host:" + a.host, a.ka.toString() + ",ts:" + Date.now())))
    }
    hi.prototype.toString = function() {
      var a = (this.Pb ? "https://" : "http://") + this.host;
      this.Jd && (a += "<" + this.Jd + ">");
      return a
    };

    function cf(a, b) {
      if (!fc.Wc) {
        var c = a.rb.indexOf(b);
        0 <= c && (a.rb.splice(c, 1), v.set("failHosts", JSON.stringify(a.rb)))
      }
    };

    function ii(a, b, c, d, e) {
      function f() {}
      a.u("transaction on " + b);
      var g = new W(a.M, a, b);
      g.Hb("value", f);
      c = {
        path: b,
        update: c,
        P: d,
        status: null,
        order: pc(),
        Se: e,
        Af: 0,
        ae: function() {
          g.mc("value", f)
        },
        ee: null,
        Ja: null,
        gd: null,
        hd: null,
        jd: null
      };
      d = a.U.Ca(b, void 0) || Q;
      c.gd = d;
      d = c.update(d.R());
      if (p(d)) {
        Kd("transaction failed: Data returned ", d, c.path);
        c.status = 1;
        e = Kh(a.tc, b);
        var k = e.La() || [];
        k.push(c);
        Lh(e, k);
        "object" === typeof d && null !== d && pa(d, ".priority") ? (k = t(d, ".priority"), z(Id(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
          k = (a.U.Ca(b) || Q).H().R();
        e = Zh(a);
        d = P(d, k);
        e = Hh(d, e);
        c.hd = d;
        c.jd = e;
        c.Ja = a.Cd++;
        c = fh(a.U, b, e, c.Ja, c.Se);
        Uh(a.ja, b, c);
        ji(a)
      } else c.ae(), c.hd = null, c.jd = null, c.P && (a = new U(c.gd, new W(a.M, a, c.path), R), c.P(null, !1, a))
    }

    function ji(a, b) {
      var c = b || a.tc;
      b || ki(a, c);
      if (null !== c.La()) {
        var d = li(a, c);
        z(0 < d.length, "Sending zero length transaction queue");
        db(d, function(a) {
          return 1 === a.status
        }) && mi(a, c.path(), d)
      } else c.pd() && c.Y(function(b) {
        ji(a, b)
      })
    }

    function mi(a, b, c) {
      for (var d = bb(c, function(a) {
          return a.Ja
        }), e = a.U.Ca(b, d) || Q, d = e, e = e.hash(), f = 0; f < c.length; f++) {
        var g = c[f];
        z(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
        g.status = 2;
        g.Af++;
        var k = J(b, g.path),
          d = d.L(k, g.hd)
      }
      var d = d.R(!0),
        l = a.M;
      a.oa.put(b.toString(), d, function(d) {
        a.u("transaction put response", {
          path: b.toString(),
          status: d
        });
        var e = [];
        if ("ok" === d) {
          d = [];
          for (f = 0; f < c.length; f++) {
            c[f].status = 3;
            e = e.concat(ih(a.U, c[f].Ja));
            if (c[f].P) {
              var g = c[f].jd,
                k = new W(l, a, c[f].path);
              d.push(r(c[f].P, null, null, !0, new U(g, k, R)))
            }
            c[f].ae()
          }
          ki(a, Kh(a.tc, b));
          ji(a);
          Uh(a.ja, b, e);
          for (f = 0; f < d.length; f++) Gc(d[f])
        } else {
          if ("datastale" === d)
            for (f = 0; f < c.length; f++) c[f].status = 4 === c[f].status ? 5 : 1;
          else
            for (B("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++) c[f].status = 5, c[f].ee = d;
          $h(a, b)
        }
      }, e)
    }

    function $h(a, b) {
      var c = ni(a, b),
        d = c.path(),
        c = li(a, c);
      oi(a, c, d);
      return d
    }

    function oi(a, b, c) {
      if (0 !== b.length) {
        for (var d = [], e = [], f = bb(b, function(a) {
            return a.Ja
          }), g = 0; g < b.length; g++) {
          var k = b[g],
            l = J(c, k.path),
            m = !1,
            A;
          z(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
          if (5 === k.status) m = !0, A = k.ee, e = e.concat(ih(a.U, k.Ja, !0));
          else if (1 === k.status)
            if (25 <= k.Af) m = !0, A = "maxretry", e = e.concat(ih(a.U, k.Ja, !0));
            else {
              var H = a.U.Ca(k.path, f) || Q;
              k.gd = H;
              var ca = b[g].update(H.R());
              p(ca) ? (Kd("transaction failed: Data returned ", ca, k.path), l = P(ca), "object" === typeof ca &&
                null != ca && pa(ca, ".priority") || (l = l.ia(H.H())), H = k.Ja, ca = Zh(a), ca = Hh(l, ca), k.hd = l, k.jd = ca, k.Ja = a.Cd++, gb(f, H), e = e.concat(fh(a.U, k.path, ca, k.Ja, k.Se)), e = e.concat(ih(a.U, H, !0))) : (m = !0, A = "nodata", e = e.concat(ih(a.U, k.Ja, !0)))
            }
          Uh(a.ja, c, e);
          e = [];
          m && (b[g].status = 3, setTimeout(b[g].ae, Math.floor(0)), b[g].P && ("nodata" === A ? (k = new W(a.M, a, b[g].path), d.push(r(b[g].P, null, null, !1, new U(b[g].gd, k, R)))) : ("maxretry" == A ? (k = Error("maxretries: The transaction had too many retries!"), k.code = 26203) : "set" == A ? (k = Error("overriddenbyset: The transaction was overridden by a subsequent set!"),
            k.code = 26204) : (k = Error("user_code_exception: User code called from the SyncReference runloop threw an exception!"), k.code = 26202), d.push(r(b[g].P, null, k, !1, null)))))
        }
        ki(a, a.tc);
        for (g = 0; g < d.length; g++) Gc(d[g]);
        ji(a)
      }
    }

    function ni(a, b) {
      for (var c, d = a.tc; null !== (c = K(b)) && null === d.La();) d = Kh(d, c), b = L(b);
      return d
    }

    function li(a, b) {
      var c = [];
      pi(a, b, c);
      c.sort(function(a, b) {
        return a.order - b.order
      });
      return c
    }

    function pi(a, b, c) {
      var d = b.La();
      if (null !== d)
        for (var e = 0; e < d.length; e++) c.push(d[e]);
      b.Y(function(b) {
        pi(a, b, c)
      })
    }

    function ki(a, b) {
      var c = b.La();
      if (c) {
        for (var d = 0, e = 0; e < c.length; e++) 3 !== c[e].status && (c[d] = c[e], d++);
        c.length = d;
        Lh(b, 0 < c.length ? c : null)
      }
      b.Y(function(b) {
        ki(a, b)
      })
    }

    function ci(a, b) {
      var c = ni(a, b).path(),
        d = Kh(a.tc, b);
      Oh(d, function(b) {
        qi(a, b)
      });
      qi(a, d);
      Nh(d, function(b) {
        qi(a, b)
      });
      return c
    }

    function qi(a, b) {
      var c = b.La();
      if (null !== c) {
        for (var d = [], e = [], f = -1, g = 0; g < c.length; g++)
          if (4 !== c[g].status)
            if (2 === c[g].status) z(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].ee = "set";
            else if (z(1 === c[g].status, "Unexpected transaction status in abort"), c[g].ae(), e = e.concat(ih(a.U, c[g].Ja, !0)), c[g].P) {
          var k = Error("overriddenbyset: The transaction was overridden by a subsequent set!");
          k.code = 26204;
          d.push(r(c[g].P, null, k, !1, null))
        } - 1 === f ? Lh(b, null) : c.length = f + 1;
        Uh(a.ja,
          b.path(), e);
        for (g = 0; g < d.length; g++) Gc(d[g])
      }
    };

    function ri() {
      this.bb = {};
      this.kh = !1
    }
    ba(ri);
    ri.prototype.Dc = function(a) {
      for (var b in this.bb[a.name]) this.bb[a.name].hasOwnProperty(b) && this.bb[a.name][b].Dc()
    };
    ri.prototype.resume = function(a) {
      for (var b in this.bb[a.name]) this.bb[a.name].hasOwnProperty(b) && this.bb[a.name][b].resume()
    };

    function si(a) {
      var b = this;
      this.pb = a;
      this.Yd = "*";
      Na() ? this.Lc = this.sd = Ga() : (this.Lc = window.opener, this.sd = window);
      if (!b.Lc) throw "Unable to find relay frame";
      Ha(this.sd, "message", r(this.Fd, this));
      Ha(this.sd, "message", r(this.nf, this));
      try {
        ti(this, {
          a: "ready"
        })
      } catch (c) {
        Ha(this.Lc, "load", function() {
          ti(b, {
            a: "ready"
          })
        })
      }
      Ha(window, "unload", r(this.yg, this))
    }

    function ti(a, b) {
      b = u(b);
      Na() ? a.Lc.doPost(b, a.Yd) : a.Lc.postMessage(b, a.Yd)
    }
    si.prototype.Fd = function(a) {
      var b = this,
        c;
      try {
        c = Ca(a.data)
      } catch (d) {}
      c && "request" === c.a && (Ia(window, this.Fd), this.Yd = a.origin, this.pb && setTimeout(function() {
        b.pb(b.Yd, c.d, function(a, c) {
          b.Qf = !c;
          b.pb = void 0;
          ti(b, {
            a: "response",
            d: a,
            forceKeepWindowOpen: c
          })
        })
      }, 0))
    };
    si.prototype.yg = function() {
      try {
        Ia(this.sd, this.nf)
      } catch (a) {}
      this.pb && (ti(this, {
        a: "error",
        d: "unknown closed window"
      }), this.pb = void 0);
      try {
        window.close()
      } catch (a) {}
    };
    si.prototype.nf = function(a) {
      if (this.Qf && "die" === a.data) try {
        window.close()
      } catch (b) {}
    };

    function X(a) {
      this.$g = a
    }
    X.prototype.jg = function() {
      return this.$g.G.Ef
    };
    X.prototype.getAuthTokenListener = X.prototype.jg;
    X.prototype.gg = function() {
      ma.za.nh.fg();
      ma.za.If.sh()
    };
    X.prototype.forceLongPolling = X.prototype.gg;
    X.prototype.hg = function() {
      ma.za.If.fg()
    };
    X.prototype.forceWebSockets = X.prototype.hg;
    X.prototype.Og = function(a, b) {
      a.G.kb.Ie = b
    };
    X.prototype.setSecurityDebugCallback = X.prototype.Og;
    X.prototype.Ke = function(a, b) {
      a.G.Ke(b)
    };
    X.prototype.stats = X.prototype.Ke;
    X.prototype.Le = function(a, b) {
      a.G.Le(b)
    };
    X.prototype.statsIncrementCounter = X.prototype.Le;
    X.prototype.kd = function(a) {
      return a.G.kd
    };
    X.prototype.dataUpdateCount = X.prototype.kd;
    X.prototype.og = function(a, b) {
      a.G.ue = b
    };
    X.prototype.interceptServerData = X.prototype.og;
    X.prototype.vg = function(a) {
      new si(a)
    };
    X.prototype.onLoginPopupOpen = X.prototype.vg;
    X.prototype.Mg = function(a) {
      Fa = a
    };
    X.prototype.setAuthenticationServer = X.prototype.Mg;

    function Y(a, b) {
      this.Tc = a;
      this.xa = b
    }
    Y.prototype.cancel = function(a) {
      F("Wilddog.onDisconnect().cancel", 0, 1, arguments.length);
      G("Wilddog.onDisconnect().cancel", 1, a, !0);
      var b = new x;
      this.Tc.Ed(this.xa, y(b, a));
      return b.o
    };
    Y.prototype.cancel = Y.prototype.cancel;
    Y.prototype.cancel = Y.prototype.cancel;
    Y.prototype.remove = function(a) {
      F("Wilddog.onDisconnect().remove", 0, 1, arguments.length);
      Sd("Wilddog.onDisconnect().remove", this.xa);
      G("Wilddog.onDisconnect().remove", 1, a, !0);
      var b = new x;
      di(this.Tc, this.xa, null, y(b, a));
      return b.o
    };
    Y.prototype.remove = Y.prototype.remove;
    Y.prototype.remove = Y.prototype.remove;
    Y.prototype.set = function(a, b) {
      F("Wilddog.onDisconnect().set", 1, 2, arguments.length);
      Sd("Wilddog.onDisconnect().set", this.xa);
      Jd("Wilddog.onDisconnect().set", a, this.xa, !1);
      G("Wilddog.onDisconnect().set", 2, b, !0);
      var c = new x;
      di(this.Tc, this.xa, a, y(c, b));
      return c.o
    };
    Y.prototype.set = Y.prototype.set;
    Y.prototype.set = Y.prototype.set;
    Y.prototype.vb = function(a, b, c) {
      F("Wilddog.onDisconnect().setWithPriority", 2, 3, arguments.length);
      Sd("Wilddog.onDisconnect().setWithPriority", this.xa);
      Jd("Wilddog.onDisconnect().setWithPriority", a, this.xa, !1);
      Nd("Wilddog.onDisconnect().setWithPriority", 2, b);
      G("Wilddog.onDisconnect().setWithPriority", 3, c, !0);
      var d = new x;
      ei(this.Tc, this.xa, a, b, y(d, c));
      return d.o
    };
    Y.prototype.setWithPriority = Y.prototype.vb;
    Y.prototype.setWithPriority = Y.prototype.vb;
    Y.prototype.update = function(a, b) {
      F("Wilddog.onDisconnect().update", 1, 2, arguments.length);
      Sd("Wilddog.onDisconnect().update", this.xa);
      if (ea(a)) {
        for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
        a = c;
        B("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
      }
      Md("Wilddog.onDisconnect().update", a, this.xa);
      G("Wilddog.onDisconnect().update", 2, b, !0);
      c = new x;
      fi(this.Tc, this.xa, a, y(c, b));
      return c.o
    };
    Y.prototype.update = Y.prototype.update;
    Y.prototype.update = Y.prototype.update;

    function Jg(a) {
      this.g = a
    }
    h = Jg.prototype;
    h.L = function(a, b, c, d, e) {
      z(a.Fc(this.g), "A node must be indexed if only a child is updated");
      d = a.S(b);
      if (d.fa(c)) return a;
      null != e && (c.f() ? a.Sa(b) ? ui(e, new V("child_removed", d, b)) : z(a.T(), "A child remove without an old child only makes sense on a leaf node") : d.f() ? ui(e, new V("child_added", c, b)) : ui(e, new V("child_changed", c, b, d)));
      return a.T() && c.f() ? a : a.V(b, c).wb(this.g)
    };
    h.Ba = function(a, b, c) {
      null != c && (a.T() || a.Y(R, function(a, e) {
        b.Sa(a) || ui(c, new V("child_removed", e, a))
      }), b.T() || b.Y(R, function(b, e) {
        if (a.Sa(b)) {
          var d = a.S(b);
          d.fa(e) || ui(c, new V("child_changed", e, b, d))
        } else ui(c, new V("child_added", e, b))
      }));
      return b.wb(this.g)
    };
    h.ia = function(a, b) {
      return a.f() ? Q : a.ia(b)
    };
    h.Ra = function() {
      return !1
    };
    h.$b = function() {
      return this
    };

    function Lg(a) {
      this.se = new Jg(a.g);
      this.g = a.g;
      var b;
      a.ta ? (b = vi(a), b = a.g.Jc(wi(a), b)) : b = Me;
      this.Vc = b;
      a.ua ? (b = xi(a), a = a.g.Jc(yi(a), b)) : a = a.g.Kc();
      this.Cc = a
    }
    h = Lg.prototype;
    h.matches = function(a) {
      return 0 >= this.g.compare(this.Vc, a) && 0 >= this.g.compare(a, this.Cc)
    };
    h.L = function(a, b, c, d, e) {
      this.matches(new O(b, c)) || (c = Q);
      return this.se.L(a, b, c, d, e)
    };
    h.Ba = function(a, b, c) {
      b.T() && (b = Q);
      var d = b.wb(this.g),
        d = d.ia(Q),
        e = this;
      b.Y(R, function(a, b) {
        e.matches(new O(a, b)) || (d = d.V(a, Q))
      });
      return this.se.Ba(a, d, c)
    };
    h.ia = function(a) {
      return a
    };
    h.Ra = function() {
      return !0
    };
    h.$b = function() {
      return this.se
    };

    function Kg(a) {
      this.ya = new Lg(a);
      this.g = a.g;
      z(a.sa, "Only valid if limit has been set");
      this.ga = a.ga;
      this.Ob = !zi(a)
    }
    h = Kg.prototype;
    h.L = function(a, b, c, d, e) {
      this.ya.matches(new O(b, c)) || (c = Q);
      return a.S(b).fa(c) ? a : a.Gb() < this.ga ? this.ya.$b().L(a, b, c, d, e) : Ai(this, a, b, c, d, e)
    };
    h.Ba = function(a, b, c) {
      var d;
      if (b.T() || b.f()) d = Q.wb(this.g);
      else if (2 * this.ga < b.Gb() && b.Fc(this.g)) {
        d = Q.wb(this.g);
        b = this.Ob ? b.fc(this.ya.Cc, this.g) : b.dc(this.ya.Vc, this.g);
        for (var e = 0; 0 < b.$a.length && e < this.ga;) {
          var f = S(b),
            g;
          if (g = this.Ob ? 0 >= this.g.compare(this.ya.Vc, f) : 0 >= this.g.compare(f, this.ya.Cc)) d = d.V(f.name, f.node), e++;
          else break
        }
      } else {
        d = b.wb(this.g);
        d = d.ia(Q);
        var k, l, m;
        if (this.Ob) {
          b = d.ef(this.g);
          k = this.ya.Cc;
          l = this.ya.Vc;
          var A = $d(this.g);
          m = function(a, b) {
            return A(b, a)
          }
        } else b = d.cc(this.g), k = this.ya.Vc,
          l = this.ya.Cc, m = $d(this.g);
        for (var e = 0, H = !1; 0 < b.$a.length;) f = S(b), !H && 0 >= m(k, f) && (H = !0), (g = H && e < this.ga && 0 >= m(f, l)) ? e++ : d = d.V(f.name, Q)
      }
      return this.ya.$b().Ba(a, d, c)
    };
    h.ia = function(a) {
      return a
    };
    h.Ra = function() {
      return !0
    };
    h.$b = function() {
      return this.ya.$b()
    };

    function Ai(a, b, c, d, e, f) {
      var g;
      if (a.Ob) {
        var k = $d(a.g);
        g = function(a, b) {
          return k(b, a)
        }
      } else g = $d(a.g);
      z(b.Gb() == a.ga, "");
      var l = new O(c, d),
        m = a.Ob ? Ke(b, a.g) : Le(b, a.g),
        A = a.ya.matches(l);
      if (b.Sa(c)) {
        var H = b.S(c),
          m = e.pe(a.g, m, a.Ob);
        null != m && m.name == c && (m = e.pe(a.g, m, a.Ob));
        e = null == m ? 1 : g(m, l);
        if (A && !d.f() && 0 <= e) return null != f && ui(f, new V("child_changed", d, c, H)), b.V(c, d);
        null != f && ui(f, new V("child_removed", H, c));
        b = b.V(c, Q);
        return null != m && a.ya.matches(m) ? (null != f && ui(f, new V("child_added", m.node, m.name)), b.V(m.name,
          m.node)) : b
      }
      return d.f() ? b : A && 0 <= g(m, l) ? (null != f && (ui(f, new V("child_removed", m.node, m.name)), ui(f, new V("child_added", d, c))), b.V(c, d).V(m.name, Q)) : b
    };

    function Ag() {
      this.qb = {}
    }

    function ui(a, b) {
      var c = b.type,
        d = b.hb;
      z("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
      z(".priority" !== d, "Only non-priority child changes can be tracked.");
      var e = t(a.qb, d);
      if (e) {
        var f = e.type;
        if ("child_added" == c && "child_removed" == f) a.qb[d] = new V("child_changed", b.Ua, d, e.Ua);
        else if ("child_removed" == c && "child_added" == f) delete a.qb[d];
        else if ("child_removed" == c && "child_changed" == f) a.qb[d] = new V("child_removed", e.Ae, d);
        else if ("child_changed" == c &&
          "child_added" == f) a.qb[d] = new V("child_added", b.Ua, d);
        else if ("child_changed" == c && "child_changed" == f) a.qb[d] = new V("child_changed", b.Ua, d, e.Ae);
        else throw qc("Illegal combination of changes: " + b + " occurred after " + e);
      } else a.qb[d] = b
    };

    function Bi() {
      this.Xb = this.ua = this.Qb = this.ta = this.sa = !1;
      this.ga = 0;
      this.Sb = "";
      this.kc = null;
      this.Eb = "";
      this.hc = null;
      this.Cb = "";
      this.g = R
    }
    var Ci = new Bi;

    function zi(a) {
      return "" === a.Sb ? a.ta : "l" === a.Sb
    }

    function wi(a) {
      z(a.ta, "Only valid if start has been set");
      return a.kc
    }

    function vi(a) {
      z(a.ta, "Only valid if start has been set");
      return a.Qb ? a.Eb : "[MIN_NAME]"
    }

    function yi(a) {
      z(a.ua, "Only valid if end has been set");
      return a.hc
    }

    function xi(a) {
      z(a.ua, "Only valid if end has been set");
      return a.Xb ? a.Cb : "[MAX_NAME]"
    }

    function Di(a) {
      var b = new Bi;
      b.sa = a.sa;
      b.ga = a.ga;
      b.ta = a.ta;
      b.kc = a.kc;
      b.Qb = a.Qb;
      b.Eb = a.Eb;
      b.ua = a.ua;
      b.hc = a.hc;
      b.Xb = a.Xb;
      b.Cb = a.Cb;
      b.g = a.g;
      return b
    }
    h = Bi.prototype;
    h.xe = function(a) {
      var b = Di(this);
      b.sa = !0;
      b.ga = a;
      b.Sb = "";
      return b
    };
    h.yd = function(a) {
      var b = Di(this);
      b.sa = !0;
      b.ga = a;
      b.Sb = "l";
      return b
    };
    h.zd = function(a) {
      var b = Di(this);
      b.sa = !0;
      b.ga = a;
      b.Sb = "r";
      return b
    };
    h.Uc = function(a, b) {
      var c = Di(this);
      c.ta = !0;
      p(a) || (a = null);
      c.kc = a;
      null != b ? (c.Qb = !0, c.Eb = b) : (c.Qb = !1, c.Eb = "");
      return c
    };
    h.Bc = function(a, b) {
      var c = Di(this);
      c.ua = !0;
      p(a) || (a = null);
      c.hc = a;
      p(b) ? (c.Xb = !0, c.Cb = b) : (c.wh = !1, c.Cb = "");
      return c
    };

    function Ei(a, b) {
      var c = Di(a);
      c.g = b;
      return c
    }

    function kf(a) {
      var b = {};
      a.ta && (b.sp = a.kc, a.Qb && (b.sn = a.Eb));
      a.ua && (b.ep = a.hc, a.Xb && (b.en = a.Cb));
      if (a.sa) {
        b.l = a.ga;
        var c = a.Sb;
        "" === c && (c = zi(a) ? "l" : "r");
        b.vf = c
      }
      a.g !== R && (b.i = a.g.toString());
      return b
    }

    function xf(a) {
      return !(a.ta || a.ua || a.sa)
    }

    function yf(a) {
      var b = {};
      if (xf(a) && a.g == R) return b;
      var c;
      a.g === R ? c = "$priority" : a.g === ie ? c = "$value" : a.g === fe ? c = "$key" : (z(a.g instanceof ae, "Unrecognized index type!"), c = a.g.toString());
      b.orderBy = u(c);
      a.ta && (b.startAt = u(a.kc), a.Qb && (b.startAt += "," + u(a.Eb)));
      a.ua && (b.endAt = u(a.hc), a.Xb && (b.endAt += "," + u(a.Cb)));
      a.sa && (zi(a) ? b.limitToFirst = a.ga : b.limitToLast = a.ga);
      return b
    }
    h.toString = function() {
      return u(kf(this))
    };

    function Z(a, b, c, d) {
      this.G = a;
      this.path = b;
      this.D = c;
      this.oc = d
    }

    function Fi(a) {
      var b = null,
        c = null;
      a.ta && (b = wi(a));
      a.ua && (c = yi(a));
      if (a.g === fe) {
        if (a.ta) {
          if ("[MIN_NAME]" != vi(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !== typeof b) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
        if (a.ua) {
          if ("[MAX_NAME]" != xi(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !==
            typeof c) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
      } else if (a.g === R) {
        if (null != b && !Id(b) || null != c && !Id(c)) throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
      } else if (z(a.g instanceof ae || a.g === ie, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c) throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }

    function Gi(a) {
      if (a.ta && a.ua && a.sa && (!a.sa || "" === a.Sb)) throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }

    function Hi(a, b) {
      if (!0 === a.oc) throw Error(b + ": You can't combine multiple orderBy calls.");
    }
    Z.prototype.qc = function(a) {
      F("Query.ref", 0, 1, arguments.length);
      a && Rd("Query.ref", a);
      return new W(this.app, this.G, a ? this.path.w(a) : this.path)
    };
    Z.prototype.ref = Z.prototype.qc;
    Z.prototype.Hb = function(a, b, c, d) {
      F("Query.on", 2, 4, arguments.length);
      Od("Query.on", a, !1);
      G("Query.on", 2, b, !1);
      var e = Ii("Query.on", c, d);
      if ("value" === a) gi(this.G, this, new pg(b, e.cancel || null, e.context || null));
      else {
        var f = {};
        f[a] = b;
        gi(this.G, this, new qg(f, e.cancel, e.context))
      }
      return b
    };
    Z.prototype.on = Z.prototype.Hb;
    Z.prototype.mc = function(a, b, c) {
      F("Query.off", 0, 3, arguments.length);
      Od("Query.off", a, !0);
      G("Query.off", 2, b, !0);
      yd("Query.off", 3, c);
      var d = null,
        e = null;
      "value" === a ? d = new pg(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new qg(e, null, c || null));
      e = this.G;
      d = ".info" === K(this.path) ? e.vd.ub(this, d) : e.U.ub(this, d);
      Sh(e.ja, this.path, d)
    };
    Z.prototype.off = Z.prototype.mc;
    Z.prototype.Gd = function(a, b, c, d) {
      function e(c) {
        k && (k = !1, g.mc(a, e), b && b.call(f.context, c), l.resolve(c))
      }
      F("Query.once", 1, 4, arguments.length);
      Od("Query.once", a, !1);
      G("Query.once", 2, b, !0);
      var f = Ii("Query.once", c, d),
        g = this,
        k = !0,
        l = new x;
      bc(l.o);
      this.Hb(a, e, function(b) {
        g.mc(a, e);
        f.cancel && f.cancel.call(f.context, b);
        l.reject(b)
      });
      return l.o
    };
    Z.prototype.once = Z.prototype.Gd;
    Z.prototype.once = Z.prototype.Gd;
    Z.prototype.xe = function(a) {
      B("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
      F("Query.limit", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limit: First argument must be a positive integer.");
      if (this.D.sa) throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
      var b = this.D.xe(a);
      Gi(b);
      return new Z(this.G, this.path, b, this.oc)
    };
    Z.prototype.limit = Z.prototype.xe;
    Z.prototype.yd = function(a) {
      F("Query.limitToFirst", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToFirst: First argument must be a positive integer.");
      if (this.D.sa) throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Z(this.G, this.path, this.D.yd(a), this.oc)
    };
    Z.prototype.limitToFirst = Z.prototype.yd;
    Z.prototype.limitToFirst = Z.prototype.yd;
    Z.prototype.zd = function(a) {
      F("Query.limitToLast", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToLast: First argument must be a positive integer.");
      if (this.D.sa) throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Z(this.G, this.path, this.D.zd(a), this.oc)
    };
    Z.prototype.limitToLast = Z.prototype.zd;
    Z.prototype.limitToLast = Z.prototype.zd;
    Z.prototype.qf = function(a) {
      F("Query.orderByChild", 1, 1, arguments.length);
      if ("$key" === a) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
      if ("$priority" === a) throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
      if ("$value" === a) throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
      Pd("Query.orderByChild", 1, a, !1);
      Hi(this, "Query.orderByChild");
      var b = Ei(this.D, new ae(a));
      Fi(b);
      return new Z(this.G,
        this.path, b, !0)
    };
    Z.prototype.orderByChild = Z.prototype.qf;
    Z.prototype.orderByChild = Z.prototype.qf;
    Z.prototype.rf = function() {
      F("Query.orderByKey", 0, 0, arguments.length);
      Hi(this, "Query.orderByKey");
      var a = Ei(this.D, fe);
      Fi(a);
      return new Z(this.G, this.path, a, !0)
    };
    Z.prototype.orderByKey = Z.prototype.rf;
    Z.prototype.orderByKey = Z.prototype.rf;
    Z.prototype.sf = function() {
      F("Query.orderByPriority", 0, 0, arguments.length);
      Hi(this, "Query.orderByPriority");
      var a = Ei(this.D, R);
      Fi(a);
      return new Z(this.G, this.path, a, !0)
    };
    Z.prototype.orderByPriority = Z.prototype.sf;
    Z.prototype.orderByPriority = Z.prototype.sf;
    Z.prototype.tf = function() {
      F("Query.orderByValue", 0, 0, arguments.length);
      Hi(this, "Query.orderByValue");
      var a = Ei(this.D, ie);
      Fi(a);
      return new Z(this.G, this.path, a, !0)
    };
    Z.prototype.orderByValue = Z.prototype.tf;
    Z.prototype.orderByValue = Z.prototype.tf;
    Z.prototype.Uc = function(a, b) {
      F("Query.startAt", 0, 2, arguments.length);
      Jd("Query.startAt", a, this.path, !0);
      Pd("Query.startAt", 2, b, !0);
      var c = this.D.Uc(a, b);
      Gi(c);
      Fi(c);
      if (this.D.ta) throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
      p(a) || (b = a = null);
      return new Z(this.G, this.path, c, this.oc)
    };
    Z.prototype.startAt = Z.prototype.Uc;
    Z.prototype.startAt = Z.prototype.Uc;
    Z.prototype.Bc = function(a, b) {
      F("Query.endAt", 0, 2, arguments.length);
      Jd("Query.endAt", a, this.path, !0);
      Pd("Query.endAt", 2, b, !0);
      var c = this.D.Bc(a, b);
      Gi(c);
      Fi(c);
      if (this.D.ua) throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
      return new Z(this.G, this.path, c, this.oc)
    };
    Z.prototype.endAt = Z.prototype.Bc;
    Z.prototype.endAt = Z.prototype.Bc;
    Z.prototype.Ye = function(a, b) {
      F("Query.equalTo", 1, 2, arguments.length);
      Jd("Query.equalTo", a, this.path, !1);
      Pd("Query.equalTo", 2, b, !0);
      if (this.D.ta) throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
      if (this.D.ua) throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
      return this.Uc(a, b).Bc(a, b)
    };
    Z.prototype.equalTo = Z.prototype.Ye;
    Z.prototype.equalTo = Z.prototype.Ye;
    Z.prototype.toString = function() {
      F("Query.toString", 0, 0, arguments.length);
      for (var a = this.path, b = "", c = a.ca; c < a.C.length; c++) "" !== a.C[c] && (b += "/" + encodeURIComponent(String(a.C[c])));
      return this.G.toString() + (b || "/")
    };
    Z.prototype.toString = Z.prototype.toString;

    function hf(a) {
      a = Cc(kf(a.D));
      return "{}" === a ? "default" : a
    }

    function Ii(a, b, c) {
      var d = {
        cancel: null,
        context: null
      };
      if (b && c) d.cancel = b, G(a, 3, d.cancel, !0), d.context = c, yd(a, 4, d.context);
      else if (b)
        if ("object" === typeof b && null !== b) d.context = b;
        else if ("function" === typeof b) d.cancel = b;
      else throw Error(xd(a, 3, !0) + " must either be a cancel callback or a context object.");
      return d
    };

    function Ji(a, b) {
      this.committed = a;
      this.snapshot = b
    };
    var Ki = function() {
      var a = 0,
        b = [];
      return function(c) {
        var d = c === a;
        a = c;
        for (var e = Array(8), f = 7; 0 <= f; f--) e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
        z(0 === c, "Cannot push at time == 0");
        c = e.join("");
        if (d) {
          for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
          b[f]++
        } else
          for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
        for (f = 0; 12 > f; f++) c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        z(20 === c.length, "nextPushId: Length should be 20.");
        return c
      }
    }();

    function W(a, b, c) {
      this.app = a;
      if (!b && !c) {
        b = a.options.syncURL;
        c = !0 === a.options.websocketOnly ? !0 : !1;
        if (!b) throw Error("Could not find 'syncURL' in options.");
        a = La(b);
        var d = a.Zg;
        "wilddog" === a.domain && yc(a.host + " is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");
        d || yc("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");
        a.Pb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && B("Insecure Wilddog access from a secure page. Please use https.");
        if (a.Lb) {
          var e = a.Lb;
          e && (e = e.replace(/^\/*\.info(\/|$)/, "/"));
          q(e) && 0 !== e.length && !Gd.test(e) || yc("App syncURL was an invalid path: " + b + '. Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')
        }
        b = new hi(a.host, a.Pb, d, "ws" === a.scheme || "wss" === a.scheme || c);
        a = new I(a.Lb);
        c = ri.ac();
        d = this.app;
        e = b.toString();
        c.bb[d.name] || (c.bb[d.name] = {});
        var f = t(c.bb[d.name], e);
        f || (f = new Vh(d, b, c.kh), c.bb[d.name][e] = f);
        b = f;
        c = a
      }
      Z.call(this, b, c, Ci, !1);
      this.INTERNAL = new X(this)
    }
    la(W, Z);
    W.prototype.name = function() {
      B("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");
      F("Wilddog.name", 0, 0, arguments.length);
      return this.key()
    };
    W.prototype.name = W.prototype.name;
    W.prototype.key = function() {
      F("Wilddog.key", 0, 0, arguments.length);
      return this.path.f() ? null : Ad(this.path)
    };
    W.prototype.key = W.prototype.key;
    W.prototype.w = function(a) {
      F("Wilddog.child", 1, 1, arguments.length);
      fa(a) ? a = String(a) : a instanceof I || (null === K(this.path) ? Rd("Wilddog.child", a) : Qd("Wilddog.child", a));
      return new W(this.app, this.G, this.path.w(a))
    };
    W.prototype.child = W.prototype.w;
    W.prototype.parent = function() {
      F("Wilddog.parent", 0, 0, arguments.length);
      var a = this.path.parent();
      return null === a ? null : new W(this.app, this.G, a)
    };
    W.prototype.parent = W.prototype.parent;
    W.prototype.root = function() {
      F("Wilddog.ref", 0, 0, arguments.length);
      for (var a = this; null !== a.parent();) a = a.parent();
      return a
    };
    W.prototype.root = W.prototype.root;
    W.prototype.set = function(a, b) {
      F("Wilddog.set", 1, 2, arguments.length);
      Sd("Wilddog.set", this.path);
      Jd("Wilddog.set", a, this.path, !1);
      G("Wilddog.set", 2, b, !0);
      var c = new x;
      this.G.vb(this.path, a, null, y(c, b));
      return c.o
    };
    W.prototype.set = W.prototype.set;
    W.prototype.update = function(a, b) {
      F("Wilddog.update", 1, 2, arguments.length);
      Sd("Wilddog.update", this.path);
      if (ea(a)) {
        for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
        a = c;
        B("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
      }
      Md("Wilddog.update", a, this.path);
      G("Wilddog.update", 2, b, !0);
      c = new x;
      this.G.update(this.path, a, y(c, b));
      return c.o
    };
    W.prototype.update = W.prototype.update;
    W.prototype.vb = function(a, b, c) {
      F("Wilddog.setWithPriority", 2, 3, arguments.length);
      Sd("Wilddog.setWithPriority", this.path);
      Jd("Wilddog.setWithPriority", a, this.path, !1);
      Nd("Wilddog.setWithPriority", 2, b);
      G("Wilddog.setWithPriority", 3, c, !0);
      if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.setWithPriority failed: " + this.key() + " is a read-only object.";
      var d = new x;
      this.G.vb(this.path, a, b, y(d, c));
      return d.o
    };
    W.prototype.setWithPriority = W.prototype.vb;
    W.prototype.remove = function(a) {
      F("Wilddog.remove", 0, 1, arguments.length);
      Sd("Wilddog.remove", this.path);
      G("Wilddog.remove", 1, a, !0);
      return this.set(null, a)
    };
    W.prototype.remove = W.prototype.remove;
    W.prototype.transaction = function(a, b, c) {
      F("Wilddog.transaction", 1, 3, arguments.length);
      Sd("Wilddog.transaction", this.path);
      G("Wilddog.transaction", 1, a, !1);
      G("Wilddog.transaction", 2, b, !0);
      if (p(c) && "boolean" != typeof c) throw Error(xd("Wilddog.transaction", 3, !0) + "must be a boolean.");
      if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.transaction failed: " + this.key() + " is a read-only object.";
      "undefined" === typeof c && (c = !0);
      var d = new x;
      ga(b) && bc(d.o);
      ii(this.G, this.path, a, function(a, c, g) {
        a ? d.reject(a) :
          d.resolve(new Ji(c, g));
        ga(b) && b(a, c, g)
      }, c);
      return d.o
    };
    W.prototype.transaction = W.prototype.transaction;
    W.prototype.Ng = function(a, b) {
      F("Wilddog.setPriority", 1, 2, arguments.length);
      Sd("Wilddog.setPriority", this.path);
      Nd("Wilddog.setPriority", 1, a);
      G("Wilddog.setPriority", 2, b, !0);
      var c = new x;
      this.G.vb(this.path.w(".priority"), a, null, y(c, b));
      return c.o
    };
    W.prototype.setPriority = W.prototype.Ng;
    W.prototype.push = function(a, b) {
      F("Wilddog.push", 0, 2, arguments.length);
      Sd("Wilddog.push", this.path);
      Jd("Wilddog.push", a, this.path, !0);
      G("Wilddog.push", 2, b, !0);
      var c = Yh(this.G),
        d = Ki(c),
        c = this.w(d);
      if (null != a) {
        var e = this,
          f = c.set(a, b).then(function() {
            return e.w(d)
          });
        c.then = r(f.then, f);
        c["catch"] = r(f.then, f, void 0);
        ga(b) && bc(f)
      }
      return c
    };
    W.prototype.push = W.prototype.push;
    W.prototype.onDisconnect = function() {
      Sd("Wilddog.onDisconnect", this.path);
      return new Y(this.G, this.path)
    };
    W.prototype.onDisconnect = W.prototype.onDisconnect;

    function Li() {
      F("Wilddog.goOffline", 0, 0, arguments.length);
      ri.ac().Dc(this.app)
    }
    ka("module$exports$wd$sync$Sync.goOffline", Li);

    function Mi() {
      F("Wilddog.goOnline", 0, 0, arguments.length);
      ri.ac().resume(this.app)
    }
    ka("module$exports$wd$sync$Sync.goOnline", Mi);
    var Ni = {
      TIMESTAMP: {
        ".sv": "timestamp"
      }
    };
    ka("module$exports$wd$sync$Sync.ServerValue", Ni);
    ka("module$exports$wd$sync$Sync.Context", ri);
    W.prototype.lg = Li;
    W.prototype.goOffline = W.prototype.lg;
    W.prototype.mg = Mi;
    W.prototype.goOnline = W.prototype.mg;
    W.prototype.Xe = function(a, b) {
      z(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
      !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? uc = r(console.log, console) : "object" === typeof console.log && (uc = function(a) {
        console.log(a)
      })), b && v.set("logging_enabled", !0)) : a ? uc = a : (uc = null, v.remove("logging_enabled"))
    };
    W.prototype.enableLogging = W.prototype.Xe;
    W.prototype.Jf = Ni;
    W.prototype.ServerValue = W.prototype.Jf;
    fc && fc.wf && fc.wf(Z);
    Vd.Ee("sync", function(a) {
      return new W(a)
    });
    Vd.Ee("auth", function(a) {
      null == a.Re && (a.Re = new N(a));
      return a.Re
    });
    (function(a) {
      a.auth = a.auth ? a.auth : {};
      [{
        id: "password",
        name: "Wilddog",
        xb: "phoneOrEmail",
        eb: "password"
      }, {
        id: "password",
        name: "Email",
        xb: "email",
        eb: "password"
      }, {
        id: "qq",
        name: "QQ",
        xb: "accessToken",
        eb: "openId"
      }, {
        id: "weibo",
        name: "Weibo",
        xb: "accessToken",
        eb: "openId"
      }, {
        id: "weixin",
        name: "Weixin",
        xb: "accessToken",
        eb: "openId"
      }, {
        id: "weixinmp",
        name: "Weixinmp",
        xb: "accessToken",
        eb: "openId"
      }].forEach(function(b) {
        a.auth[b.name + "AuthProvider"] = function() {
          this.id = b.id;
          this.addScope = function(a) {
            this.scope = a
          }
        };
        "Wilddog" ==
        b.name ? (a.auth.WilddogAuthProvider.emailCredential = function(a, d) {
          var c = {};
          c.provider = b.id;
          c.email = a;
          c[b.eb] = d;
          return c
        }, a.auth.WilddogAuthProvider.phoneCredential = function(a, d) {
          var c = {};
          c.provider = b.id;
          c.phoneNumber = a;
          c[b.eb] = d;
          return c
        }) : a.auth[b.name + "AuthProvider"].credential = "Email" == b.name ? function(a, d) {
          B("wilddog.auth.EmailAuthProvider being deprecated. Please usewilddog.auth.WilddogAuthProvider instead.");
          var c = {};
          c.provider = b.id;
          c[b.xb] = a;
          c[b.eb] = d;
          return c
        } : function(a, d) {
          var c = {};
          c.provider =
            b.id;
          c[b.xb] = a;
          c[b.eb] = d;
          return c
        }
      })
    })(Vd);
    if ("WEB" == CLIENT_TYPE) "object" == typeof module && module.exports && (module.exports = Vd), "function" == typeof define && define.amd && define("wilddog", [], function() {
      return Vd
    }), "undefined" != typeof window ? window.wilddog = Vd : WorkerGlobalScope && self && (self.wilddog = Vd);
    else if ("NODE" == CLIENT_TYPE || "WX" == CLIENT_TYPE || "RN" == CLIENT_TYPE) module.exports = Vd;
  };
  ns.wrapper(ns.goog, ns.wd)
})({
  goog: {},
  wd: {}
})
