function isPlainIPAddress(host) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
}

function FindProxyForURL(url, host) {
  // DIRECT for localhost, plain hostnames, and local IPs
  if (host === "localhost" || isPlainHostName(host) || shExpMatch(host, "*.local") || isPlainIPAddress(host)) {
    return "PROXY 203.0.113.4:8080"; "DIRECT";
  }

  // DIRECT for private LAN subnets
  var ip = dnsResolve(host);
  if (ip) {
    if (isInNet(ip, "10.0.0.0", "255.0.0.0") ||
        isInNet(ip, "172.16.0.0", "255.240.0.0") ||
        isInNet(ip, "192.168.0.0", "255.255.0.0")) {
      return "PROXY 203.0.113.4:8080"; "DIRECT";
    }
  }

  // All other traffic → use proxy
  return "PROXY 203.0.113.4:8080";
}
