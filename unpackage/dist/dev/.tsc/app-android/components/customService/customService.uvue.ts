import _easycom_m_fab from '@/uni_modules/m-unix/components/m-fab/m-fab.uvue'

const __sfc__ = defineComponent({
  __name: 'customService',
  emits: ['connect_service'],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const handleClick = (e: any) => {
		emit('connect_service');
	}

return (): any | null => {

const _component_m_fab = resolveEasyComponent("m-fab",_easycom_m_fab)

  return _cV(_component_m_fab, _uM({
    type: "primary",
    size: "40rpx",
    icon: "customer-service",
    draggable: true,
    onClick: handleClick
  }))
}
}

})
export default __sfc__
export type CustomServiceComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenComponentsCustomServiceCustomServiceStyles = []
