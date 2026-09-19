export default function parseUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return {
      browser: "Unknown",
      version: "",
      os: "Unknown",
    };
  }

  let browser = "Unknown";
  let version = "";
  let os = "Unknown";

  // Browser
  const browserMatch =
    userAgent.match(/Edg\/([\d.]+)/) ||
    userAgent.match(/OPR\/([\d.]+)/) ||
    userAgent.match(/Chrome\/([\d.]+)/) ||
    userAgent.match(/Firefox\/([\d.]+)/) ||
    userAgent.match(/Version\/([\d.]+).*Safari/);

  if (browserMatch) {
    version = browserMatch[1];

    if (/Edg\//.test(userAgent)) browser = "Edge";
    else if (/OPR\//.test(userAgent)) browser = "Opera";
    else if (/Chrome\//.test(userAgent)) browser = "Chrome";
    else if (/Firefox\//.test(userAgent)) browser = "Firefox";
    else if (/Safari\//.test(userAgent)) browser = "Safari";
  }

  // OS
  if (/Windows NT/.test(userAgent)) {
    os = "Windows";
  } else if (/Mac OS X/.test(userAgent)) {
    os = "macOS";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = "iOS";
  } else if (/Linux/.test(userAgent)) {
    os = "Linux";
  }

  return {
    browser,
    version,
    os,
  };
}
