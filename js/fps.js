$.ajax({
    type: "get",
    url: "https://api.gmit.vip/api/UserInfo/",
    async: true,
    success: function (data) {
        window.info = data;
        var showFPS = (function () {
            var requestAnimationFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            var e, pe, pid, fps, last, offset, step, appendFps;
            fps = 0;
            last = Date.now();
            step = function () {
                offset = Date.now() - last;
                fps += 1;
                if (offset >= 1000) {
                    last += offset;
                    appendFps(fps);
                    fps = 0;
                }
                requestAnimationFrame(step);
            };
            appendFps = function (fps) {
                var settings = {
                    timeout: 5000,
                    logError: true
                }
                var p = new Ping(settings);
                p.ping('', function (perr, ping) {
                    if (perr) {
                        $('#fps').html('<span style="float:right">' + fps + 'FPS</span><br/><span style="float:right">' + window.info.data.os + '</span><br/><span style="float:right;margin-top:1px;">' + window.info.data.browser + '</span><br/><span style="float:right;margin-top:1px;">' + window.info.data.location + '</span><br/>');
                    }
                    if (ping) {
                        $('#fps').html('<span style="float:right">' + fps + 'FPS</span><br/><span style="float:right">' + window.info.data.os + '</span><br/><span style="float:right;margin-top:1px;">' + window.info.data.browser + '</span><br/><span style="float:right;margin-top:1px;">' + window.info.data.location + ' ' + ping + 'ms</span><br/>');
                    }
                });
            };
            step();
        })();
    }
});