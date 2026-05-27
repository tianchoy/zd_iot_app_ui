
import { PropType } from 'vue'

const __sfc__ = defineComponent({
	name: 'mSegmentedControl',
	emits: ['click', 'change', 'update:current'],
	props: {
		values: {
			type: Array,
			default(): any[] {
				return []
			}
		},
		current: {
			type: Number,
			default: 0
		},
		textActiveColor:{
			type: String,
			default: '#334155'
		},
		activeColor: {
			type: String,
			default: '#e5edf6	'
		},
		height: {
			type: String,
			default: '56rpx'
		},
		size: {
			type: String,
			default: '28rpx'
		},
		radius: {
			type: String,
			default: '24rpx'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		inactiveColor: {
			type: String,
			default: '#666666'
		},
		backgroundColor: {
			type: String,
			default: '#f5f5f5'
		},
		customStyle: {
			type: Object as PropType<UTSJSONObject>,
			default: () => ({})
		}
	},
	computed: {
		valueList(): string[] {
			const raw = this.values as any[]
			const out = [] as string[]
			for (let i = 0; i < raw.length; i++) {
				const v = raw[i]
				if (typeof v === 'string') {
					out.push(v)
				} else {
					out.push('' + v)
				}
			}
			return out
		},
		innerCurrent(): number {
			const c = this.current as number
			const len = this.valueList.length
			if (len === 0) {
				return 0
			}
			if (c < 0) {
				return 0
			}
			if (c >= len) {
				return len - 1
			}
			return c
		},
		rootStyle(): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-segmented-control/m-segmented-control.uvue", 108, 10), 
				height: this.height,
				borderRadius: this.radius,
				backgroundColor: this.backgroundColor
			} as UTSJSONObject
			if (this.customStyle != null) {
				Object.assign(st, this.customStyle)
			}
			return st
		},
		thumbStyle(): UTSJSONObject {
			const n = this.valueList.length
			if (n <= 0) {
				return { display: 'none' }
			}
			const pct = 100.0 / n
			const i = this.innerCurrent
			return {
				width: pct + '%',
				left: i * pct + '%',
				transition: 'left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)',
				borderColor: this.activeColor as string,
				borderRadius: this.radius as string
			}
		}
	},
	methods: {
		textStyle(idx: number): UTSJSONObject {
			const active = idx === this.innerCurrent
			return {
				'font-size': this.size,
				color: active ? this.textActiveColor : this.inactiveColor,
				transition: 'color 0.28s ease'
			}
		},
		onItemTap(idx: number) {
			if (this.disabled) {
				return
			}
			this.$emit('update:current', idx)
			this.$emit('click', { index: idx } as UTSJSONObject)
			this.$emit('change', { index: idx } as UTSJSONObject)
		}
	}
})

export default __sfc__
function GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["m-segmented-control", _uM({ 'm-segmented-control--disabled': _ctx.disabled })]),
    style: _nS(_ctx.rootStyle)
  }), [
    _cE("view", _uM({ class: "m-segmented-control__inner" }), [
      _ctx.valueList.length > 0
        ? _cE("view", _uM({
            key: 0,
            class: "m-segmented-control__thumb",
            style: _nS(_ctx.thumbStyle)
          }), null, 4 /* STYLE */)
        : _cC("v-if", true),
      _cE(Fragment, null, RenderHelpers.renderList(_ctx.valueList, (item, idx, __index, _cached): any => {
        return _cE("view", _uM({
          key: idx,
          class: "m-segmented-control__item",
          onClick: () => {_ctx.onItemTap(idx)}
        }), [
          _cE("text", _uM({
            class: "m-segmented-control__text",
            style: _nS(_ctx.textStyle(idx))
          }), _tD(item), 5 /* TEXT, STYLE */)
        ], 8 /* PROPS */, ["onClick"])
      }), 128 /* KEYED_FRAGMENT */)
    ])
  ], 6 /* CLASS, STYLE */)
}
export type MSegmentedControlComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMSegmentedControlMSegmentedControlStyles = [_uM([["m-segmented-control", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "stretch"], ["boxSizing", "border-box"], ["overflow", "hidden"]]))], ["m-segmented-control--disabled", _pS(_uM([["opacity", 0.5]]))], ["m-segmented-control__inner", _pS(_uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "stretch"], ["position", "relative"], ["boxSizing", "border-box"], ["paddingTop", "20rpx"], ["paddingRight", 0], ["paddingBottom", "20rpx"], ["paddingLeft", 0], ["width", "100%"], ["minHeight", 0]]))], ["m-segmented-control__thumb", _pS(_uM([["position", "absolute"], ["top", "4rpx"], ["bottom", "4rpx"], ["left", 0], ["zIndex", 0], ["boxSizing", "border-box"], ["backgroundColor", "#ffffff"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["pointerEvents", "none"]]))], ["m-segmented-control__item", _pS(_uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["boxSizing", "border-box"], ["position", "relative"], ["zIndex", 1], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(0,0,0,0)"], ["borderRightColor", "rgba(0,0,0,0)"], ["borderBottomColor", "rgba(0,0,0,0)"], ["borderLeftColor", "rgba(0,0,0,0)"], ["backgroundColor", "rgba(0,0,0,0)"]]))], ["m-segmented-control__text", _pS(_uM([["lineHeight", 1.2], ["position", "relative"], ["zIndex", 2], ["color", "#334155"]]))]])]
