window.onscroll = function () {
	var t = document.getElementById("nav");
	window.pageYOffset > 300 ? t.classList.add("active") : t.classList.remove("active")
}, ! function () {
	for (var t, e = 500, n = 15, o = document.getElementsByTagName("a"), r = 0; r < o.length; r++) t = void 0 === o[r].attributes.href ? null : o[r].attributes.href.nodeValue.toString(), null !== t && t.length > 1 && "#" == t.substr(0, 1) && (o[r].onclick = function () {
		var t, o = this.attributes.href.nodeValue.toString();
		if (t = document.getElementById(o.substr(1)))
			for (var r = e / n, i = u(), a = (l(t) - i) / r, c = 1; r >= c; c++) ! function () {
				var t = a * c;
				setTimeout(function () {
					window.scrollTo(0, t + i)
				}, n * c)
			}();
		return !1
	});
	var l = function (t) {
			for (var e = 0; void 0 != t.offsetParent && null != t.offsetParent;) e += t.offsetTop + (null != t.clientTop ? t.clientTop : 0), t = t.offsetParent;
			return e
		},
		u = function () {
			return document.documentElement.scrollTop + document.body.scrollTop
		}
}();
