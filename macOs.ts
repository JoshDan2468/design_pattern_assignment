
type Platform = "windows" | "web" | "macos";

// Factory Method Design Pattern

interface Button {
    render(): void;
    onClick(handler: () => void): void;
}

// Windows Button
class WindowsButton implements Button {
    private handler: (() => void) | null = null;

    render(): void {
        console.log("[Windows] Drawing a native OS button");
    }

    onClick(handler: () => void): void {
        console.log("[Windows] Binding a native click event");
        this.handler = handler;
    }
}

// Web Button
class HTMLButton implements Button {
    private handler: (() => void) | null = null;

    render(): void {
        console.log("[Web] Rendering <button>OK</button>");
    }

    onClick(handler: () => void): void {
        console.log("[Web] Adding a browser 'click' listener");
        this.handler = handler;
    }
}

// macOS Button - New Implementation
class MacOSButton implements Button {
    private handler: (() => void) | null = null;

    render(): void {
        console.log("[macOS] Drawing a native macOS button");
    }

    onClick(handler: () => void): void {
        console.log("[macOS] Binding a native click event");
        this.handler = handler;
    }
}

// Abstract Dialog
abstract class Dialog {
    abstract createButton(): Button;

    render(): void {
        const okButton = this.createButton();
        okButton.onClick(() => this.close());
        okButton.render();
    }

    close(): void {
        console.log("Dialog closed");
    }
}

// Windows Dialog
class WindowsDialog extends Dialog {
    override createButton(): Button {
        return new WindowsButton();
    }
}

// Web Dialog
class WebDialog extends Dialog {
    override createButton(): Button {
        return new HTMLButton();
    }
}

// macOS Dialog - New Implementation
class MacOSDialog extends Dialog {
    override createButton(): Button {
        return new MacOSButton();
    }
}

// Application Configuration
interface AppConfig {
    platform: Platform;
}

// Application
class Application {
    private readonly dialog: Dialog;

    constructor(config: AppConfig) {
        this.dialog = Application.chooseDialog(config.platform);
    }

    private static chooseDialog(platform: Platform): Dialog {
        switch (platform) {
            case "windows":
                return new WindowsDialog();

            case "web":
                return new WebDialog();

            case "macos":
                return new MacOSDialog();

            default: {
                const unknown: never = platform;
                throw new Error(`Unknown platform: ${String(unknown)}`);
            }
        }
    }

    run(): void {
        this.dialog.render();
    }
}

// Testing all three platforms
new Application({ platform: "windows" }).run();
new Application({ platform: "web" }).run();
new Application({ platform: "macos" }).run();
