function FindProxyForURL(url, host) {
  // Direct for local addresses
  if (isPlainHostName(host) || shExpMatch(host, "*.local") || shExpMatch(host, "localhost")) {
    return "PROXY 185.199.229.156:8080; DIRECT";
  }

  // Direct for private networks
  var ip = dnsResolve(host);
  if (isInNet(ip, "10.0.0.0", "255.0.0.0") ||
      isInNet(ip, "172.16.0.0", "255.240.0.0") ||
      isInNet(ip, "192.168.0.0", "255.255.0.0")) {
    return "PROXY 185.199.229.156:8080; DIRECT";
  }
