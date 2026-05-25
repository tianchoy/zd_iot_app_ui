```ts
<view>
    <!-- #ifdef VERSION_CN -->
    <view><text>这是版本 国内 的独立页面</text></view>
    <!-- #endif -->

    <!-- #ifdef VERSION_INT -->
    <view><text>这是版本 国际 的独立页面</text></view>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <view>只在微信小程序中显示</view>
    <!-- #endif -->
</view>
```