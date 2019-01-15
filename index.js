
const colors = require('colors');
const dns = require('dns');
const request = require('request-promise-native');

const viewDnsInfoApiKey = '';
const hostToCheck = '';

async function getIpAddress(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, function(err, ip) {
            if (err) {
                reject(err);
            } else {
                resolve(ip);
            }
        });    
    });
}

async function getHostNames(ipaddress, apiKey) {
    const apiUrl = `https://api.viewdns.info/reverseip/?host=${ipaddress}&apikey=${apiKey}&output=json`;
    const response = JSON.parse(await request(apiUrl));
    return response.response.domains.map((domain) => domain.name);
}

async function isDomainActive(hostname, ipaddress) {
    const address = await getIpAddress(hostname).catch(()=>{});
    return address === ipaddress;
}

async function main() {
    let domainCount = 0;
    let hostip = await getIpAddress(hostToCheck);
    let hostnames = await getHostNames(hostip, viewDnsInfoApiKey);;

    console.log(`Hostname: ${colors.blue(hostToCheck)} IP Address: ${colors.blue(hostip)} Domain names registered: ${colors.blue(hostnames.length)}`);
    console.log(`Now confirming which domains are still registered with the IP address ${hostip} using your DNS server.`);

    await Promise.all(hostnames.map(async (hostname) => {
        const isActive = await isDomainActive(hostname, hostip);
        if (isActive) {
            domainCount += 1;
            console.log(`${colors.red('*')} ${hostname} is active.`);
        }
    }));

    console.log(`Total active domain count: ${domainCount}`);
}

main();