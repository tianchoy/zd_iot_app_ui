import _easycom_m_fab from '@/uni_modules/m-unix/components/m-fab/m-fab.uvue'

const __sfc__ = defineComponent({
  __name: 'customService',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const connect_service = ()=>{
		console.log('联系客服', " at components/customService/customService.uvue:7")
	}

return (): any | null => {

const _component_m_fab = resolveEasyComponent("m-fab",_easycom_m_fab)

  return _cV(_component_m_fab, _uM({
    type: "primary",
    size: "40rpx",
    icon: "customer-service",
    draggable: true,
    onClick: connect_service
  }))
}
}

})
export default __sfc__
export type CustomServiceComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenComponentsCustomServiceCustomServiceStyles = []
