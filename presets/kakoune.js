/**
 * Basic keybindings for Kakoune style editing
 */

function repeatable(command) {
	return {
		command,
		count: "_ctx.count"
	};
}

module.exports = {
	"": {
		":": "modalEditor.setCommandMode",
		"/": "actions.find",
		n: "editor.action.nextMatchFindAction",
		N: "editor.action.previousMatchFindAction"
	},

	insert: {
		"\u001b": "modalEditor.setNormalMode"
	},

	normal: {
		// mode switch
		i: "modalEditor.setInsertMode",
		a: ["cursorRight", "modalEditor.setInsertMode"],
		o: ["editor.action.insertLineAfter", "modalEditor.setInsertMode"],
		O: ["editor.action.insertLineBefore", "modalEditor.setInsertMode"],
		v: "modalEditor.setSelectMode",

		// movement (kakoune-like defaults)
		h: repeatable(["cancelSelection", "cursorLeft"]),
		j: repeatable(["cancelSelection", "cursorDown"]),
		k: repeatable(["cancelSelection", "cursorUp"]),
		l: repeatable(["cancelSelection", "cursorRight"]),
		w: repeatable(["cancelSelection", "cursorWordStartRight"]),
		b: repeatable(["cancelSelection", "cursorWordStartLeft"]),

		// select object/motion first, then action
		x: repeatable("expandLineSelection"),
		d: ["modalEditor.cut", "modalEditor.setNormalMode"],
		y: ["modalEditor.yank", "modalEditor.setNormalMode"],
		p: repeatable("modalEditor.paste"),

		u: repeatable("undo"),
		U: repeatable("redo")
	},

	select: {
		"\u001b": "modalEditor.setNormalMode",
		h: repeatable("cursorLeftSelect"),
		j: repeatable("cursorDownSelect"),
		k: repeatable("cursorUpSelect"),
		l: repeatable("cursorRightSelect"),
		w: repeatable("cursorWordStartRightSelect"),
		b: repeatable("cursorWordStartLeftSelect"),
		x: "expandLineSelection",
		d: ["modalEditor.cut", "modalEditor.setNormalMode"],
		y: ["modalEditor.yank", "modalEditor.setNormalMode"],
		i: "modalEditor.setInsertMode"
	}
};
