// utils/inject-config.uts
import { config } from '@/common/config.uts'
import { injectMUnixHostProjectConfig, getHostProjectConfig } from '@/uni_modules/m-unix/components/m-tools/ProjectConfig.uts'

// 注入配置到 m-unix
injectMUnixHostProjectConfig(config)

// 验证配置是否注入成功
const injectedConfig = getHostProjectConfig()
__f__('log','at utils/inject-m-unix.uts:10','配置注入成功:', injectedConfig.baseUrl)