import * as vscode from 'vscode';

export class HeroUIProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.CompletionItem[] {
        const items = [
            {
                label: 'heroui-button',
                insertText: new vscode.SnippetString('create_button text="${1:Button Text}" variant="${2:primary}" size="${3:medium}"'),
                documentation: new vscode.MarkdownString('Create HeroUI button component'),
                kind: vscode.CompletionItemKind.Snippet
            },
            {
                label: 'heroui-input',
                insertText: new vscode.SnippetString('create_input type="${1:text}" placeholder="${2:Enter text}" label="${3:Label}"'),
                documentation: new vscode.MarkdownString('Create HeroUI input component'),
                kind: vscode.CompletionItemKind.Snippet
            },
            {
                label: 'heroui-grid',
                insertText: new vscode.SnippetString('create_grid columns=${1:3} gap="${2:medium}" items=\'["${3:Item 1}", "${4:Item 2}", "${5:Item 3}"]\''),
                documentation: new vscode.MarkdownString('Create HeroUI grid layout'),
                kind: vscode.CompletionItemKind.Snippet
            }
        ];

        return items.map(item => {
            const completionItem = new vscode.CompletionItem(item.label, item.kind);
            completionItem.insertText = item.insertText;
            completionItem.documentation = item.documentation;
            return completionItem;
        });
    }
}

export class HeroUIWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'heroui.preview';

    resolveWebviewView(webviewView: vscode.WebviewView): void {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = this.getHtmlContent();

        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'generate':
                    const result = await this.generateComponent(message.description);
                    webviewView.webview.postMessage({
                        command: 'result',
                        content: result
                    });
                    break;
            }
        });
    }

    private getHtmlContent(): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: var(--vscode-font-family); padding: 20px; }
                .input-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; font-weight: bold; }
                input, textarea { width: 100%; padding: 8px; border: 1px solid var(--vscode-input-border); background: var(--vscode-input-background); color: var(--vscode-input-foreground); }
                button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; padding: 10px 20px; cursor: pointer; }
                button:hover { background: var(--vscode-button-hoverBackground); }
                .result { margin-top: 20px; padding: 15px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); }
                pre { white-space: pre-wrap; word-wrap: break-word; }
            </style>
        </head>
        <body>
            <h2>🚀 HeroUI Component Generator</h2>
            
            <div class="input-group">
                <label for="description">Component Description:</label>
                <textarea id="description" rows="3" placeholder="Describe the component you want to create..."></textarea>
            </div>
            
            <button onclick="generateComponent()">Generate Component</button>
            
            <div id="result" class="result" style="display: none;">
                <h3>Generated Component:</h3>
                <pre id="output"></pre>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                
                function generateComponent() {
                    const description = document.getElementById('description').value;
                    if (!description.trim()) {
                        alert('Please enter a component description');
                        return;
                    }
                    
                    vscode.postMessage({
                        command: 'generate',
                        description: description
                    });
                }
                
                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.command === 'result') {
                        document.getElementById('result').style.display = 'block';
                        document.getElementById('output').textContent = message.content;
                    }
                });
            </script>
        </body>
        </html>`;
    }

    private async generateComponent(description: string): Promise<string> {
        // This would call the MCP server
        // For now, return a mock response
        return `<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    ${description}
</button>`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Register completion provider
    const provider = vscode.languages.registerCompletionItemProvider(
        ['javascript', 'typescript', 'html', 'markdown'],
        new HeroUIProvider(),
        'h' // Trigger on 'h' for 'heroui'
    );

    // Register webview provider
    const webviewProvider = new HeroUIWebviewProvider();
    const webviewDisposable = vscode.window.registerWebviewViewProvider(
        HeroUIWebviewProvider.viewType,
        webviewProvider
    );

    // Register commands
    const createButtonCommand = vscode.commands.registerCommand('heroui.createButton', () => {
        vscode.window.showInputBox({
            prompt: 'Enter button text',
            placeHolder: 'Button Text'
        }).then(text => {
            if (text) {
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    const snippet = new vscode.SnippetString(`create_button text="${text}" variant="primary"`);
                    editor.insertSnippet(snippet);
                }
            }
        });
    });

    context.subscriptions.push(provider, webviewProvider, webviewDisposable, createButtonCommand);
}

export function deactivate() {}
