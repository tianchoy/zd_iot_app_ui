
type FabBtn = UTSJSONObject

const __sfc__ = defineComponent({
	name: 'mFab',
	emits: ['click', 'dragend'],
	props: {
		left: {
			type: [Number, String],
			default: 0
		},
		right: {
			type: [Number, String],
			default: 80
		},
		bottom: {
			type: [Number, String],
			default: 100
		},
		top: {
			type: [Number, String],
			default: 0
		},
		zIndex: {
			type: [Number, String],
			default: 997
		},
		width: {
			type: [Number, String],
			default: 80
		},
		height: {
			type: [Number, String],
			default: 80
		},
		radius: {
			type: String,
			default: '50%'
		},
		custom: {
			type: Boolean,
			default: false
		},
		/** m-icon 名称；非空且非 custom 时显示图标，否则显示「+」 */
		icon: {
			type: String,
			default: ''
		},
		/** 主按钮图标字号（rpx，与 m-icon size 一致） */
		iconSize: {
			type: [Number, String],
			default: 52
		},
		/** 为 true 时可按住主按钮拖动，松手后可选吸边 */
		draggable: {
			type: Boolean,
			default: false
		},
		/** 拖动结束后是否吸附到左右近侧（需 draggable） */
		snapEdge: {
			type: Boolean,
			default: true
		},
		/** 吸边与拖动边界留白（rpx） */
		snapPadding: {
			type: [Number, String],
			default: 16
		},
		bgColor: {
			type: String,
			default: '#5677fc'
		},
		color: {
			type: String,
			default: '#ffffff'
		},
		btnList: {
			type: Array,
			default(): any[] {
				return []
			}
		},
		textField: {
			type: String,
			default: 'text'
		},
		imgField: {
			type: String,
			default: 'imgUrl'
		},
		size: {
			type: [Number, String],
			default: 28
		},
		maskClosable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			expanded: false as boolean,
			winW: 0 as number,
			winH: 0 as number,
			dragLeftPx: 0 as number,
			dragTopPx: 0 as number,
			dragReady: false as boolean,
			wrapWpx: 0 as number,
			wrapHpx: 0 as number,
			dragStartTouchX: 0 as number,
			dragStartTouchY: 0 as number,
			dragStartLeftPx: 0 as number,
			dragStartTopPx: 0 as number,
			dragMoved: false as boolean,
			dragSuppressedTap: false as boolean
		}
	},
	computed: {
		iconName(): string {
			const s = this.icon as string
			if (s == null) {
				return ''
			}
			const t = s.trim()
			return t
		},
		baseZ(): number {
			const zi = this.zIndex
			const n = typeof zi === 'number' ? zi as number : parseInt('' + zi)
			return isNaN(n) ? 997 : n
		},
		maskZIndex(): number {
			return this.baseZ - 1
		},
		wrapStyle(): UTSJSONObject {
			if (this.draggable as boolean) {
				const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 185, 11), } as UTSJSONObject
				st['zIndex'] = this.baseZ
				st['position'] = 'fixed'
				st['left'] = this.dragLeftPx + 'px'
				st['top'] = this.dragTopPx + 'px'
				st['right'] = 'auto'
				st['bottom'] = 'auto'
				st['display'] = 'flex'
				st['flexDirection'] = 'column'
				st['alignItems'] = 'flex-end'
				return st
			}
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 197, 10), } as UTSJSONObject
			st['zIndex'] = this.baseZ
			st['position'] = 'fixed'
			const t = this.top as number | string
			const tp = typeof t === 'number' ? t as number : parseInt('' + t)
			if (!isNaN(tp) && tp > 0) {
				st['top'] = t + 'rpx'
				st['bottom'] = 'auto'
			} else {
				st['bottom'] = this.bottom + 'rpx'
			}
			const l = this.left as number | string
			const ln = typeof l === 'number' ? l as number : parseInt('' + l)
			if (!isNaN(ln) && ln > 0) {
				st['left'] = l + 'rpx'
				st['right'] = 'auto'
			} else {
				st['right'] = this.right + 'rpx'
				st['left'] = 'auto'
			}
			st['display'] = 'flex'
			st['flexDirection'] = 'column'
			st['alignItems'] = 'flex-end'
			return st
		},
		mainStyle(): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 223, 10), } as UTSJSONObject
			st['width'] = this.width + 'rpx'
			st['height'] = this.height + 'rpx'
			st['borderRadius'] = this.radius as string
			st['backgroundColor'] = this.bgColor as string
			return st
		},
		/** 内置图标/「+」时子节点不抢触摸；custom 插槽不关闭子节点事件 */
		mainDragClass(): string[] {
			const out = [] as string[]
			out.push('m-fab__main')
			const d = this.draggable as boolean
			if (d) {
				out.push('m-fab__main--drag')
				if (!(this.custom as boolean)) {
					out.push('m-fab__main--drag-pass')
				}
			}
			return out
		}
	},
	watch: {
		expanded() {
			this.$nextTick(() => {
				this.measureWrapSize()
			})
		}
	},
	mounted() {
		this.initDragMetrics()
		this.$nextTick(() => {
			this.measureWrapSize()
		})
	},
	methods: {
		snapPaddingRpx(): number {
			const sp = this.snapPadding as number | string
			const n = typeof sp === 'number' ? sp as number : parseInt('' + sp)
			return isNaN(n) ? 16 : n
		},
		mainWidthPx(): number {
			const w = this.width as number | string
			const n = typeof w === 'number' ? w as number : parseInt('' + w)
			return uni.rpx2px(isNaN(n) ? 108 : n)
		},
		mainHeightPx(): number {
			const h = this.height as number | string
			const n = typeof h === 'number' ? h as number : parseInt('' + h)
			return uni.rpx2px(isNaN(n) ? 108 : n)
		},
		wrapWOrDefault(): number {
			if (this.wrapWpx > 0) {
				return this.wrapWpx
			}
			return this.mainWidthPx()
		},
		wrapHOrDefault(): number {
			if (this.wrapHpx > 0) {
				return this.wrapHpx
			}
			return this.mainHeightPx()
		},
		initDragMetrics() {
			if (!(this.draggable as boolean)) {
				return
			}
			const sys = uni.getSystemInfoSync()
			this.winW = sys.windowWidth as number
			this.winH = sys.windowHeight as number
			const fabW = this.mainWidthPx()
			const fabH = this.mainHeightPx()
			const t = this.top as number | string
			const tp = typeof t === 'number' ? t as number : parseInt('' + t)
			const l = this.left as number | string
			const ln = typeof l === 'number' ? l as number : parseInt('' + l)
			const r = this.right as number | string
			const rn = typeof r === 'number' ? r as number : parseInt('' + r)
			const b = this.bottom as number | string
			const bn = typeof b === 'number' ? b as number : parseInt('' + b)
			if (!isNaN(tp) && tp > 0) {
				const lr = !isNaN(ln) && ln > 0 ? uni.rpx2px(ln) : uni.rpx2px(80)
				this.dragLeftPx = lr
				this.dragTopPx = uni.rpx2px(tp)
			} else {
				this.dragTopPx = this.winH - fabH - uni.rpx2px(isNaN(bn) ? 100 : bn)
				if (!isNaN(ln) && ln > 0) {
					this.dragLeftPx = uni.rpx2px(ln)
				} else {
					this.dragLeftPx = this.winW - fabW - uni.rpx2px(isNaN(rn) ? 80 : rn)
				}
			}
			this.dragReady = true
		},
		measureWrapSize() {
			const self = this
			try {
				const q = uni.createSelectorQuery().in(self as any)
				q.select('.m-fab__wrap')
					.boundingClientRect((rect: any) => {
						if (rect == null) {
							return
						}
						const w = rect.width as number
						const h = rect.height as number
						if (w > 0 && h > 0) {
							self.wrapWpx = w
							self.wrapHpx = h
						}
					})
					.exec()
			} catch (_e) {
				// ignore
			}
		},
		applySnap() {
			const pad = uni.rpx2px(this.snapPaddingRpx())
			const w = this.wrapWOrDefault()
			const cx = this.dragLeftPx + w / 2
			if (cx < this.winW / 2) {
				this.dragLeftPx = pad
			} else {
				this.dragLeftPx = this.winW - w - pad
			}
			const h = this.wrapHOrDefault()
			this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad))
		},
		/** 与 m-swipe-action 一致：优先 clientX/Y，兼容 pageX/Y（各端触摸对象字段不一致） */
		touchClientXY(e: any): number[] | null {
			const touches = e['touches'] as any[] | null
			if (touches == null || touches.length == 0) {
				return null
			}
			const t0 = touches[0] as UTSJSONObject
			let x = t0['clientX'] as number | null
			let y = t0['clientY'] as number | null
			if (x == null) {
				x = t0['pageX'] as number | null
			}
			if (y == null) {
				y = t0['pageY'] as number | null
			}
			if (x == null || y == null) {
				return null
			}
			return [x as number, y as number]
		},
		onDragStart(e: any) {
			if (!(this.draggable as boolean)) {
				return
			}
			if (this.winW <= 0 || this.winH <= 0) {
				this.initDragMetrics()
			}
			const xy = this.touchClientXY(e)
			if (xy == null) {
				return
			}
			this.dragStartTouchX = xy[0]
			this.dragStartTouchY = xy[1]
			this.dragStartLeftPx = this.dragLeftPx
			this.dragStartTopPx = this.dragTopPx
			this.dragMoved = false
		},
		onDragMove(e: any) {
			if (!(this.draggable as boolean)) {
				return
			}
			const xy = this.touchClientXY(e)
			if (xy == null) {
				return
			}
			const dx = xy[0] - this.dragStartTouchX
			const dy = xy[1] - this.dragStartTouchY
			if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
				this.dragMoved = true
			}
			const pad = uni.rpx2px(this.snapPaddingRpx())
			const w = this.wrapWOrDefault()
			const h = this.wrapHOrDefault()
			let nx = this.dragStartLeftPx + dx
			let ny = this.dragStartTopPx + dy
			nx = Math.max(pad, Math.min(nx, this.winW - w - pad))
			ny = Math.max(pad, Math.min(ny, this.winH - h - pad))
			this.dragLeftPx = nx
			this.dragTopPx = ny
		},
		onDragEnd() {
			if (!(this.draggable as boolean)) {
				return
			}
			const didMove = this.dragMoved
			if (didMove && (this.snapEdge as boolean)) {
				this.applySnap()
			}
			if (didMove) {
				this.dragSuppressedTap = true
				this.$emit('dragend', {
					leftPx: this.dragLeftPx,
					topPx: this.dragTopPx
				} as UTSJSONObject)
				const self = this
				setTimeout(() => {
					self.dragSuppressedTap = false
				}, 120)
			}
			this.dragMoved = false
		},
		subText(btn: FabBtn): string {
			const k = this.textField as string
			const v = btn[k]
			return v == null ? '' : '' + v
		},
		subImg(btn: FabBtn): string {
			const k = this.imgField as string
			const v = btn[k]
			return v == null ? '' : '' + v
		},
		subColor(btn: FabBtn): string {
			const c = btn['color']
			return c == null ? '#ffffff' : '' + c
		},
		subFontSize(btn: FabBtn): number {
			const fs = btn['fontSize']
			if (fs != null) {
				const n = typeof fs === 'number' ? fs as number : parseInt('' + fs)
				if (!isNaN(n)) {
					return n
				}
			}
			const d = this.size
			return typeof d === 'number' ? d as number : parseInt('' + d)
		},
		subStyle(btn: FabBtn): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 456, 10), } as UTSJSONObject
			const bg = btn['bgColor']
			st['backgroundColor'] = bg == null ? '#16c2c2' : '' + bg
			return st
		},
		collapse() {
			this.expanded = false
		},
		onMainTap() {
			if (this.dragSuppressedTap) {
				return
			}
			const list = this.btnList as any[]
			if (list.length > 0) {
				this.expanded = !this.expanded
				this.$emit('click', { index: 0 })
				return
			}
			this.$emit('click', { index: 0 })
		},
		onSubTap(idx: number) {
			this.$emit('click', { index: idx + 1 })
			this.expanded = false
		}
	}
})

