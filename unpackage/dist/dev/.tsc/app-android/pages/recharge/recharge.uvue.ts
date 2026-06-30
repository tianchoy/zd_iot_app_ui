import _easycom_topNavBar from '@/components/topNavBar/topNavBar.uvue'
import _easycom_rice_tag from '@/uni_modules/rice-ui/components/rice-tag/rice-tag.uvue'
import _easycom_rice_progress from '@/uni_modules/rice-ui/components/rice-progress/rice-progress.uvue'
import _easycom_rice_button from '@/uni_modules/rice-ui/components/rice-button/rice-button.uvue'
import _easycom_rice_tabs from '@/uni_modules/rice-ui/components/rice-tabs/rice-tabs.uvue'
import _easycom_rice_popup from '@/uni_modules/rice-ui/components/rice-popup/rice-popup.uvue'
import { ref, computed } from 'vue';
	import { queryCardDetail, addOrder } from '@/api/http.uts';
	import type {RechargeData,PkgXcxVo} from '@/api/types'
	import { config , isWechat,isH5} from '@/common/config.uts';
	import Payment from '@/components/payment.uvue';
	
	
const __sfc__ = defineComponent({
  __name: 'recharge',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const showPopup = ref<boolean>(false);
	// 添加标记：是否正在支付流程中
	const isInPaymentProcess = ref<boolean>(false);
	// 是否显示返回按钮
	const showBack = ref<boolean>(true);
	
	// 计算流量使用百分比
	const percentage = computed<number>((): number => {
		const usedFlow = cardDetail.value?.usedPeriod;
		const totalFlow = cardDetail.value?.pkgFlow;
		
		// 如果没有数据，返回0
		if (!usedFlow || !totalFlow) {
			return 0;
		}
		
		const used = parseFloat(usedFlow);
		const total = parseFloat(totalFlow);
		
		// 避免除以0
		if (total === 0) {
			return 0;
		}
		
		// 计算百分比，保留整数
		let percent = (used / total) * 100;
		
		// 限制百分比在0-100之间
		percent = Math.min(100, Math.max(0, percent));
		
		return Math.round(percent);
	});
	
	const active = ref<number>(0);
	const tabs = ref<Array<{name: string}>>([
		{
			name: '套餐包'
		},
		{
			name: '加油包',
		}
	]);
	
	// 套餐包列表
	const packageList = ref<Array<PkgXcxVo>>([]);
	// 加油包列表
	const refillList = ref<Array<PkgXcxVo>>([]);
	
	// 选中的套餐包索引
	const selectedPackageIndex = ref<number>(0);
	// 选中的加油包索引
	const selectedRefillIndex = ref<number>(0);
	// 选中的套餐包
	const selectedPackage = ref<PkgXcxVo | null>(null);
	
	// 当前选中的套餐/加油包
	const currentPackage = computed<PkgXcxVo | null>((): PkgXcxVo | null => {
		if (active.value === 0) {
			return packageList.value[selectedPackageIndex.value] ?? null;
		}
		return refillList.value[selectedRefillIndex.value] ?? null;
	});
	
	// 当前价格（根据选中的套餐/加油包计算）
	const currentPrice = computed<string>((): string => {
		if (active.value === 0) {
			const item = packageList.value[selectedPackageIndex.value];
			return item ? item.sellingPrice : '0.00';
		} else {
			const item = refillList.value[selectedRefillIndex.value];
			return item ? item.sellingPrice : '0.00';
		}
	});
	
	// 根据 pkgCategory 分类套餐和加油包
	const classifyPackages = (packages: Array<PkgXcxVo>) => {
		const packagesList: Array<PkgXcxVo> = [];
		const refillsList: Array<PkgXcxVo> = [];
		
		packages.forEach((item, index) => {
			// pkgCategory: 3为套餐，4为加油包
			if (item.pkgCategory == '3') {
				packagesList.push(item);
			} else if (item.pkgCategory == '4') {
				refillsList.push(item);
			}
		});
		
		packageList.value = packagesList;
		refillList.value = refillsList;
		
		// 重置选中索引
		selectedPackageIndex.value = 0;
		selectedRefillIndex.value = 0;
		
	};

	const getOrderStatusType = (status: string): string => {
		const typeMap: Record<string, string> = {
			'在用': 'success',
			'停机': 'error',
		}
		return typeMap[status] || 'warning'
	}
	
	const changeTab = (e: {index: number}) => {
		active.value = e.index;
	}
	
	const selectPackage = (index: number, item: PkgXcxVo) => {
		selectedPackageIndex.value = index;
		selectedPackage.value = item;
	}
	
	const selectRefill = (index: number) => {
		selectedRefillIndex.value = index;
	}
	
	// 选择支付方式
	const choosePayment = () => {
		if (active.value === 0 && packageList.value.length === 0) {
			uni.showToast({
				title: '暂无套餐包可选',
				icon: 'none'
			});
			return;
		}
		if (active.value === 1 && refillList.value.length === 0) {
			uni.showToast({
				title: '暂无加油包可选',
				icon: 'none'
			});
			return;
		}
		showPopup.value = true;
	}
	
	// 取消支付
	const handleCancelPayment = () => {
		showPopup.value = false;
	}

	const orderId = ref<string>('')
	const payChannelId = ref<string>('')
	const toPay = (data:any) => {
		if(!data) return
		const res = data as any
		orderId.value = res.orderId
		payChannelId.value = res.payChannelId
		// 设置正在支付流程中
		isInPaymentProcess.value = true
		
		if(res.payWxType == 'wechat_pay'){
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.timeStamp,
				nonceStr: res.nonceStr,
				package: res.package,
				paySign: res.paySign,
				signType: res.signType,

				success: (res) => {
					console.log('微信支付成功',res, " at pages/recharge/recharge.uvue:300")
					uni.hideLoading()
					uni.redirectTo({
						url: '/pages/paySuccess/paySuccess?orderId=' + orderId.value + '&payChannelId=' + payChannelId.value
					})
				},
				fail: (res) => {
					uni.hideLoading()
					uni.showToast({
						title: "微信支付失败，请您重新支付",
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/orderDetail/orderDetail?orderNo=' + orderId.value
						});
					}, 1000);
					// 支付失败，重置标记
					isInPaymentProcess.value = false
				},
			})
		}
		else if(res.payWxType == 'allin_pay'){
			if(res.payWxClass == '0'){
				uni.requestPayment({
					timeStamp: res.timeStamp,
					nonceStr: res.nonceStr,
					package: res.package,
					paySign: res.paySign,
					signType: res.signType,
					success: function (res) {
						console.log('通联支付成功',res, " at pages/recharge/recharge.uvue:332")
						uni.hideLoading()
						uni.redirectTo({
							url: '/pages/paySuccess/paySuccess?orderId=' + orderId.value + '&payChannelId=' + payChannelId.value
						})
					},
					fail: function (err) {
						uni.hideLoading()
						uni.showToast({
							title: "通联支付失败，请您重新支付",
							icon: 'none',
							duration: 1000
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/orderDetail/orderDetail?orderNo=' + orderId.value
							});
						}, 1000);
						// 支付失败，重置标记
						isInPaymentProcess.value = false
					},
				});
			}else{
				let param = {__$originalPosition: new UTSSourceMapPosition("param", "pages/recharge/recharge.uvue", 355, 9),
					cusid: res.cusid,
					appid: res.appid,
					orgid: res.orgid,
					version: res.version,
					trxamt: res.trxamt,
					reqsn: res.reqsn,
					notify_url: res.notify_url,
					body: res.body,
					remark: res.remark,
					randomstr: res.randomstr,
					paytype: res.paytype,
					signtype: res.signtype,
					sign: res.sign,
				}

				wx.navigateToMiniProgram({
					appId: config.api.auth.appID,
					extraData: param,
					success(res) { 
						console.log('支付成功:', res, " at pages/recharge/recharge.uvue:375");
					},
					fail(res) {
						console.log('支付失败:', res, " at pages/recharge/recharge.uvue:378");
						uni.hideLoading()
						// 支付失败，重置标记
						isInPaymentProcess.value = false
					},
				})
			}
		}
	}
	
	// 确认支付
	const handleConfirmPayment =  async (e: any) => {
		uni.showLoading({
			title: '支付中...'
		})

		showPopup.value = false;
		// 获取当前选中的套餐信息
		const currentItem = active.value === 0 
			? packageList.value[selectedPackageIndex.value]
			: refillList.value[selectedRefillIndex.value];

		// 处理确认逻辑
		try {
			const res = await addOrder({
				pkgId: currentItem.pkgId,
				rechargeNo: cardNumber.value,
			})
			if(res.code == 200){
				toPay(res.data)
			} else {
				uni.hideLoading()
				uni.showToast({
					title: res.msg || '支付失败',
					icon: 'none'
				})
			}
		} catch (error) {
			console.error('添加订单失败:', error, " at pages/recharge/recharge.uvue:416")
			uni.hideLoading()
			uni.showToast({
				title: '添加订单失败',
				icon: 'none'
			})
		}
	}
	
	const onPopupClose = () => {
		console.log('弹窗关闭', " at pages/recharge/recharge.uvue:426");
	}
	
	const goBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	
	// 跳转我的套餐
	const toMyPackage = () => {
		uni.navigateTo({
			url: '/pages/myPkg/myPkg?card_number=' + cardNumber.value
		})
	}
	
	// 跳转订单记录
	const toOrderRecord = () => {
		uni.navigateTo({
			url: '/pages/orderRecord/orderRecord?rechargeNo=' + cardNumber.value
		})
	}
	
	/** 卡详情 */
	const cardDetail = ref<RechargeData | null>(null)
	
	const getCardDetail = async (cardNumber: string,country: string) => {
		try {
			const res = await queryCardDetail(cardNumber, country,'0')
			if(res.code == 200){
				cardDetail.value = res.data as any
				if (res.data?.pkgXcxVos && res.data.pkgXcxVos.length > 0) {
					classifyPackages(res.data.pkgXcxVos as Array<PkgXcxVo>)
				}
			}
		} catch (error) {
			console.error('获取卡片详情失败:', error, " at pages/recharge/recharge.uvue:462")
			uni.showToast({
				title: '获取卡片信息失败',
				icon: 'none'
			})
		}
	}
	
	const cardNumber = ref<string>('')
	const country = ref<string>('')
	onLoad((options: UTSJSONObject) => {
		console.log('options:', options, " at pages/recharge/recharge.uvue:473")
		const opt = options as any
		const cardNumberValue = opt.cardNumber
		const countryValue = opt.country
		const from = opt.from
		
		showBack.value = isH5() && from == 'h5Search'
		
		if (cardNumberValue) {
			cardNumber.value = cardNumberValue
			country.value = countryValue ?? ''
			getCardDetail(cardNumber.value, country.value)
		} else {
			console.error('未获取到卡片号码', " at pages/recharge/recharge.uvue:486")
			uni.showToast({
				title: '卡片号码不存在',
				icon: 'none'
			})
		}
	})

	onShow(() => {
		// 只有在支付流程中才处理支付回调
		if (!isInPaymentProcess.value) {
			return
		}
		
		let options = uni.getEnterOptionsSync();
		if (options.scene == '1038' &&
			options.referrerInfo.appId == config.api.auth.appID) {
			// 代表从收银台小程序返回
			let extraData = options.referrerInfo.extraData;
			if (!extraData) {
				uni.hideLoading()
				uni.showToast({
					title: "支付取消，请您重新支付",
					icon: 'none',
					duration: 1000
				});
				// 重置支付流程标记
				isInPaymentProcess.value = false
				return
			} else {
				if (extraData.code == 'success') {
					uni.hideLoading()
					uni.showToast({
						title: "支付成功",
						icon: 'success',
						duration: 1000,
						success() {
							// 重置支付流程标记
							isInPaymentProcess.value = false
							// 使用 redirectTo 替换当前页面，避免页面栈累积
							uni.redirectTo({
								url: '/pages/paySuccess/paySuccess?orderId=' + orderId.value + '&payChannelId=' + payChannelId.value
							})
						}
					});
				} else if (extraData.code == 'cancel') {
					uni.hideLoading()
					uni.showToast({
						title: "支付取消，请您重新支付",
						icon: 'none',
						duration: 1000
					});
					// 重置支付流程标记
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/orderDetail/orderDetail?orderNo=' + orderId.value
						});
					}, 1000);
					isInPaymentProcess.value = false
					return
				} else {
					uni.hideLoading()
					uni.showToast({
						title: "支付失败，请您重新支付",
						icon: 'none',
						duration: 1000
					});
					// 重置支付流程标记
					isInPaymentProcess.value = false
					return
				}
			}
		}
	})

