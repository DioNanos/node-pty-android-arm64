# node-pty-android-arm64

Android/Termux-only fork of node-pty targeting ARM64 (bionic). It provides the same API as the upstream `node-pty` package but is focused on working reliably under Termux.

## Scope

- Platform: `android`
- CPU: `arm64`
- Intended environment: Termux on Android

If you need Linux/macOS/Windows support, use the upstream project: https://github.com/microsoft/node-pty

## Install

```bash
npm install node-pty-android-arm64
```

If you want to keep `require('node-pty')` in your code, you can use an npm alias:

```bash
npm install node-pty@npm:node-pty-android-arm64
```

## Build on Termux

Prerequisites:

```bash
pkg install -y nodejs python make clang pkg-config git
```

Build and install:

```bash
npm install
npm run build
```

Notes:
- If `prebuilds/android-arm64` exists, it will be used.
- When building from source on Termux, `android_ndk_path` is derived from `ANDROID_NDK_HOME`/`ANDROID_NDK_ROOT` or falls back to `$PREFIX`.

## Usage

```js
import * as os from 'node:os';
import * as pty from 'node-pty';

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.onData((data) => {
  process.stdout.write(data);
});

ptyProcess.write('ls\r');
```

## Credits

Based on the original `node-pty` project by Microsoft and contributors.
