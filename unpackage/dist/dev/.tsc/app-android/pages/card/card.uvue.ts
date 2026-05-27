import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
import _easycom_m_button from '@/uni_modules/m-unix/components/m-button/m-button.uvue'
import _easycom_m_segmented_control from '@/uni_modules/m-unix/components/m-segmented-control/m-segmented-control.uvue'
import _easycom_m_tag from '@/uni_modules/m-unix/components/m-tag/m-tag.uvue'
import _easycom_m_div from '@/uni_modules/m-unix/components/m-div/m-div.uvue'
import { ref } from 'vue'


const __sfc__ = defineComponent({
  __name: 'card',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const card_number = ref('')
const tabs = ref(['全部', '正常','异常'])
const current = ref(0)

const handleClick = (e: UTSJSONObject) => {
	console.log(e.index, " at pages/card/card.uvue:65")
	current.value = e.index
}




return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)
const _component_m_button = resolveEasyComponent("m-button",_easycom_m_button)
const _component_m_segmented_control = resolveEasyComponent("m-segmented-control",_easycom_m_segmented_control)
const _component_m_tag = resolveEasyComponent("m-tag",_easycom_m_tag)
const _component_m_div = resolveEasyComponent("m-div",_easycom_m_div)

  return _cE("view", _uM({ class: "container" }), [
    _cV(_component_topNavBar, _uM({
      title: "卡片",
      "show-back": false,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    })),
    _cE("view", _uM({ class: "card-box" }), [
      _cE("view", _uM({ class: "card-label" }), "卡号查询"),
      _cE("view", _uM({ class: "search-value" }), [
        _cE("input", _uM({
          modelValue: card_number.value,
          onInput: ($event: UniInputEvent) => {(card_number).value = $event.detail.value},
          placeholder: "请输入 ICCID / MSISDN",
          class: "search-input"
        }), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"]),
        _cV(_component_m_button, _uM({
          type: "white",
          plain: true,
          class: "scan-btn",
          width: "90rpx"
        }), _uM({
          default: withSlotCtx((): any[] => [
            _cV(_component_m_icon, _uM({
              name: "scanning",
              size: "40rpx"
            }))
          ]),
          _: 1 /* STABLE */
        })),
        _cV(_component_m_button, _uM({
          type: "primary",
          width: "120rpx"
        }), _uM({
          default: withSlotCtx((): any[] => ["查询"]),
          _: 1 /* STABLE */
        }))
      ]),
      _cV(_component_m_segmented_control, _uM({
        values: tabs.value,
        current: current.value,
        textActiveColor: '#2563eb',
        onClick: handleClick,
        customStyle: {height:'unset',padding:'5rpx 10rpx',border:'1rpx solid #e5edf6'}
      }), null, 8 /* PROPS */, ["values", "current"])
    ]),
    _cE("view", _uM({ class: "card-box" }), [
      _cE("view", _uM({ class: "card-list" }), [
        _cE("view", _uM({ class: "card-item" }), [
          _cE("view", _uM({ class: "item-head" }), [
            _cE("view", _uM({ class: "item-head-label" }), [
              _cE("text", _uM({ class: "card-item-title" }), "1064916585160"),
              _cE("text", _uM({ class: "card-item-content" }), "ICCID: 89860421123456789012")
            ]),
            _cV(_component_m_tag, _uM({
              text: "标签",
              round: true,
              plain: true,
              size: "small",
              type: "primary"
            }))
          ]),
          _cE("view", _uM({ class: "item-package" }), [
            _cE("text", _uM({ class: "package-label" }), "当前套餐:"),
            _cE("text", _uM({ class: "package-value" }), "车联网月包20G")
          ]),
          _cV(_component_m_div, _uM({
            backgroundColor: "#f1f5f9",
            textClass: "divider"
          })),
          _cE("view", _uM({ class: "card-metrics" }), [
            _cE("view", _uM({ class: "metric-box" }), [
              _cE("view", _uM({ class: "metric-label" }), "到期时间"),
              _cE("view", _uM({ class: "metric-value" }), "2026-04-30")
            ]),
            _cE("view", _uM({ class: "metric-box" }), [
              _cE("view", _uM({ class: "metric-label" }), "本月流量"),
              _cE("view", _uM({ class: "metric-value" }), "11.34GB / 20GB")
            ])
          ]),
          _cE("view", _uM({ class: "card-bottom" }), [
            _cE("view", _uM({ class: "card-cycle-text" }), [
              _cE("text", _uM({ class: "cycle-label" }), "当前周期："),
              _cE("text", _uM({ class: "cycle-value" }), "第1期 / 共12期")
            ]),
            _cV(_component_m_button, _uM({
              type: "primary",
              width: "200rpx",
              btnSize: "mini",
              size: "25rpx",
              shape: "circle"
            }), _uM({
              default: withSlotCtx((): any[] => ["去充值"]),
              _: 1 /* STABLE */
            }))
          ])
        ])
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesCardCardStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["gap", "40rpx"], ["backgroundColor", "#f4f7fb"], ["marginTop", "180rpx"]]))], ["card-box", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["gap", "20rpx"]])]])], ["search-value", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#dbe5f0"], ["borderRightColor", "#dbe5f0"], ["borderBottomColor", "#dbe5f0"], ["borderLeftColor", "#dbe5f0"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"]])]])], ["search-input", _uM([[".container .card-box .search-value ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingTop", 0], ["paddingRight", "25rpx"], ["paddingBottom", 0], ["paddingLeft", "25rpx"], ["height", "95rpx"], ["borderTopWidth", "medium"], ["borderRightWidth", "medium"], ["borderBottomWidth", "medium"], ["borderLeftWidth", "medium"], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#0f172a"], ["fontSize", "30rpx"], ["outline", "none"]])]])], ["scan-btn", _uM([[".container .card-box .search-value ", _uM([["borderLeftWidth", 1], ["borderLeftStyle", "solid"], ["borderLeftColor", "#eef2f7"]])]])], ["card-item", _uM([[".container .card-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "#e7edf5"], ["paddingBottom", "24rpx"], ["marginBottom", "20rpx"], ["borderBottomWidth:last-child", "medium"], ["borderBottomStyle:last-child", "none"], ["borderBottomColor:last-child", "#000000"], ["marginBottom:last-child", 0], ["paddingBottom:last-child", 0]])]])], ["item-head", _uM([[".container .card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-start"], ["justifyContent", "space-between"], ["gap", "10px"]])]])], ["card-item-title", _uM([[".container .card-box .card-item .item-head ", _uM([["fontSize", "32rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.25], ["wordBreak", "break-all"]])]])], ["card-item-content", _uM([[".container .card-box .card-item .item-head ", _uM([["marginTop", 5], ["fontSize", 12], ["color", "#94a3b8"], ["lineHeight", 1.45], ["wordBreak", "break-all"]])]])], ["item-package", _uM([[".container .card-box .card-item ", _uM([["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["display", "flex"], ["flexDirection", "row"], ["gap", "20rpx"], ["minWidth", 0]])]])], ["package-label", _uM([[".container .card-box .card-item .item-package ", _uM([["fontSize", 12], ["color", "#64748b"], ["lineHeight", 1.4]])]])], ["package-value", _uM([[".container .card-box .card-item .item-package ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "25rpx"], ["fontWeight", 700], ["color", "#334155"], ["lineHeight", 1.45], ["whiteSpace", "nowrap"], ["overflow", "hidden"], ["textOverflow", "ellipsis"]])]])], ["card-metrics", _uM([[".container .card-box .card-item ", _uM([["gridTemplateColumns", "repeat(2, 1fr)"], ["gap", "20rpx"], ["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0]])]])], ["metric-box", _uM([[".container .card-box .card-item .card-metrics ", _uM([["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e8eef7"], ["borderRightColor", "#e8eef7"], ["borderBottomColor", "#e8eef7"], ["borderLeftColor", "#e8eef7"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"], ["minWidth", 0]])]])], ["metric-label", _uM([[".container .card-box .card-item .card-metrics .metric-box ", _uM([["fontSize", "25rpx"], ["color", "#94a3b8"], ["lineHeight", 1.4]])]])], ["metric-value", _uM([[".container .card-box .card-item .card-metrics .metric-box ", _uM([["marginTop", "15rpx"], ["fontSize", "25rpx"], ["fontWeight", 800], ["color", "#0f172a"], ["lineHeight", 1.4], ["wordBreak", "break-all"]])]])], ["card-bottom", _uM([[".container .card-box .card-item ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["gap", "20rpx"]])]])], ["card-cycle-text", _uM([[".container .card-box .card-item .card-bottom ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["gap", "10rpx"]])]])], ["cycle-label", _uM([[".container .card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "25rpx"], ["color", "#64748b"], ["lineHeight", 1.45]])]])], ["cycle-value", _uM([[".container .card-box .card-item .card-bottom .card-cycle-text ", _uM([["fontSize", "25rpx"], ["color", "#334155"], ["fontWeight", 800]])]])]])]
