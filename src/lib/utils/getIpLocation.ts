type IpLocation = {
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export default async function getIpLocation(
  ipAddress: string | null,
): Promise<IpLocation> {
  if (!ipAddress || ipAddress === "::1" || ipAddress === "127.0.0.1") {
    return {
      city: null,
      country: null,
      countryCode: null,
    };
  }

  try {
    const response = await fetch(
      `https://ipapi.co/${encodeURIComponent(ipAddress)}/json/`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        city: null,
        country: null,
        countryCode: null,
      };
    }

    const data = await response.json();

    return {
      city: data.city ?? null,
      country: data.country_name ?? null,
      countryCode: data.country_code ?? null,
    };
  } catch {
    return {
      city: null,
      country: null,
      countryCode: null,
    };
  }
}
