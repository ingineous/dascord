export const initializeKeys = async () => {
  const keypair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );

  return keypair;
};

export function ab2str(buf: ArrayBuffer) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export async function exportPrivateCryptoKey(key: CryptoKeyPair) {
  const exported = await window.crypto.subtle.exportKey(
    "pkcs8",
    key.privateKey,
  );
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
}

export function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export async function exportPublicCryptoKey(key: CryptoKeyPair) {
  return await window.crypto.subtle.exportKey("jwk", key.publicKey);
}

export async function importPrivateKey(pem: string) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PRIVATE KEY-----\\n";
  const pemFooter = "\n-----END PRIVATE KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length - 1,
  );

  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return await window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"],
  );
}