export default __sfc__
function GenUniModulesMUnixComponentsMFabMFabRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_m_icon = resolveEasyComponent("m-icon",_easycom_m_icon)

  return _cE("view", null, [
    isTrue(_ctx.expanded && _ctx.maskClosable)
      ? _cE("view", _uM({
          key: 0,
          class: "m-fab__mask",
          style: _nS(_uM({ zIndex: _ctx.maskZIndex })),
          onClick: _ctx.collapse
        }), null, 12 /* STYLE, PROPS */, ["onClick"])
      : _cC("v-if", true),
    _cE("view", _uM({
      class: "m-fab__wrap",
      style: _nS(_ctx.wrapStyle)
    }), [
      _ctx.btnList.length > 0
        ? _cE("view", _uM({
            key: 0,
            class: "m-fab__subs"
          }), [
            _cE(Fragment, null, RenderHelpers.renderList(_ctx.btnList, (btn, idx, __index, _cached): any => {
              return withDirectives(_cE("view", _uM({
                key: idx,
                class: "m-fab__sub",
                style: _nS(_ctx.subStyle(btn)),
                onClick: withModifiers(() => {_ctx.onSubTap(idx)}, ["stop"])
              }), [
                _ctx.subImg(btn) !== ''
                  ? _cE("image", _uM({
                      key: 0,
                      class: "m-fab__sub-img",
                      src: _ctx.subImg(btn),
                      mode: "aspectFit"
                    }), null, 8 /* PROPS */, ["src"])
                  : _cC("v-if", true),
                _cE("text", _uM({
                  class: "m-fab__sub-text",
                  style: _nS(_uM({ color: _ctx.subColor(btn), 'font-size': _ctx.subFontSize(btn) + 'rpx' }))
                }), _tD(_ctx.subText(btn)), 5 /* TEXT, STYLE */)
              ], 12 /* STYLE, PROPS */, ["onClick"]), [
                [vShow, _ctx.expanded]
              ])
            }), 128 /* KEYED_FRAGMENT */)
          ])
        : _cC("v-if", true),
      _cE("view", _uM({
        class: _nC(_ctx.mainDragClass),
        style: _nS(_ctx.mainStyle),
        onClick: _ctx.onMainTap,
        onTouchstart: withModifiers(_ctx.onDragStart, ["stop"]),
        onTouchmove: withModifiers(_ctx.onDragMove, ["stop","prevent"]),
        onTouchend: _ctx.onDragEnd,
        onTouchcancel: _ctx.onDragEnd
      }), [
        isTrue(_ctx.custom)
          ? _cE("view", _uM({
              key: 0,
              class: "m-fab__main-child"
            }), [
              renderSlot(_ctx.$slots, "default")
            ])
          : _ctx.iconName !== ''
            ? _cE("view", _uM({
                key: 1,
                class: "m-fab__main-child"
              }), [
                _cV(_component_m_icon, _uM({
                  name: _ctx.iconName,
                  size: _ctx.iconSize,
                  color: _ctx.color
                }), null, 8 /* PROPS */, ["name", "size", "color"])
              ])
            : _cE("text", _uM({
                key: 2,
                class: "m-fab__main-child m-fab__plus",
                style: _nS(_uM({ color: _ctx.color }))
              }), "+", 4 /* STYLE */)
      ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["onClick", "onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel"])
    ], 4 /* STYLE */)
  ])
}
export type MFabComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMFabMFabStyles = [_uM([["m-fab__mask", _pS(_uM([["position", "fixed"], ["left", 0], ["right", 0], ["top", 0], ["bottom", 0], ["backgroundColor", "rgba(0,0,0,0.2)"]]))], ["m-fab__subs", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-end"], ["marginBottom", "24rpx"]]))], ["m-fab__sub", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["paddingTop", "16rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "16rpx"], ["paddingLeft", "28rpx"], ["borderTopLeftRadius", "40rpx"], ["borderTopRightRadius", "40rpx"], ["borderBottomRightRadius", "40rpx"], ["borderBottomLeftRadius", "40rpx"], ["marginBottom", "16rpx"]]))], ["m-fab__sub-img", _pS(_uM([["width", "40rpx"], ["height", "40rpx"], ["marginRight", "12rpx"]]))], ["m-fab__sub-text", _pS(_uM([["fontSize", "28rpx"]]))], ["m-fab__main", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["m-fab__main-child", _uM([[".m-fab__main--drag-pass>", _uM([["pointerEvents", "none"]])]])], ["m-fab__plus", _pS(_uM([["fontSize", "64rpx"], ["lineHeight", 1]]))]])]

import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
