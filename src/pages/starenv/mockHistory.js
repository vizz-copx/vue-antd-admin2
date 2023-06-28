const myHistory = [
    'js如何export导出数组',
    "要导出一个数组，你可以使用ES6的模块语法中的`export`关键字。以下是导出数组的示例：\n" +
    "\n" +
    "```javascript\n" +
    "// 导出数组\n" +
    "const myArray = [1, 2, 3];\n" +
    "export default myArray;\n" +
    "```\n" +
    "\n" +
    "在上述示例中，我们首先创建了一个名为`myArray`的数组。然后，通过使用`export default`将该数组导出为默认导出。\n" +
    "\n" +
    "现在，你可以在其他文件中导入这个数组。以下是导入数组的示例：\n" +
    "\n" +
    "```javascript\n" +
    "// 导入数组\n" +
    "import myArray from './path/to/myArray.js';\n" +
    "\n" +
    "console.log(myArray); // 输出: [1, 2, 3]\n" +
    "```\n" +
    "\n" +
    "在上述示例中，我们使用`import`关键字从指定路径的文件中导入默认导出的数组`myArray`。然后，我们可以在导入的文件中使用`myArray`变量来访问这个数组。\n" +
    "\n" +
    "请确保将数组导出的文件保存为`.js`扩展名，并根据需要提供正确的文件路径。这样，你就可以在其他文件中导入并使用导出的数组了。",

    '让一个div占页面宽度100%，背景色为灰色',
    "要让一个 `<div>` 元素占据整个页面宽度，并设置背景色为灰色，你可以使用以下CSS样式：\n" +
    "\n" +
    "```html\n" +
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "  <meta charset=\"UTF-8\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
    "  <title>Full Width Div</title>\n" +
    "  <style>\n" +
    "    body, html {\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "    }\n" +
    "\n" +
    "    .full-width-div {\n" +
    "      width: 100%;\n" +
    "      background-color: gray;\n" +
    "    }\n" +
    "  </style>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <div class=\"full-width-div\">\n" +
    "    <!-- 内容 -->\n" +
    "  </div>\n" +
    "</body>\n" +
    "</html>\n" +
    "```\n" +
    "\n" +
    "在这个示例中，我们设置了 `<body>` 和 `<html>` 元素的 `margin` 和 `padding` 为0，以确保整个页面没有任何边距。然后，我们创建了一个名为 `.full-width-div` 的CSS类，并将其应用于 `<div>` 元素。通过将 `width` 属性设置为 `100%`，我们让 `<div>` 占据整个页面的宽度。同时，我们将 `background-color` 设置为 `gray`，以将背景色设置为灰色。\n" +
    "\n" +
    "通过使用上述CSS样式，你可以创建一个宽度为100%且背景色为灰色的 `<div>` 元素。你可以在 `<div>` 中添加所需的内容。",

    'v-for如果遍历列表，想取得其中的索引作为key',
    "如果你想在 `v-for` 中使用索引作为 `key`，可以通过第二个参数来获取当前遍历项的索引。你可以按照以下方式使用 `v-for` 并使用索引作为 `key`：\n" +
    "\n" +
    "```html\n" +
    "<template>\n" +
    "  <div>\n" +
    "    <ul>\n" +
    "      <li v-for=\"(item, index) in items\" :key=\"index\">{{ item }}</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</template>\n" +
    "\n" +
    "<script>\n" +
    "export default {\n" +
    "  data() {\n" +
    "    return {\n" +
    "      items: ['Item 1', 'Item 2', 'Item 3']\n" +
    "    };\n" +
    "  }\n" +
    "};\n" +
    "</script>\n" +
    "```\n" +
    "\n" +
    "在上述示例中，`v-for=\"(item, index) in items\"` 表示遍历名为 `items` 的数组，同时获取每个遍历项的值 `item` 和索引 `index`。然后，通过 `:key=\"index\"` 将索引作为每个生成的 `<li>` 元素的 `key`。\n" +
    "\n" +
    "需要注意的是，使用索引作为 `key` 存在一些限制和潜在的问题。当列表发生变化时，如果只依赖索引作为 `key`，可能会导致一些意外的行为。推荐的做法是，尽量使用具有唯一标识的属性作为 `key`，以确保在列表项发生变化时，Vue 能够正确地识别和更新元素。只有在列表项没有唯一标识的情况下，才考虑使用索引作为 `key`。",

    'yarn移除eslint',
    "如果你想要完全移除项目中的ESLint，可以按照以下步骤进行操作：\n" +
    "\n" +
    "1. 打开终端或命令行界面，并进入你的Vue项目根目录。\n" +
    "\n" +
    "2. 运行以下命令，使用Yarn卸载ESLint及其相关依赖项：\n" +
    "\n" +
    "```bash\n" +
    "yarn remove eslint eslint-plugin-vue eslint-config-airbnb-base\n" +
    "```\n" +
    "\n" +
    "这个命令会移除ESLint以及与Vue和Airbnb基础配置相关的插件和配置。\n" +
    "\n" +
    "3. 接下来，你可以删除与ESLint相关的配置文件。在Vue项目中，通常会有以下文件：\n" +
    "\n" +
    "- `.eslintrc.js` 或 `.eslintrc`：ESLint的配置文件。\n" +
    "- `.eslintignore`：用于指定哪些文件或目录应该被ESLint忽略的文件。\n" +
    "\n" +
    "确保在删除这些文件之前备份它们（如果你以后还需要使用ESLint）。\n" +
    "\n" +
    "4. 最后，重新启动你的Vue项目，ESLint将不再对代码进行任何检查或发出警告。\n" +
    "\n" +
    "请注意，移除ESLint后，你将失去一个强大的工具来帮助你检查和维护代码的质量和规范性。在删除之前，请确保你了解移除ESLint的影响，并确保你有其他适当的代码质量控制和规范工具来替代。",
]
export default myHistory
