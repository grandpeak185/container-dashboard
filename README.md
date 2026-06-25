# 中美集装箱运输仪表板

这是用于 GitHub Pages 发布的版本。

## 文件结构

```text
index.html
assets/charts.js
_shared/js/echarts.min.js
```

## 发布方式

将本目录下的全部文件上传到 GitHub 仓库 `container-dashboard` 的根目录。

上传后访问：

```text
https://grandpeak185.github.io/container-dashboard/
```

## 更新说明

每次在 TRAE 内更新仪表板后，需要同步更新以下文件到 GitHub 仓库：

```text
index.html
assets/charts.js
```

如果 ECharts 库没有变化，`_shared/js/echarts.min.js` 不需要重复更新。
