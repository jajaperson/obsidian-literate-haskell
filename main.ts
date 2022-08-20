import {
	MarkdownPostProcessorContext,
	MarkdownRenderer,
	MarkdownView,
	Plugin,
} from "obsidian";

export default class LiterateHaskellPlugin extends Plugin {
	onload() {
		this.registerExtensions(["lhs"], "markdown");

		this.addCommand({
			id: "convert-to-lhs",
			name: "Convert file to .lhs",
			checkCallback: (checking) => {
				const mdView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (mdView?.file.extension === "md") {
					if (!checking) {
						// Actual logic goes here
						mdView.editor.focus();
						const { file } = mdView;
						this.app.fileManager.renameFile(
							file,
							`${file.parent.path}/${file.basename}.lhs`
						);
					}

					return true;
				} else {
					return false;
				}
			},
		});

		this.addCommand({
			id: "convert-to-md",
			name: "Convert file to .md",
			checkCallback: (checking) => {
				const mdView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (mdView?.file.extension === "lhs") {
					if (!checking) {
						// Actual logic goes here
						mdView.editor.focus();
						const { file } = mdView;
						this.app.fileManager.renameFile(
							file,
							`${file.parent.path}/${file.basename}.md`
						);
					}

					return true;
				} else {
					return false;
				}
			},
		});

		this.registerMarkdownCodeBlockProcessor(
			"haskell",
			this.postprocessor.bind(this)
		);
	}

	async postprocessor(
		src: string,
		el: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) {
		const code: string = ctx.sourcePath.endsWith(".lhs") 
			? (/^\\begin{code}.*\n((?:.|\n)+)\\end{code}/.exec(src)?.last() || src) 
			: src;

		await MarkdownRenderer.renderMarkdown(
			"```HASKELL\n" + code + "```", // all-caps prevents it being reprocessed
			el,
			ctx.sourcePath,
			this
		);
	}
}
