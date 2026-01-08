//@ts-check

const { spawnSync } = require('node:child_process');

function getAndroidNdkPath() {
  return (
    process.env.ANDROID_NDK_HOME ||
    process.env.ANDROID_NDK_ROOT ||
    process.env.ANDROID_NDK ||
    process.env.NDK_HOME ||
    process.env.PREFIX ||
    ''
  );
}

function ensureGypDefines(androidNdkPath) {
  const raw = process.env.GYP_DEFINES || '';
  const parts = raw.split(/\s+/).filter(Boolean);
  if (!parts.some((entry) => entry.startsWith('android_ndk_path='))) {
    parts.push(`android_ndk_path=${androidNdkPath}`);
  }
  process.env.GYP_DEFINES = parts.join(' ');
}

const androidNdkPath = getAndroidNdkPath();
if (androidNdkPath) {
  ensureGypDefines(androidNdkPath);
}

const result = spawnSync('node-gyp', ['rebuild'], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
