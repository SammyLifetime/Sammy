const { exec } = require('child_process');
const os = require('os');

module.exports = {
  config: {
    name: "stats",
    version: "1.0",
    author: "Cruizex",
    countDown: 0,
    role: 0,
    category: "Utility",
    shortDescription: "Get system stats",
    guide: {
      en: "{pn} stats - Get system stats",
    },
  },

  onStart: async function ({ api, args, message }) {
    try {
      const [osInfo, ramStats, storageStats, pingTime, uptime, cpuUsage] = await Promise.all([
        getOsInfo(),
        getRamStats(),
        getStorageStats(),
        getPingTime(),
        getUptime(),
        getCpuUsage(),
      ]);

      const statsMessage = `
•OS: ${osInfo.name} ${osInfo.version}
•RAM Usage:
  •Total: ${ramStats.total}
  •Used: ${ramStats.used}
  •Free: ${ramStats.free}
•Storage Usage:
  •Total: ${storageStats.total}
  •Used: ${storageStats.used}
  •Free: ${storageStats.free}
•Ping Response Time: ${pingTime} ms
•Uptime: ${uptime}
•CPU Usage: ${cpuUsage}
`;

      message.reply(statsMessage);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function prettyMilliseconds(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];

  if (days > 0) parts.push(`${days} days`);
  if (hours > 0) parts.push(`${hours} hours`);
  if (minutes > 0) parts.push(`${minutes} minutes`);
  if (seconds > 0) parts.push(`${seconds} seconds`);

  return parts.join(', ');
}

async function getOsInfo() {
  return new Promise((resolve, reject) => {
    exec('cat /etc/os-release', (error, stdout) => {
      if (error) {
        reject(new Error(`Error getting OS info: ${error.message}`));
      } else {
        const osInfo = {};
        const lines = stdout.split('\n');
        lines.forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) {
            osInfo[key.trim()] = value.trim().replace(/"/g, '');
          }
        });

        resolve({
          name: osInfo.NAME,
          version: osInfo.VERSION,
        });
      }
    });
  });
}

function getRamStats() {
  const totalMemory = formatBytes(os.totalmem());
  const freeMemory = formatBytes(os.freemem());
  const usedMemory = formatBytes(os.totalmem() - os.freemem());

  return { total: totalMemory, used: usedMemory, free: freeMemory };
}

function getStorageStats() {
  return new Promise((resolve, reject) => {
    exec('df -h --total', (error, stdout) => {
      if (error) {
        reject(new Error(`Error getting storage stats: ${error.message}`));
      } else {
        const lines = stdout.split('\n');
        const lastLine = lines[lines.length - 2];
        const [filesystem, size, used, available] = lastLine.split(/\s+/);
        const storageStats = { total: size, used: used, free: available };
        resolve(storageStats);
      }
    });
  });
}

function getPingTime() {
  return new Promise((resolve, reject) => {
    exec('ping -c 1 google.com | grep time=', (error, stdout) => {
      if (error) {
        reject(new Error(`Error getting ping response time: ${error.message}`));
      } else {
        const match = stdout.match(/time=(\d+\.\d+) ms/);
        const pingTime = match ? parseFloat(match[1]) : 0;
        resolve(pingTime.toFixed(2));
      }
    });
  });
}

function getUptime() {
  return Promise.resolve(prettyMilliseconds(os.uptime() * 1000));
}

function getCpuUsage() {
  return new Promise((resolve, reject) => {
    exec('top -bn 1 | grep "%Cpu(s)"', (error, stdout) => {
      if (error) {
        reject(new Error(`Error getting CPU usage: ${error.message}`));
      } else {
        const match = stdout.match(/(\d+\.\d+)%\s+us,\s+(\d+\.\d+) id/);
        const userUsage = match ? parseFloat(match[1]) : 0;
        const frequency = os.cpus()[0].speed / 1000; // in GHz

        resolve(Number.isNaN(userUsage) ? 'N/A' : `${userUsage.toFixed(2)}% ${frequency.toFixed(2)} GHz`);
      }
    });
  });
}