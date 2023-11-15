module.exports = {
	"extends": ["stylelint-config-standard","stylelint-config-recommended"],
	"plugins": ["stylelint-order"],
	"ignoreFiles": ["**/*.js", "**/*.tsx", "**/*.ts", "**/.jsx"],
	"rules": {
		"indentation": 4,
		"string-quotes": "single",
		"number-leading-zero": "never",
		"declaration-block-no-duplicate-properties": true,
		"max-nesting-depth": 5,
		"selector-max-compound-selectors": 5,
		"block-no-empty": [true, { "ignore": ["comments"] }],
		"selector-no-qualifying-type": [true, { "ignore": ["attribute"] }],
		"unit-allowed-list": ["%", "deg", "rem", "ms", "vw", "vh", "s", "cqi"],
		"color-no-invalid-hex": true,
		"function-disallowed-list": ["rgb", "hwb", "lch"],
		"order/properties-alphabetical-order": true,
	}
}
