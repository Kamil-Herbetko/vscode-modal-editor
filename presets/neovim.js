/**
 * Basic keybindings for Neovim style editing
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
		N: "editor.action.previousMatchFindAction",
		u: repeatable("undo"),
		R: repeatable("redo")
	},

	insert: {
		"\u001b": "modalEditor.setNormalMode"
	},

	normal: {
		// mode switch
		i: "modalEditor.setInsertMode",
		I: ["cursorLineStart", "modalEditor.setInsertMode"],
		a: ["cursorRight", "modalEditor.setInsertMode"],
		A: ["cursorLineEnd", "modalEditor.setInsertMode"],
		o: ["editor.action.insertLineAfter", "modalEditor.setInsertMode"],
		O: ["editor.action.insertLineBefore", "modalEditor.setInsertMode"],
		v: "modalEditor.setSelectMode",

		// movement
		h: repeatable(["cancelSelection", "cursorLeft"]),
		j: repeatable(["cancelSelection", "cursorDown"]),
		k: repeatable(["cancelSelection", "cursorUp"]),
		l: repeatable(["cancelSelection", "cursorRight"]),
		w: repeatable(["cancelSelection", "cursorWordStartRight"]),
		b: repeatable(["cancelSelection", "cursorWordStartLeft"]),
		e: repeatable(["cancelSelection", "cursorWordEndRight"]),
		"0": ["cancelSelection", "cursorLineStart"],
		"$": ["cancelSelection", "cursorLineEnd"],
		g: {
			g: ["cancelSelection", "cursorTop"]
		},
		G: ["cancelSelection", "cursorBottom"],

		// edit
		x: repeatable(["editor.action.clipboardCutAction", "modalEditor.setNormalMode"]),
		d: {
			d: repeatable(["editor.action.deleteLines", "modalEditor.setNormalMode"])
		},
		y: {
			y: ["editor.action.copyLinesDownAction", "modalEditor.setNormalMode"]
		},
		p: repeatable("editor.action.clipboardPasteAction"),
		P: repeatable("editor.action.clipboardPasteAction")
	},

	select: {
		"\u001b": "modalEditor.setNormalMode",
		h: repeatable("cursorLeftSelect"),
		j: repeatable("cursorDownSelect"),
		k: repeatable("cursorUpSelect"),
		l: repeatable("cursorRightSelect"),
		w: repeatable("cursorWordStartRightSelect"),
		b: repeatable("cursorWordStartLeftSelect"),
		e: repeatable("cursorWordEndRightSelect"),
		y: ["modalEditor.yank", "modalEditor.setNormalMode"],
		d: ["modalEditor.cut", "modalEditor.setNormalMode"]
	}
};
