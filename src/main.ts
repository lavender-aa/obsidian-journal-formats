import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";

// behaviors i want:

// command AddEvent with: "- (H:MM(a|p)) " based on current time
// when entering a newline from an event, create another one with the current time

// command AddThought with: "(H:MM(a|p))"

// for thoughts: at first only first line appears, but wraps around as follows:

// (H:MMp) text text text text text text text
//       | uses a bar whenever text wraps over
//       |
//       | or whenever the enter key is pressed.
//       | hitting backspace on an empty line,
//       | like the one below:
//       |
//       | will delete that line and put the cursor at the beginning of the line.

// this part should act very similar to a bulleted list



export default class JournalFormats extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('dice', 'Sample', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status bar text');


		// command: AddEvent
		this.addCommand({
			id: 'add-event',
			name: 'Add event template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection('- ' + getTimestamp());
			}
		})
		
		// command: AddThought
		this.addCommand({
			id: 'add-thought',
			name: 'Add thought template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection(getTimestamp();
			}
		})

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

function getTimestamp(): string {
		let date: Date = new Date();
		let str: string = date.toLocaleString();
		let time: string = str.slice(11, 15) + str.charAt(19).toLowerCase();
		return (time.length == 5 ? ' ' : '') + '(' + time + ') ';
	}
