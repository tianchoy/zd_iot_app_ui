import { onMounted, onUnmounted } from 'vue'







// 返回上一页并传递结果

const __sfc__ = defineComponent({
  __name: 'scanCode',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const goBackWithResult = (result: string) => {
  console.log('扫码结果:', result, " at pages/scanCode/scanCode.uvue:38")
  uni.$emit('scanResult', { result: result })
  uni.navigateBack({ delta: 1 })
}

const stopScanH5 = async () => {
  if (!html5QrCode) return
  try {
    const state = html5QrCode.getState()
    if (state === 2 || state === 3) {
      await html5QrCode.stop()
    }
  } catch (err) {
    console.log('停止扫描失败:', err, " at pages/scanCode/scanCode.uvue:51")
  } finally {
    html5QrCode = null
  }
}

const handleBack = () => {



  uni.navigateBack({ delta: 1 })
}

// ==================== 微信小程序 ====================





























// ==================== App ====================

onMounted(() => {
  // 延迟一下，确保页面完全加载
  setTimeout(() => {
    uni.scanCode({
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        console.log('App扫码成功:', res.result, " at pages/scanCode/scanCode.uvue:102")
        goBackWithResult(res.result as string)
      },
      fail: (err) => {
        console.log('App扫码失败或取消:', err, " at pages/scanCode/scanCode.uvue:106")
        uni.showToast({
          title: '扫码失败或已取消',
          icon: 'none',
          duration: 1500,
          complete: () => {
            setTimeout(() => {
              uni.navigateBack({ delta: 1 })
            }, 500)
          }
        })
      }
    })
  }, 100)
})


// ==================== H5 ====================




































































































































































return (): any | null => {

  return _cE("view", _uM({ class: "scan-page" }), [
    _cE("view", _uM({ class: "other-scan-container" }), [
      _cE("view", _uM({ class: "scan-tip" }), [
        _cE("text", _uM({ class: "tip-icon" }), "📷"),
        _cE("text", _uM({ class: "tip-text" }), "正在启动相机...")
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesScanCodeScanCodeStyles = [_uM([["scan-page", _pS(_uM([["position", "fixed"], ["top", 0], ["left", 0], ["width", "100%"], ["height", "100%"], ["backgroundColor", "#000000"], ["zIndex", 999]]))], ["other-scan-container", _pS(_uM([["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["width", "100%"], ["height", "100%"]]))], ["scan-tip", _uM([[".other-scan-container ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"]])]])], ["tip-icon", _uM([[".other-scan-container .scan-tip ", _uM([["fontSize", "120rpx"]])]])], ["tip-text", _uM([[".other-scan-container .scan-tip ", _uM([["fontSize", "32rpx"], ["color", "#ffffff"]])]])]])]
