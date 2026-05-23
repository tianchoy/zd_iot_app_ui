// 导出工具函数
import * as utils from './libs/utils.uts'
import request from './components/m-tools/Request.uts'
import mTools from './components/m-tools/Ut.uts'

// 导出所有工具函数
export * from './libs/utils.uts'
export * from './components/m-tools/Request.uts'
export {
	injectMUnixHostProjectConfig,
	getHostProjectConfig,
	clearMUnixHostProjectConfig,
} from './components/m-tools/ProjectConfig.uts'
export { request }

// 合并 Ut.uts 默认导出（含 configInfo、httpGet、login、href 等），仅通过 Vue globalProperties 暴露为 this.$m
const $m = {
  ...utils,
  ...mTools,
}

/** @deprecated 请使用 app.use(mUnix)，在组件内通过 this.$m 访问（不再写入 uni.$m） */
export const mount$m = function() {}

// 批量注册全局组件
const importFn = import.meta.glob('./components/m-*/m-*.uvue', { eager: true })
let components = []

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, function(match, group1) {
    return group1.toUpperCase()
  }).replace(/^[a-z]/, function(match) {
    return match.toUpperCase()
  })
}

// 批量注册
for (const key in importFn) {
  let component = importFn[key].default
  if (component.name) {
    component.install = function (Vue) {
      Vue.component(component.name, component)
    }
    components.push(component)
  }
}

const install = (Vue) => {
  // 注册所有组件
  components.forEach(function(component) {
    Vue.component(component.name, component)
  })

  // 挂载到 Vue 全局属性（组件内 this.$m、模板中 $m）
  Vue.config.globalProperties.$m = $m
}

export default {
  install
}