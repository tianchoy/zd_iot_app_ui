
import { toCssLength } from '@/uni_modules/m-unix/components/m-tools/Ut.uts'

const __sfc__ = defineComponent({
	name: 'mDiv',
	props: {
		// 分割线颜色
		backgroundColor: {
			type: String,
			default: ''
		},
		// 文字颜色
		textColor: {
			type: String,
			default: '#909399'
		},
		// 文字大小
		fontSize: {
			type: [Number, String],
			default: 28
		},
		// 分割线高度
		height: {
			type: String,
			default: '1rpx'
		},
		// 文字位置 left/center/right
		contentPosition: {
			type: String,
			default: 'center'
		},
		// 文字内容
		text: {
			type: String,
			default: ''
		},
		// 文字自定义类名
		textClass: {
			type: String,
			default: ''
		}
	},
	computed: {
		/** 是否有文案或默认插槽（与样式「断线」模式一致） */
		hasTextContent(): boolean {
			const t = this.text
			if (t != null && ('' + t).length > 0) {
				return true
			}
			const slot = this.$slots['default']
			return slot != null
		},
		rootStyle(): UTSJSONObject {
			if (this.hasTextContent) {
				// 有文案：用顶边框画通栏线，避免仅透明背景导致线条消失；给足高度以免绝对定位文案被裁切
				const lineColor = this.backgroundColor != null && ('' + this.backgroundColor).length > 0
					? this.backgroundColor
					: '#e4e7ed'
				const style: UTSJSONObject = {__$originalPosition: new UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-div/m-div.uvue", 72, 11),}
				style['borderTopWidth'] = '1rpx'
				style['borderTopStyle'] = 'solid'
				style['borderTopColor'] = lineColor
				style['minHeight'] = '72rpx'
				style['height'] = 'auto'
				style['backgroundColor'] = 'transparent'
				style['boxSizing'] = 'border-box'
				return style
			}
			const style: UTSJSONObject = {__$originalPosition: new UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-div/m-div.uvue", 82, 10),}
			if (this.backgroundColor != null && ('' + this.backgroundColor).length > 0) {
				style['backgroundColor'] = this.backgroundColor
			}
			style['height'] = this.height
			return style
		},
		getDividerClass() {
			const classes: string[] = ['m-div']
			if (this.hasTextContent) {
				classes.push('m-div--has-text')
			}
			return classes.join(' ')
		},
		resolvedFontSize(): string {
			return toCssLength(this.fontSize as number | string)
		}
	}
});

export default __sfc__
function GenUniModulesMUnixComponentsMDivMDivRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["m-div", _ctx.getDividerClass]),
    style: _nS(_ctx.rootStyle)
  }), [
    _ctx.contentPosition !== 'center'
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["m-div__content", [`m-div__content--${_ctx.contentPosition}`, _ctx.textClass ? _ctx.textClass : '']]),
          style: _nS(_uM({ color: _ctx.textColor, 'font-size': _ctx.resolvedFontSize }))
        }), [
          renderSlot(_ctx.$slots, "default"),
          isTrue(_ctx.text)
            ? _cE("text", _uM({ key: 0 }), _tD(_ctx.text), 1 /* TEXT */)
            : _cC("v-if", true)
        ], 6 /* CLASS, STYLE */)
      : _cE("view", _uM({
          key: 1,
          class: _nC(["m-div__content m-div__content--center", [_ctx.textClass ? _ctx.textClass : '']]),
          style: _nS(_uM({ color: _ctx.textColor, 'font-size': _ctx.resolvedFontSize }))
        }), [
          renderSlot(_ctx.$slots, "default"),
          isTrue(_ctx.text)
            ? _cE("text", _uM({ key: 0 }), _tD(_ctx.text), 1 /* TEXT */)
            : _cC("v-if", true)
        ], 6 /* CLASS, STYLE */)
  ], 6 /* CLASS, STYLE */)
}
export type MDivComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMDivMDivStyles = [_uM([["m-div", _uM([["", _uM([["position", "relative"], ["boxSizing", "border-box"], ["backgroundColor", "#e4e7ed"]])], [".m-div--has-text", _uM([["backgroundColor", "rgba(0,0,0,0)"]])]])], ["m-div__content", _uM([[".m-div ", _uM([["position", "absolute"], ["backgroundColor", "#ffffff"], ["paddingTop", 0], ["paddingRight", "16rpx"], ["paddingBottom", 0], ["paddingLeft", "16rpx"], ["top", "50%"], ["color", "#909399"]])], [".m-div .m-div__content--left", _uM([["left", "20rpx"], ["transform", "translateY(-50%)"]])], [".m-div .m-div__content--center", _uM([["left", "50%"], ["transform", "translate(-50%, -50%)"]])], [".m-div .m-div__content--right", _uM([["right", "20rpx"], ["transform", "translateY(-50%)"]])]])]])]
