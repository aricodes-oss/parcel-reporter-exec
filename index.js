const { Reporter } = require('@parcel/plugin');
const { kill } = require('process');
const { spawn } = require('child_process');

let child = null;
let shouldRun = false;

const handledSignals = ['SIGINT', 'SIGHUP', 'SIGTERM', 'exit'];
const killChild = () => {
  if (child) {
    child.kill();
  }
};

handledSignals.map(sig => process.on(sig, killChild));

process.on('beforeExit', () => {
  killChild();
});

module.exports = new Reporter({
  report({ event }) {
    if (event.type === 'watchStart') {
      shouldRun = true;
    }

    if (event.type !== 'buildSuccess' || !shouldRun) {
      return;
    }

    killChild();

    const bundles = event.bundleGraph.getBundles();
    const { filePath } = bundles[0];
    child = spawn('node', ['--enable-source-maps', '--trace-uncaught', filePath], {
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  },
});
