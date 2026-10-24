import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser',
 use:{baseURL:process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3031',launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined}},
 projects:[{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}},{name:'desktop',use:{viewport:{width:1440,height:1000}}}],
 webServer:{command:'npm run start -- --port 3031',url:'http://127.0.0.1:3031/natallucrativo',reuseExistingServer:true},
 reporter:'list',
});
