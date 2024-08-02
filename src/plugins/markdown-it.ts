// Markdown-it 工具类

// 引入语法高亮
const hljs = require("highlight.js");

// 所有的选项列表（默认情况下）
const md = require('markdown-it')({
  html:         true,        // 在源码中启用 HTML 标签
  linkify:      true,        // 将类似 URL 的文本自动转换为链接
  breaks:       true,        // 转换段落里的 '\n' 到 <br>。
  typographer:  false,       // 启用一些语言中立的替换 + 引号美化
  xhtmlOut:     false,        // 使用 '/' 来闭合单标签（比如 <br />）
                              // 这个选项只对完全的 CommonMark 模式兼容。
  
  // 高亮函数，会返回转义的HTML。
  // 或 '' 如果源字符串未更改，则应在外部进行转义。
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
  highlight: function (str: any, lang: any) {
    console.log("str: ", str, "lang: ", lang);
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // 使用额外的默认转义
  }
});

export { md };