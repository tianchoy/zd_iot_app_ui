
export type Config = {
	theme : 'dark' | 'light',
	unit : 'px' | 'rpx'
}

export const config = reactive<Config>({
	theme: "light",
	unit: 'px'
})

export const isDark = computed(() => config.theme == 'dark')

export const setTheme = (theme : 'dark' | 'light') => {
	config.theme = theme
}













