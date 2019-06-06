const chart = (md) => {
    const defaultRender = md.renderer.rules.fence;
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (token.info.indexOf("echarts") === -1) {
            return defaultRender(tokens, idx, options, env, self);
        }
        let data = token.content.trim();
        let html = "";
        try {
            data = JSON.stringify(JSON.parse(data));
            html = `<div class="vditor-echarts"></div><textarea style='display:none'>${data}</textarea>`;
        } catch (e) {
            html = `<pre><code>${token.info} ${e}</code></pre>`;
        }
        return html;
    };
};

module.exports = chart