return (): any | null => {

const _component_topNavBar = resolveEasyComponent("topNavBar",_easycom_topNavBar)
const _component_rice_tag = resolveEasyComponent("rice-tag",_easycom_rice_tag)
const _component_rice_progress = resolveEasyComponent("rice-progress",_easycom_rice_progress)
const _component_rice_button = resolveEasyComponent("rice-button",_easycom_rice_button)
const _component_rice_tabs = resolveEasyComponent("rice-tabs",_easycom_rice_tabs)
const _component_block = resolveComponent("block")
const _component_rice_popup = resolveEasyComponent("rice-popup",_easycom_rice_popup)

  return _cE(Fragment, null, [
    _cV(_component_topNavBar, _uM({
      title: "充值首页",
      "show-back": showBack.value,
      onBack: goBack,
      backgroundColor: "#f4f7fb",
      textColor: "#333",
      showCapsule: false
    }), null, 8 /* PROPS */, ["show-back"]),
    _cE("view", _uM({ class: "container" }), [
      _cE("view", _uM({ class: "card-info" }), [
        _cE("view", _uM({ class: "card-title" }), [
          _cE("text", _uM({ class: "title" }), "卡片信息"),
          _cV(_component_rice_tag, _uM({
            text: cardDetail.value?.statusStr || '未知',
            round: true,
            "plain-fill": "",
            size: "small",
            type: getOrderStatusType(cardDetail.value?.statusStr)
          }), null, 8 /* PROPS */, ["text", "type"])
        ]),
        isTrue(cardDetail.value?.rechargeNo)
          ? _cE("view", _uM({
              key: 0,
              class: "card-number"
            }), _tD(cardDetail.value?.rechargeNo || '未知'), 1 /* TEXT */)
          : _cC("v-if", true),
        _cE("view", _uM({ class: "info-list" }), [
          isTrue(cardDetail.value?.pkgName)
            ? _cE("view", _uM({
                key: 0,
                class: "info-item"
              }), [
                _cE("text", _uM({ class: "label" }), "当前套餐"),
                _cE("text", _uM({ class: "value" }), _tD(cardDetail.value?.pkgName || '未知'), 1 /* TEXT */)
              ])
            : _cC("v-if", true)
        ]),
        _cE("view", _uM({ class: "flow-box" }), [
          _cE("view", _uM({ class: "flow-label" }), [
            _cE("text", _uM({ class: "label" }), "流量信息"),
            _cE("text", _uM({ class: "value" }), "已用 " + _tD(cardDetail.value?.usedFlow || 0) + "GB / 剩余 " + _tD(cardDetail.value?.unUsedFlow || 0) + "GB / 总流量 " + _tD(cardDetail.value?.pkgFlow || 0) + "GB", 1 /* TEXT */)
          ]),
          _cV(_component_rice_progress, _uM({
            percentage: percentage.value,
            "show-text": ""
          }), null, 8 /* PROPS */, ["percentage"])
        ]),
        _cE("view", _uM({ class: "card-bottom" }), [
          _cV(_component_rice_button, _uM({
            class: "btn mr-24",
            onClick: toMyPackage
          }), _uM({
            default: withSlotCtx((): any[] => ["卡片套餐"]),
            _: 1 /* STABLE */
          })),
          _cV(_component_rice_button, _uM({
            class: "btn",
            onClick: toOrderRecord
          }), _uM({
            default: withSlotCtx((): any[] => ["订单记录"]),
            _: 1 /* STABLE */
          }))
        ])
      ]),
      _cE("view", _uM({ class: "pkg-box" }), [
        _cV(_component_rice_tabs, _uM({
          modelValue: active.value,
          "onUpdate:modelValue": $event => {(active).value = $event},
          "line-color": "#ffffff",
          list: tabs.value,
          "line-width": 0,
          "title-active-color": '#2563eb',
          "title-inactive-color": '#64748b',
          onChange: changeTab,
          customStyle: {height:'85rpx',padding:'10rpx',border:'1rpx solid #e5edf6'}
        }), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "list"]),
        _cE("view", _uM({ class: "pkg-content" }), [
          active.value === 0
            ? _cV(_component_block, _uM({ key: 0 }), _uM({
                default: withSlotCtx((): any[] => [
                  _cE(Fragment, null, RenderHelpers.renderList(packageList.value, (item, index, __index, _cached): any => {
                    return _cE("view", _uM({
                      key: item.pkgId || index,
                      class: _nC(["pkg-card", _uM({ 'pkg-card-selected': selectedPackageIndex.value === index })]),
                      onClick: () => {selectPackage(index,item)}
                    }), [
                      _cE("view", _uM({ class: "pkg-info" }), [
                        _cE("view", _uM({ class: "pkg-name" }), [
                          _cE("text", _uM({ class: "pkg-title" }), _tD(item.pkgName), 1 /* TEXT */),
                          isTrue(item.tag)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-tag"
                              }), _tD(item.tag), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ]),
                        _cE("view", _uM({ class: "pkg-desc" }), [
                          isTrue(item.pkgFlow)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-icon"
                              }), "流量 " + _tD(item.pkgFlow), 1 /* TEXT */)
                            : _cC("v-if", true),
                          isTrue(item.validityPeriod)
                            ? _cE("text", _uM({
                                key: 1,
                                class: "pkg-icon"
                              }), "有效期 " + _tD(item.validityPeriod) + _tD(item?.pkgType == '1' ? '天' : '个月'), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ])
                      ]),
                      _cE("view", _uM({ class: "pkg-price" }), [
                        _cE("view", _uM({ class: "price-wrapper" }), [
                          _cE("text", _uM({ class: "price-symbol" }), "¥"),
                          _cE("text", _uM({ class: "price-number" }), _tD(item.sellingPrice), 1 /* TEXT */)
                        ]),
                        isTrue(item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice)
                          ? _cE("view", _uM({
                              key: 0,
                              class: "price-original"
                            }), " ¥" + _tD(item.crossedOutPrice), 1 /* TEXT */)
                          : _cC("v-if", true)
                      ])
                    ], 10 /* CLASS, PROPS */, ["onClick"])
                  }), 128 /* KEYED_FRAGMENT */),
                  packageList.value.length == 0
                    ? _cE("view", _uM({
                        key: 0,
                        class: "empty-state"
                      }), "暂无套餐包")
                    : _cC("v-if", true)
                ]),
                _: 1 /* STABLE */
              }))
            : _cV(_component_block, _uM({ key: 1 }), _uM({
                default: withSlotCtx((): any[] => [
                  _cE(Fragment, null, RenderHelpers.renderList(refillList.value, (item, index, __index, _cached): any => {
                    return _cE("view", _uM({
                      key: item.pkgId || index,
                      class: _nC(["pkg-card", _uM({ 'pkg-card-selected': selectedRefillIndex.value == index })]),
                      onClick: () => {selectRefill(index)}
                    }), [
                      _cE("view", _uM({ class: "pkg-info" }), [
                        _cE("view", _uM({ class: "pkg-name" }), [
                          _cE("text", _uM({ class: "pkg-title" }), _tD(item.pkgName), 1 /* TEXT */),
                          isTrue(item.tag)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-tag"
                              }), _tD(item.tag), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ]),
                        _cE("view", _uM({ class: "pkg-desc" }), [
                          isTrue(item.pkgFlow)
                            ? _cE("text", _uM({
                                key: 0,
                                class: "pkg-icon"
                              }), "流量 " + _tD(item.pkgFlow), 1 /* TEXT */)
                            : _cC("v-if", true),
                          isTrue(item.validityPeriod)
                            ? _cE("text", _uM({
                                key: 1,
                                class: "pkg-icon"
                              }), "有效期 " + _tD(item.validityPeriod) + _tD(item?.pkgType == '1' ? '天' : '个月'), 1 /* TEXT */)
                            : _cC("v-if", true)
                        ])
                      ]),
                      _cE("view", _uM({ class: "pkg-price" }), [
                        _cE("view", _uM({ class: "price-wrapper" }), [
                          _cE("text", _uM({ class: "price-symbol" }), "¥"),
                          _cE("text", _uM({ class: "price-number" }), _tD(item.sellingPrice), 1 /* TEXT */)
                        ]),
                        isTrue(item.crossedOutPrice && item.crossedOutPrice != item.sellingPrice)
                          ? _cE("view", _uM({
                              key: 0,
                              class: "price-original"
                            }), " ¥" + _tD(item.crossedOutPrice), 1 /* TEXT */)
                          : _cC("v-if", true)
                      ])
                    ], 10 /* CLASS, PROPS */, ["onClick"])
                  }), 128 /* KEYED_FRAGMENT */),
                  refillList.value.length == 0
                    ? _cE("view", _uM({
                        key: 0,
                        class: "empty-state"
                      }), "暂无加油包")
                    : _cC("v-if", true)
                ]),
                _: 1 /* STABLE */
              }))
        ])
      ])
    ]),
    _cV(_component_rice_popup, _uM({
      show: showPopup.value,
      "onUpdate:show": $event => {(showPopup).value = $event},
      position: "bottom",
      onClose: onPopupClose
    }), _uM({
      default: withSlotCtx((): any[] => [
        _cV(unref(Payment), _uM({
          amount: currentPrice.value,
          onCancel: handleCancelPayment,
          onConfirm: handleConfirmPayment,
          cardNumber: cardDetail.value?.rechargeNo,
          productName: currentPackage.value?.pkgName,
          traffic: currentPackage.value?.pkgFlow,
          validityPeriod: currentPackage.value?.validityPeriod,
          pkgType: currentPackage.value?.pkgType
        }), null, 8 /* PROPS */, ["amount", "cardNumber", "productName", "traffic", "validityPeriod", "pkgType"])
      ]),
      _: 1 /* STABLE */
    }), 8 /* PROPS */, ["show", "onUpdate:show"]),
    isTrue(packageList.value.length > 0 || refillList.value.length > 0)
      ? _cE("view", _uM({
          key: 0,
          class: "bottom-box"
        }), [
          _cE("view", _uM({ class: "price-box" }), [
            _cE("text", _uM({ class: "price-label" }), "当前套餐金额"),
            _cE("text", _uM({ class: "price-value" }), "¥" + _tD(currentPrice.value), 1 /* TEXT */)
          ]),
          _cV(_component_rice_button, _uM({
            type: "primary",
            width: "300rpx",
            height: "110rpx",
            onClick: choosePayment,
            class: "btn"
          }), _uM({
            default: withSlotCtx((): any[] => ["去支付"]),
            _: 1 /* STABLE */
          }))
        ])
      : _cC("v-if", true)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
const GenPagesRechargeRechargeStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f4f7fb"]]))], ["card-info", _uM([[".container ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e2e8f0"], ["borderRightColor", "#e2e8f0"], ["borderBottomColor", "#e2e8f0"], ["borderLeftColor", "#e2e8f0"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", 0], ["marginRight", "24rpx"], ["marginBottom", 0], ["marginLeft", "24rpx"]])]])], ["card-title", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#333333"]])]])], ["title", _uM([[".container .card-info .card-title ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#333333"]])]])], ["card-number", _uM([[".container .card-info ", _uM([["color", "#47556A"], ["fontSize", "32rpx"], ["marginTop", "24rpx"]])]])], ["info-list", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "column"]])]])], ["info-item", _uM([[".container .card-info .info-list ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "14rpx"], ["paddingRight", 0], ["paddingBottom", "14rpx"], ["paddingLeft", 0]])]])], ["label", _uM([[".container .card-info .info-list .info-item ", _uM([["color", "#64748b"], ["marginRight", "20rpx"], ["fontSize", "24rpx"]])]])], ["value", _uM([[".container .card-info .info-list .info-item ", _uM([["fontWeight", "bold"], ["whiteSpace", "pre-wrap"], ["lineHeight", 1.5], ["fontSize", "24rpx"]])]])], ["flow-box", _uM([[".container .card-info ", _uM([["marginTop", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e8eef7"], ["borderRightColor", "#e8eef7"], ["borderBottomColor", "#e8eef7"], ["borderLeftColor", "#e8eef7"], ["borderTopLeftRadius", "16rpx"], ["borderTopRightRadius", "16rpx"], ["borderBottomRightRadius", "16rpx"], ["borderBottomLeftRadius", "16rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]])]])], ["flow-label", _uM([[".container .card-info .flow-box ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["fontSize", "24rpx"], ["color", "#64748b"], ["marginBottom", "12rpx"]])]])], ["card-bottom", _uM([[".container .card-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["marginTop", "24rpx"]])]])], ["btn", _uM([[".container .card-info .card-bottom ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])], ["pkg-box", _uM([[".container ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "24rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "24rpx"], ["paddingLeft", "24rpx"], ["marginTop", "24rpx"], ["marginRight", "24rpx"], ["marginBottom", "120rpx"], ["marginLeft", "24rpx"]])]])], ["pkg-content", _uM([[".container ", _uM([["marginTop", "24rpx"], ["marginRight", 0], ["marginBottom", 0], ["marginLeft", 0]])]])], ["pkg-card", _uM([[".container ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e7edf5"], ["borderRightColor", "#e7edf5"], ["borderBottomColor", "#e7edf5"], ["borderLeftColor", "#e7edf5"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "28rpx"], ["paddingRight", "24rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "24rpx"], ["marginBottom", "20rpx"], ["transitionProperty", "all"], ["transitionDuration", "0.2s"], ["transitionTimingFunction", "ease"]])]])], ["pkg-info", _uM([[".container .pkg-card ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])], ["pkg-name", _uM([[".container .pkg-card .pkg-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["marginBottom", "12rpx"], ["flexWrap", "wrap"]])]])], ["pkg-title", _uM([[".container .pkg-card .pkg-info .pkg-name ", _uM([["fontSize", "30rpx"], ["fontWeight", "bold"], ["color", "#1e293b"]])]])], ["pkg-tag", _uM([[".container .pkg-card .pkg-info .pkg-name ", _uM([["backgroundImage", "linear-gradient(135deg, #ff9a3c, #ff6b3c)"], ["backgroundColor", "rgba(0,0,0,0)"], ["color", "#ffffff"], ["fontSize", "20rpx"], ["paddingTop", "4rpx"], ["paddingRight", "16rpx"], ["paddingBottom", "4rpx"], ["paddingLeft", "16rpx"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["marginLeft", "12rpx"]])]])], ["pkg-desc", _uM([[".container .pkg-card .pkg-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["fontSize", "24rpx"], ["color", "#64748b"]])]])], ["pkg-icon", _uM([[".container .pkg-card .pkg-info .pkg-desc ", _uM([["display", "flex"], ["alignItems", "center"], ["paddingTop", "10rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "20rpx"], ["borderTopLeftRadius", "24rpx"], ["borderTopRightRadius", "24rpx"], ["borderBottomRightRadius", "24rpx"], ["borderBottomLeftRadius", "24rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f8fafc"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#e2e8f0"], ["borderRightColor", "#e2e8f0"], ["borderBottomColor", "#e2e8f0"], ["borderLeftColor", "#e2e8f0"], ["color", "#475569"], ["fontSize", "20rpx"], ["fontWeight", 700], ["marginRight", "20rpx"]])]])], ["pkg-price", _uM([[".container .pkg-card ", _uM([["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-end"]])]])], ["price-wrapper", _uM([[".container .pkg-card .pkg-price ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["price-symbol", _uM([[".container .pkg-card .pkg-price .price-wrapper ", _uM([["fontSize", "24rpx"], ["color", "#ef4444"], ["fontWeight", "bold"]])]])], ["price-number", _uM([[".container .pkg-card .pkg-price .price-wrapper ", _uM([["fontSize", "40rpx"], ["color", "#ef4444"], ["fontWeight", "bold"]])]])], ["price-original", _uM([[".container .pkg-card .pkg-price ", _uM([["fontSize", "22rpx"], ["color", "#94a3b8"], ["marginTop", "4rpx"], ["textDecoration", "line-through"]])]])], ["pkg-card-selected", _uM([[".container ", _uM([["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#3b82f6"], ["borderRightColor", "#3b82f6"], ["borderBottomColor", "#3b82f6"], ["borderLeftColor", "#3b82f6"], ["backgroundImage", "none"], ["backgroundColor", "#f8fbff"], ["boxShadow", "0 4rpx 12rpx rgba(59, 130, 246, 0.08)"]])]])], ["empty-state", _uM([[".container ", _uM([["textAlign", "center"], ["paddingTop", "60rpx"], ["paddingRight", "60rpx"], ["paddingBottom", "60rpx"], ["paddingLeft", "60rpx"], ["color", "#94a3b8"], ["fontSize", "28rpx"]])]])], ["bottom-box", _pS(_uM([["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["boxShadow", "0 -2rpx 10rpx rgba(0, 0, 0, 0.05)"]]))], ["price-box", _uM([[".bottom-box ", _uM([["display", "flex"], ["flexDirection", "column"], ["marginLeft", "50rpx"]])]])], ["price-label", _uM([[".bottom-box .price-box ", _uM([["fontSize", "24rpx"], ["color", "#64748b"]])]])], ["price-value", _uM([[".bottom-box .price-box ", _uM([["fontWeight", "bold"], ["color", "#ef4444"], ["fontSize", "40rpx"]])]])], ["@TRANSITION", _uM([["pkg-card", _uM([["property", "all"], ["duration", "0.2s"], ["timingFunction", "ease"]])]])]])]
