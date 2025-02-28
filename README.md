# DevAssist Discord Bot

Discord bot designed to assist developers with quick access to programming documentation and code formatting.

![Discord Bot](https://img.shields.io/badge/Discord-Bot-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Features

### 📚 Documentation Lookup (`!docs`)

Quickly access documentation for multiple programming languages directly within Discord:

- **Web Development**: JavaScript, TypeScript, HTML, CSS, React, Node.js
- **Systems Programming**: C#, Java, Rust, Go, Kotlin, C, C++
- **Scripting Languages**: Python, Ruby, PHP, Swift, Lua

#### Usage Examples:
```
!docs javascript array
!docs python list
!docs rust ownership
!docs c++ vectors
!docs c pointers
```

### 💻 Code Snippet Formatting (`!snippet`)

Format your code snippets for better readability in Discord with syntax highlighting:

```
!snippet javascript const hello = "world";
!snippet python def hello(): return "world"
!snippet cpp int main() { return 0; }
```

### 🛠️ Server Utilities

- `!serverinfo` - Display detailed information about the server
- `!userinfo` - Show user profile information
- `!help` - Display available commands and usage information

## Supported Languages

The bot supports documentation lookup for 16+ programming languages:

| Category | Languages |
|----------|-----------|
| Web Development | JavaScript, TypeScript, HTML, CSS, React, Node.js |
| Systems Programming | C#, Java, Rust, Go, Kotlin, C, C++ |
| Scripting | Python, Ruby, PHP, Swift, Lua |

## Command Reference

### Documentation Command

```
!docs <language> <query>
```

- Use `!docs languages` to see all supported languages
- Use `!docs <language>` to see common topics for a specific language

### Snippet Command

```
!snippet <language> <code>
```

Supports multiple languages including JavaScript, Python, Java, C++, and more.

### Server Commands

```
!serverinfo - Display server information
!userinfo [@user] - Display user information
!help [command] - Display help information
```

## Technical Details

- **Framework**: Discord.js v14.14.1
- **Runtime**: Node.js
- **Dependencies**:
  - discord.js: ^14.14.1
  - dotenv: ^16.3.1
  - node-fetch: ^2.6.9

## Architecture

The bot is built with a modular command structure, making it easy to extend with new features. Each command is implemented as a separate module, and the main application dynamically loads these commands at runtime.

## Customization

The bot can be customized by:
- Changing the command prefix (default: `!`)
- Adding new documentation sources
- Extending the supported languages
- Creating new utility commands

## License

MIT License

---

*Built with ❤️ for developers, by developers.*
