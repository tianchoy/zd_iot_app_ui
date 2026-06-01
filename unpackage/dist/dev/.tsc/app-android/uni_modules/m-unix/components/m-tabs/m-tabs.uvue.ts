
import { PropType } from 'vue'

type TabItem = UTSJSONObject

const __sfc__ = defineComponent({
	name: 'mTabs',
	emits: ['change'],
	props: {
		tabs: {
			type: Array,
			default(): any[] {
				return []
			}
		},
		field: {
			type: String,
			default: 'name'
		},
		badgeField: {
			type: String,
			default: 'num'
		},
		height: {
			type: Number,
			default: 80
		},
		padding: {
			type: Number,
			default: 30
		},
		backgroundColor: {
			type: String,
			default: '#FFFFFF'
		},
		isFixed: {
			type: Boolean,
			default: false
		},
		top: {
			type: Number,
			default: 0
		},
		unlined: {
			type: Boolean,
			default: false
		},
		currentTab: {
			type: Number,
			default: 0
		},
		isSlider: {
			type: Boolean,
			default: true
		},
		sliderWidth: {
			type: Number,
			default: 68
		},
		sliderHeight: {
			type: Number,
			default: 6
		},
		sliderBgColor: {
			type: String,
			default: '#5677fc'
		},
		sliderRadius: {
			type: String,
			default: '50rpx'
		},
		itemWidth: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: '#666666'
		},
		selectedColor: {
			type: String,
			default: '#5677fc'
		},
		size: {
			type: Number,
			default: 28
		},
		bold: {
			type: Boolean,
			default: false
		},
		scale: {
			type: [Number, String],
			default: 1
		},
		badgeColor: {
			type: String,
			default: '#ffffff'
		},
		badgeBgColor: {
			type: String,
			default: '#F74D54'
		},
		zIndex: {
			type: [Number, String],
			default: 996
		},
		customStyle: {
			type: Object as PropType<UTSJSONObject>,
			default: () => ({})
		},
		itemStyle: {
			type: Object as PropType<UTSJSONObject>,
			default: () => ({})
		},
		// ========== 新增选中项样式参数 ==========
		selectedBgColor: {
			type: String,
			default: ''
		},
		selectedBorderColor: {
			type: String,
			default: ''
		},
		selectedBorderWidth: {
			type: String,
			default: '0'
		},
		selectedBorderRadius: {
			type: String,
			default: '0'
		},
		// 未选中项背景色（可选）
		unselectedBgColor: {
			type: String,
			default: ''
		},
		// 是否显示选中项边框
		showSelectedBorder: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		tabCount(): number {
			return (this.tabs as any[]).length
		},
		itemWidthComputed(): string {
			const iw = this.itemWidth as string
			if (iw != null && iw.length > 0) {
				return iw
			}
			const n = this.tabCount
			if (n <= 0) {
				return '25%'
			}
			return (100 / n) + '%'
		},
		rootStyle(): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 203, 10), } as UTSJSONObject
			const z = this.zIndex
			st['zIndex'] = typeof z === 'number' ? z : parseInt('' + z)
			if (this.isFixed) {
				st['position'] = 'fixed'
				st['left'] = '0'
				st['right'] = '0'
				st['top'] = (this.top as number) + 'px'
			}
			if (this.customStyle != null) {
				Object.assign(st, this.customStyle)
			}
			return st
		},
		sliderAnchorStyle(): UTSJSONObject {
			const n = this.tabCount
			if (n <= 0) {
				return {}
			}
			let i = this.currentTab as number
			if (i < 0) {
				i = 0
			}
			if (i >= n) {
				i = n - 1
			}
			const pct = ((i + 0.5) / n) * 100
			return {
				left: pct + '%',
				transition: 'left 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)'
			}
		}
	},
	methods: {
		tabLabel(tab: TabItem): string {
			const k = this.field as string
			const v = tab[k]
			return v == null ? '' : '' + v
		},
		badgeText(tab: TabItem): string {
			const k = this.badgeField as string
			const v = tab[k]
			if (v == null) {
				return ''
			}
			const s = '' + v
			if (s === '0' || s === '') {
				return ''
			}
			return s
		},
		tabDot(tab: TabItem): boolean {
			return tab['isDot'] === true
		},
		tabDisabled(tab: TabItem): boolean {
			return tab['disabled'] === true
		},
		// 计算每个选项卡内层的样式（支持选中/未选中背景色、边框）
		itemInnerStyle(idx: number, tab: TabItem): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 262, 10), } as UTSJSONObject
			const isSelected = (this.currentTab as number) === idx
			const isDisabled = this.tabDisabled(tab)
			
			// 基础样式（合并用户传入的 itemStyle）
			if (this.itemStyle != null) {
				Object.assign(st, this.itemStyle)
			}
			
			if (isDisabled) {
				// 禁用状态样式
				st['opacity'] = '0.5'
			} else if (isSelected) {
				// 选中状态样式
				if (this.selectedBgColor && this.selectedBgColor !== '') {
					st['backgroundColor'] = this.selectedBgColor
				}
				if (this.showSelectedBorder && this.selectedBorderColor) {
					st['borderColor'] = this.selectedBorderColor
					st['borderWidth'] = this.selectedBorderWidth
					st['borderStyle'] = 'solid'
				}
				if (this.selectedBorderRadius && this.selectedBorderRadius !== '0') {
					st['borderRadius'] = this.selectedBorderRadius
				}
			} else {
				// 未选中状态样式
				if (this.unselectedBgColor && this.unselectedBgColor !== '') {
					st['backgroundColor'] = this.unselectedBgColor
				}
			}
			
			return st
		},
		textStyle(idx: number, tab: TabItem): UTSJSONObject {
			const st = { __$originalPosition: new UTSSourceMapPosition("st", "uni_modules/m-unix/components/m-tabs/m-tabs.uvue", 297, 10), } as UTSJSONObject
			const sel = (this.currentTab as number) === idx
			const dis = this.tabDisabled(tab)
			
			// 字体颜色（优先使用选中色，支持禁用色）
			if (dis) {
				st['color'] = '#cccccc'
			} else if (sel) {
				// 如果传入了 selectedColor 则使用，否则保持原逻辑
				st['color'] = this.selectedColor as string
			} else {
				st['color'] = this.color as string
			}
			
			st['font-size'] = (this.size as number) + 'rpx'
			
			if (this.bold && sel) {
				st['font-weight'] = 'bold'
			}
			
			if (sel) {
				const sc = this.scale
				const f = typeof sc === 'number' ? sc as number : parseFloat('' + sc)
				if (!isNaN(f) && f !== 1) {
					st['transform'] = 'scale(' + f + ')'
				}
			}
			return st
		},
		onTabTap(idx: number, tab: TabItem) {
			if (this.tabDisabled(tab)) {
				return
			}
			this.$emit('change', { index: idx, item: tab })
		}
	}
})

