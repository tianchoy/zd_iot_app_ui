
import { toCssLength, parseCssNumber } from '@/uni_modules/m-unix/components/m-tools/Ut.uts'

const __sfc__ = defineComponent({
	name: 'mLoading',
	props: {
		// 文字
		text: {
			type: String,
			default: '加载中...'
		},
		// 颜色
		color: {
			type: String,
			default: '#c0c4cc'
		},
		// 是否全屏
		full: {
			type: Boolean,
			default: false
		},
		// 是否动画
		anim: {
			type: Boolean,
			default: true
		},
		// 圆点尺寸，如 40rpx、24px；纯数字默认按 rpx。空则使用默认 16rpx 圆点
		size: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			dotKeys: [1, 2, 3] as number[]
		}
	},
	computed: {
		animClass() {
			return this.anim ? 'm-loading__spinner--anim' : ''
		},
		hasCustomDotSize(): boolean {
			const raw = (this.size as string).trim()
			if (raw.length === 0) {
				return false
			}
			const n = parseCssNumber(toCssLength(this.size as string))
			return n > 0
		},
		spinnerSizeStyle(): UTSJSONObject {
			if (!this.hasCustomDotSize) {
				return {} as UTSJSONObject
			}
			const normalized = toCssLength(this.size as string)
			const n = parseCssNumber(normalized)
			const nl = normalized.length
			let unit = 'rpx'
			if (nl >= 3 && normalized.substring(nl - 3) === 'rpx') {
				unit = 'rpx'
			} else if (nl >= 2 && normalized.substring(nl - 2) === 'px') {
				unit = 'px'
			}
			const h = Math.round(n * 2.5)
			return {
				height: h + unit
			} as UTSJSONObject
		},
		dotSizeStyle(): UTSJSONObject {
			const style: UTSJSONObject = {__$originalPosition: new UTSSourceMapPosition("style", "uni_modules/m-unix/components/m-loading/m-loading.uvue", 78, 10),
				backgroundColor: this.color
			}
			if (!this.hasCustomDotSize) {
				return style
			}
			const w = toCssLength(this.size as string)
			style.width = w
			style.height = w
			return style
		},
		textStyle(): UTSJSONObject {
			return {
				color: this.color
			} as UTSJSONObject
		},
		dotGapStyle(): UTSJSONObject {
			if (!this.hasCustomDotSize) {
				return {
					marginLeft: '16rpx'
				} as UTSJSONObject
			}
			const normalized = toCssLength(this.size as string)
			const n = parseCssNumber(normalized)
			const nl = normalized.length
			let unit = 'rpx'
			if (nl >= 3 && normalized.substring(nl - 3) === 'rpx') {
				unit = 'rpx'
			} else if (nl >= 2 && normalized.substring(nl - 2) === 'px') {
				unit = 'px'
			}
			const g = Math.round(n * 0.5)
			return {
				marginLeft: g + unit
			} as UTSJSONObject
		}
	},
	methods: {
		dotItemStyle(dot: number): UTSJSONObject {
			const base = this.dotSizeStyle as UTSJSONObject
			if (dot <= 1) {
				return base
			}
			const gapObj = this.dotGapStyle as UTSJSONObject
			const ml = gapObj['marginLeft']
			const merged: UTSJSONObject = {__$originalPosition: new UTSSourceMapPosition("merged", "uni_modules/m-unix/components/m-loading/m-loading.uvue", 123, 10),
				width: base['width'],
				height: base['height'],
				backgroundColor: base['backgroundColor'],
				marginLeft: ml
			}
			return merged
		}
	}
});

export default __sfc__
function GenUniModulesMUnixComponentsMLoadingMLoadingRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["m-loading", _uM({'m-loading--full': _ctx.full})])
  }), [
    _cE("view", _uM({
      class: _nC(["m-loading__spinner", _ctx.animClass]),
      style: _nS(_ctx.spinnerSizeStyle)
    }), [
      _cE(Fragment, null, RenderHelpers.renderList(_ctx.dotKeys, (dot, __key, __index, _cached): any => {
        return _cE("text", _uM({
          key: dot,
          class: "m-loading__dot",
          style: _nS(_ctx.dotItemStyle(dot))
        }), null, 4 /* STYLE */)
      }), 128 /* KEYED_FRAGMENT */)
    ], 6 /* CLASS, STYLE */),
    isTrue(_ctx.text)
      ? _cE("text", _uM({
          key: 0,
          class: "m-loading__text",
          style: _nS(_ctx.textStyle)
        }), _tD(_ctx.text), 5 /* TEXT, STYLE */)
      : _cC("v-if", true)
  ], 2 /* CLASS */)
}
export type MLoadingComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMLoadingMLoadingStyles = [_uM([["m-loading", _uM([["", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])], [".m-loading--full", _uM([["position", "fixed"], ["top", 0], ["left", 0], ["right", 0], ["bottom", 0], ["zIndex", 999], ["backgroundColor", "rgba(255,255,255,0.8)"]])]])], ["m-loading__spinner", _uM([[".m-loading ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["height", "40rpx"]])]])], ["m-loading__dot", _uM([[".m-loading .m-loading__spinner ", _uM([["width", "16rpx"], ["height", "16rpx"], ["borderTopLeftRadius", "50%"], ["borderTopRightRadius", "50%"], ["borderBottomRightRadius", "50%"], ["borderBottomLeftRadius", "50%"]])]])], ["m-loading__text", _uM([[".m-loading ", _uM([["marginTop", "16rpx"], ["fontSize", "28rpx"]])]])]])]
