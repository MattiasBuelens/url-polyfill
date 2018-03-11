import { percentEscape } from "./encode";

export const enum HostType {
  DOMAIN_OR_IPV4,
  IPV6,
  OPAQUE
}

export interface DomainOrIPV4Host {
  _type: HostType.DOMAIN_OR_IPV4;
  _domain: string;
}

export interface IPv6Host {
  _type: HostType.IPV6;
  _address: string;
}

export interface OpaqueHost {
  _type: HostType.OPAQUE;
  _data: string;
}

export type Host = DomainOrIPV4Host | IPv6Host | OpaqueHost | '';

export function parseHost(input: string, isSpecial: boolean): Host | undefined {
  // 1. If input starts with U+005B ([), then:
  if ('[' === input[0]) {
    // 1. If input does not end with U+005D (]), validation error, return failure.
    if (']' !== input[input.length - 1]) {
      return undefined;
    }
    // 2. Return the result of IPv6 parsing input with its leading U+005B ([) and trailing U+005D (]) removed.
    return parseIPv6(input.slice(1, -1));
  }
  // 2. If isSpecial is false, then return the result of opaque-host parsing input.
  if (!isSpecial) {
    return parseOpaqueHost(input);
  }
  // TODO steps 3 to 9
  return {
    _type: HostType.DOMAIN_OR_IPV4,
    _domain: input
  };
}

function parseOpaqueHost(input: string): OpaqueHost | undefined {
  // TODO 1. If input contains a forbidden host code point excluding U+0025 (%), validation error, return failure.
  // 2. Let output be the empty string.
  let output = '';
  // 3. For each code point in input, UTF-8 percent encode it using the C0 control percent-encode set,
  // and append the result to output.
  for (let i = 0; i < input.length; i++) {
    output += percentEscape(input[i]);
  }
  // 4. Return output.
  return {
    _type: HostType.OPAQUE,
    _data: output
  };
}

function parseIPv6(input: string): IPv6Host | undefined {
  // TODO Validate IPv6
  return {
    _type: HostType.IPV6,
    _address: input
  };
}

export function serializeHost(host: Host): string {
  // TODO
  return host;
}