export default __sfc__
function GenUniModulesMUnixComponentsMTabsMTabsRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["m-tabs", _uM({ 'm-tabs--fixed': _ctx.isFixed })]),
    style: _nS(_ctx.rootStyle)
  }), [
    _cE("view", _uM({
      class: "m-tabs__inner",
      style: _nS(_uM({ height: _ctx.height + 'rpx', paddingLeft: _ctx.padding + 'rpx', paddingRight: _ctx.padding + 'rpx', backgroundColor: _ctx.backgroundColor }))
    }), [
      _cE(Fragment, null, RenderHelpers.renderList(_ctx.tabs, (tab, idx, __index, _cached): any => {
        return _cE("view", _uM({
          key: idx,
          class: "m-tabs__item",
          style: _nS(_uM({ width: _ctx.itemWidthComputed})),
          onClick: () => {_ctx.onTabTap(idx, tab)}
        }), [
          _cE("view", _uM({
            class: "m-tabs__item-inner",
            style: _nS(_ctx.itemInnerStyle(idx, tab))
          }), [
            _cE("text", _uM({
              class: "m-tabs__text",
              style: _nS(_ctx.textStyle(idx, tab))
            }), _tD(_ctx.tabLabel(tab)), 5 /* TEXT, STYLE */),
            _ctx.badgeText(tab) !== ''
              ? _cE("view", _uM({
                  key: 0,
                  class: "m-tabs__badge-wrap"
                }), [
                  _cE("text", _uM({
                    class: "m-tabs__badge",
                    style: _nS(_uM({ color: _ctx.badgeColor, backgroundColor: _ctx.badgeBgColor }))
                  }), _tD(_ctx.badgeText(tab)), 5 /* TEXT, STYLE */)
                ])
              : isTrue(_ctx.tabDot(tab))
                ? _cE("view", _uM({
                    key: 1,
                    class: "m-tabs__dot",
                    style: _nS(_uM({ backgroundColor: _ctx.badgeBgColor }))
                  }), null, 4 /* STYLE */)
                : _cC("v-if", true)
          ], 4 /* STYLE */)
        ], 12 /* STYLE, PROPS */, ["onClick"])
      }), 128 /* KEYED_FRAGMENT */),
      isTrue(_ctx.isSlider && _ctx.tabCount > 0)
        ? _cE("view", _uM({
            key: 0,
            class: "m-tabs__slider-anchor",
            style: _nS(_ctx.sliderAnchorStyle)
          }), [
            _cE("view", _uM({
              class: "m-tabs__slider",
              style: _nS(_uM({ backgroundColor: _ctx.sliderBgColor, height: _ctx.sliderHeight + 'rpx', borderRadius: _ctx.sliderRadius, width: _ctx.sliderWidth + 'rpx' }))
            }), null, 4 /* STYLE */)
          ], 4 /* STYLE */)
        : _cC("v-if", true)
    ], 4 /* STYLE */),
    isTrue(!_ctx.unlined)
      ? _cE("view", _uM({
          key: 0,
          class: "m-tabs__line"
        }))
      : _cC("v-if", true)
  ], 6 /* CLASS, STYLE */)
}
export type MTabsComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesMUnixComponentsMTabsMTabsStyles = [_uM([["m-tabs", _pS(_uM([["width", "100%"], ["position", "relative"], ["boxSizing", "border-box"]]))], ["m-tabs__inner", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "stretch"], ["width", "100%"], ["boxSizing", "border-box"], ["position", "relative"]]))], ["m-tabs__item", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["boxSizing", "border-box"], ["position", "relative"], ["zIndex", 2]]))], ["m-tabs__item-inner", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "relative"], ["paddingTop", "8rpx"], ["paddingRight", "4rpx"], ["paddingBottom", "8rpx"], ["paddingLeft", "4rpx"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["transitionProperty", "all"], ["transitionDuration", "0.3s"], ["transitionTimingFunction", "ease"]]))], ["m-tabs__text", _pS(_uM([["lineHeight", 1.2]]))], ["m-tabs__badge-wrap", _pS(_uM([["position", "absolute"], ["top", "-4rpx"], ["right", "-16rpx"]]))], ["m-tabs__badge", _pS(_uM([["fontSize", "20rpx"], ["paddingTop", "2rpx"], ["paddingRight", "8rpx"], ["paddingBottom", "2rpx"], ["paddingLeft", "8rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["minWidth", "28rpx"], ["textAlign", "center"]]))], ["m-tabs__dot", _pS(_uM([["position", "absolute"], ["top", 0], ["right", "-6rpx"], ["width", "12rpx"], ["height", "12rpx"], ["borderTopLeftRadius", "50%"], ["borderTopRightRadius", "50%"], ["borderBottomRightRadius", "50%"], ["borderBottomLeftRadius", "50%"]]))], ["m-tabs__slider-anchor", _pS(_uM([["position", "absolute"], ["bottom", 0], ["left", 0], ["transform", "translateX(-50%)"], ["zIndex", 1], ["pointerEvents", "none"]]))], ["m-tabs__slider", _pS(_uM([["marginTop", "4rpx"]]))], ["m-tabs__line", _pS(_uM([["height", "1rpx"], ["backgroundColor", "#eeeeee"], ["width", "100%"]]))], ["@TRANSITION", _uM([["m-tabs__item-inner", _uM([["property", "all"], ["duration", "0.3s"], ["timingFunction", "ease"]])]])]])]
