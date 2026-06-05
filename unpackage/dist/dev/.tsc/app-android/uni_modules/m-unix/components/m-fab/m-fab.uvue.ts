
type FabBtn = UTSJSONObject

class TouchPoint {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

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
			default: 20
		},
		bottom: {
			type: [Number, String],
			default: 150
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
		icon: {
			type: String,
			default: ''
		},
		iconSize: {
			type: [Number, String],
			default: 52
		},
		draggable: {
			type: Boolean,
			default: true  // 默认启用拖拽
		},
		snapEdge: {
			type: Boolean,
			default: true
		},
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
			// 拖拽相关
			touchStartX: 0 as number,
			touchStartY: 0 as number,
			touchStartLeft: 0 as number,
			touchStartTop: 0 as number,
			isDragging: false as boolean,
			hasMoved: false as boolean,  // 是否发生了移动
			moveDistance: 0 as number,    // 移动距离
			clickTimer: -1 as number,      // 点击延迟定时器
		}
	},
	computed: {
		safeBtnList(): UTSJSONObject[] {
			const list = this.btnList as UTSJSONObject[] | null
			return list == null ? [] : list
		},
		iconName(): string {
			const s = this.icon as string
			if (s == null) return ''
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
			// 简化样式，统一使用绝对定位
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 193, 10), } as UTSJSONObject
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
		},
		mainStyle(): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 206, 10), } as UTSJSONObject
			st['width'] = '' + this.width + 'rpx'
			st['height'] = '' + this.height + 'rpx'
			st['borderRadius'] = this.radius as string
			st['backgroundColor'] = this.bgColor as string
			// 拖拽时添加过渡效果
			if (!this.isDragging) {
				st['transition'] = 'left 0.2s ease, top 0.2s ease'
			}
			return st
		},
		mainDragClass(): string[] {
			const out = [] as string[]
			out.push('m-fab__main')
			if (this.isDragging) {
				out.push('m-fab__main--dragging')
			}
			return out
		}
	},
	mounted() {
		this.initPosition()
		this.$nextTick(() => {
			this.measureWrapSize()
		})
	},
	methods: {
		// 初始化位置
		initPosition() {
			if (!(this.draggable as boolean)) {
				// 如果不支持拖拽，使用传入的 left/right/bottom/top
				const sys = uni.getSystemInfoSync()
				this.winW = sys.windowWidth as number
				this.winH = sys.windowHeight as number
				
				const fabW = uni.rpx2px(parseInt(this.width as string))
				const fabH = uni.rpx2px(parseInt(this.height as string))
				const right = uni.rpx2px(parseInt(this.right as string))
				const bottom = uni.rpx2px(parseInt(this.bottom as string))
				
				this.dragLeftPx = this.winW - fabW - right
				this.dragTopPx = this.winH - fabH - bottom
			} else {
				// 拖拽模式，从 props 初始化位置
				const sys = uni.getSystemInfoSync()
				this.winW = sys.windowWidth as number
				this.winH = sys.windowHeight as number
				
				const fabW = uni.rpx2px(parseInt(this.width as string))
				const fabH = uni.rpx2px(parseInt(this.height as string))
				
				// 默认右下角
				const right = uni.rpx2px(parseInt(this.right as string))
				const bottom = uni.rpx2px(parseInt(this.bottom as string))
				
				this.dragLeftPx = this.winW - fabW - right
				this.dragTopPx = this.winH - fabH - bottom
			}
		},
		
		measureWrapSize() {
			const self = this
			try {
				const q = uni.createSelectorQuery().in(self as any)
				q.select('.m-fab__wrap')
					.boundingClientRect((rect: any) => {
						if (rect == null) return
						const data = rect as UTSJSONObject
						const w = data['width'] as number
						const h = data['height'] as number
						if (w > 0 && h > 0) {
							self.wrapWpx = w
							self.wrapHpx = h
						}
					})
					.exec()
			} catch (_e) {}
		},
		
		// 吸边
		applySnap() {
			if (!(this.snapEdge as boolean)) return
			
			const pad = uni.rpx2px(this.snapPaddingRpx())
			const w = this.wrapWpx > 0 ? this.wrapWpx : uni.rpx2px(parseInt(this.width as string))
			const currentCenter = this.dragLeftPx + w / 2
			
			// 吸附到左边或右边
			if (currentCenter < this.winW / 2) {
				this.dragLeftPx = pad
			} else {
				this.dragLeftPx = this.winW - w - pad
			}
			
			// 限制上下边界
			const h = this.wrapHpx > 0 ? this.wrapHpx : uni.rpx2px(parseInt(this.height as string))
			this.dragTopPx = Math.max(pad, Math.min(this.dragTopPx, this.winH - h - pad))
		},
		
		snapPaddingRpx(): number {
			const sp = this.snapPadding as number | string
			const n = typeof sp === 'number' ? sp as number : parseInt('' + sp)
			return isNaN(n) ? 16 : n
		},
		
		// 获取触摸点坐标
		getTouchPoint(e: any): TouchPoint | null {
			const event = e as UTSJSONObject
			const touches = event['touches'] as any[] | null
			if (touches == null || touches.length == 0) return null
			const touch = touches[0] as UTSJSONObject
			let x = touch['clientX'] as number | null
			let y = touch['clientY'] as number | null
			if (x == null) x = touch['pageX'] as number | null
			if (y == null) y = touch['pageY'] as number | null
			return new TouchPoint(x == null ? 0 : x, y == null ? 0 : y)
		},
		
		// 触摸开始
		onTouchStart(e: any) {
			if (!(this.draggable as boolean)) {
				// 不可拖拽时，直接触发点击
				this.onClick()
				return
			}
			
			const point = this.getTouchPoint(e)
			if (point == null) return
			
			this.touchStartX = point!!.x
			this.touchStartY = point!!.y
			this.touchStartLeft = this.dragLeftPx
			this.touchStartTop = this.dragTopPx
			this.hasMoved = false
			this.moveDistance = 0
			
			// 清除之前的定时器
			if (this.clickTimer !== -1) {
				clearTimeout(this.clickTimer)
				this.clickTimer = -1
			}
		},
		
		// 触摸移动
		onTouchMove(e: any) {
			if (!(this.draggable as boolean)) return
			
			const point = this.getTouchPoint(e)
			if (point == null) return
			
			const deltaX = point!!.x - this.touchStartX
			const deltaY = point!!.y - this.touchStartY
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
			
			// 移动超过 10px 才认为是拖拽
			if (distance > 10) {
				if (!this.hasMoved) {
					this.hasMoved = true
					this.isDragging = true
				}
				this.moveDistance = distance
				
				// 更新位置
				let newLeft = this.touchStartLeft + deltaX
				let newTop = this.touchStartTop + deltaY
				
				// 边界限制
				const pad = uni.rpx2px(this.snapPaddingRpx())
				const w = this.wrapWpx > 0 ? this.wrapWpx : uni.rpx2px(parseInt(this.width as string))
				const h = this.wrapHpx > 0 ? this.wrapHpx : uni.rpx2px(parseInt(this.height as string))
				
				newLeft = Math.max(pad, Math.min(newLeft, this.winW - w - pad))
				newTop = Math.max(pad, Math.min(newTop, this.winH - h - pad))
				
				this.dragLeftPx = newLeft
				this.dragTopPx = newTop
				
			}
		},
		
		// 触摸结束
		onTouchEnd(e: any) {
			if (!(this.draggable as boolean)) return
			
			// 如果是拖拽操作
			if (this.hasMoved && this.moveDistance > 10) {
				this.isDragging = false
				this.applySnap()
				
				// 触发 dragend 事件
				this.$emit('dragend', {
					leftPx: this.dragLeftPx,
					topPx: this.dragTopPx
				} as UTSJSONObject)
			} 
			// 如果没有移动或移动距离很小，认为是点击
			else if (!this.hasMoved || this.moveDistance <= 10) {
				// 延迟执行点击，避免与拖拽结束冲突
				this.clickTimer = setTimeout(() => {
					this.onClick()
					this.clickTimer = -1
				}, 50)
			}
			
			// 重置状态
			setTimeout(() => {
				this.hasMoved = false
				this.moveDistance = 0
				this.isDragging = false
			}, 100)
		},
		
		// 触摸取消
		onTouchCancel(e: any) {
			if (this.clickTimer !== -1) {
				clearTimeout(this.clickTimer)
				this.clickTimer = -1
			}
			this.hasMoved = false
			this.moveDistance = 0
			this.isDragging = false
		},
		
		// 点击处理
		onClick() {
			const list = this.btnList as any[]
			if (list.length > 0) {
				this.expanded = !this.expanded
				this.$emit('click', { index: 0 })
				return
			}
			this.$emit('click', { index: 0 })
		},
		
		// 子菜单点击
		onSubTap(idx: number) {
			this.$emit('click', { index: idx + 1 })
			this.expanded = false
		},
		
		// 收起菜单
		collapse() {
			this.expanded = false
		},
		
		// 子菜单文本
		subText(btn: FabBtn): string {
			const k = this.textField as string
			const v = btn[k]
			return v == null ? '' : '' + v
		},
		
		// 子菜单图片
		subImg(btn: FabBtn): string {
			const k = this.imgField as string
			const v = btn[k]
			return v == null ? '' : '' + v
		},
		
		// 子菜单颜色
		subColor(btn: FabBtn): string {
			const c = btn['color']
			return c == null ? '#ffffff' : '' + c
		},
		
		// 子菜单字体大小
		subFontSize(btn: FabBtn): number {
			const fs = btn['fontSize']
			if (fs != null) {
				const n = typeof fs === 'number' ? fs as number : parseInt('' + fs)
				if (!isNaN(n)) return n
			}
			const d = this.size
			return typeof d === 'number' ? d as number : parseInt('' + d)
		},
		
		// 子菜单样式
		subStyle(btn: FabBtn): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-fab/m-fab.uvue", 484, 10), } as UTSJSONObject
			const bg = btn['bgColor']
			st['backgroundColor'] = bg == null ? '#16c2c2' : '' + bg
			return st
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
      _ctx.safeBtnList.length > 0
        ? _cE("view", _uM({
            key: 0,
            class: "m-fab__subs"
          }), [
            _cE(Fragment, null, RenderHelpers.renderList(_ctx.safeBtnList, (btn, idx, __index, _cached): any => {
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
        onTouchstart: withModifiers(_ctx.onTouchStart, ["stop"]),
        onTouchmove: withModifiers(_ctx.onTouchMove, ["stop","prevent"]),
        onTouchend: withModifiers(_ctx.onTouchEnd, ["stop"]),
        onTouchcancel: withModifiers(_ctx.onTouchCancel, ["stop"])
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
      ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel"])
    ], 4 /* STYLE */)
  ])
}
export type MFabComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMFabMFabStyles = [_uM([["m-fab__mask", _pS(_uM([["position", "fixed"], ["left", 0], ["right", 0], ["top", 0], ["bottom", 0], ["zIndex", 996]]))], ["m-fab__subs", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-end"], ["marginBottom", "24rpx"]]))], ["m-fab__sub", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["paddingTop", "16rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "16rpx"], ["paddingLeft", "28rpx"], ["borderTopLeftRadius", "40rpx"], ["borderTopRightRadius", "40rpx"], ["borderBottomRightRadius", "40rpx"], ["borderBottomLeftRadius", "40rpx"], ["marginBottom", "16rpx"]]))], ["m-fab__sub-img", _pS(_uM([["width", "40rpx"], ["height", "40rpx"], ["marginRight", "12rpx"]]))], ["m-fab__sub-text", _pS(_uM([["fontSize", "28rpx"]]))], ["m-fab__main", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["cursor", "pointer"], ["transitionProperty", "transform"], ["transitionDuration", "0.1s"], ["transitionTimingFunction", "ease"], ["transform:active", "scale(0.95)"]]))], ["m-fab__main--dragging", _pS(_uM([["opacity", 0.9], ["transitionProperty", "none"], ["transform:active", "none"]]))], ["m-fab__main-child", _pS(_uM([["pointerEvents", "none"]]))], ["m-fab__plus", _pS(_uM([["fontSize", "64rpx"], ["lineHeight", 1]]))], ["@TRANSITION", _uM([["m-fab__main", _uM([["property", "transform"], ["duration", "0.1s"], ["timingFunction", "ease"]])], ["m-fab__main--dragging", _uM([["property", "none"]])]])]])]

import _easycom_m_icon from '@/uni_modules/m-unix/components/m-icon/m-icon.uvue'
