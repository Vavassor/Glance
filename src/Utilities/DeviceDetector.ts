import DeviceDetector from "device-detector-js";

interface UserAgent {
  client: {
    name: string;
  };
  os: {
    name: string;
  };
}

interface Options {
  client: { name: string };
  os: { name: string };
}

const defaultOptions: Options = {
  client: { name: "unknown browser" },
  os: { name: "unknown operating system" },
};

export const deviceDetector = new DeviceDetector();

export const parseUserAgent = (
  userAgent: string | undefined,
  deviceDetector: DeviceDetector,
  options: Options = defaultOptions
): UserAgent => {
  if (!userAgent) {
    return {
      client: { name: options.client.name },
      os: { name: options.os.name },
    };
  }

  const { client, os } = deviceDetector.parse(userAgent);

  const result: UserAgent = {
    client: {
      name: client?.name || options.client.name,
    },
    os: {
      name: os?.name || options.os.name,
    },
  };

  return result;
};
