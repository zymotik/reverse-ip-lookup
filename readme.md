# Reverse IP Address Lookup Tool
### Powered by https://viewdns.info/

Instructions for use:

* open index.js and add your API key from viewdns.info to the `viewDnsInfoApiKey` variable
* add the search domain to `hostToCheck`, ie 'ian-b.com'
* on the command line execute: `npm run start` to see output similar to:


```Hostname: ian-b.com IP Address: 54.246.137.219 Domain names registered: 3
Now confirming which domains are still registered with the IP address 54.246.137.219 using your DNS server.
* ian-b.com is active.
* ianbrownphotography.co.uk is active
* heatash.com is active.
```