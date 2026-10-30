/**
 * Utility for local data encryption & passcode security
 * Provides encrypted backup exports and passcode protection for e-Rapor records.
 */

export function simpleEncrypt(plainText: string, passcode: string): string {
  try {
    const key = passcode || 'KURIKULUM_MERDEKA_2025';
    let result = '';
    for (let i = 0; i < plainText.length; i++) {
      const charCode = plainText.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode ^ (keyChar & 0x1f));
    }
    return btoa(unescape(encodeURIComponent(result)));
  } catch (e) {
    console.error('Encryption error:', e);
    return btoa(unescape(encodeURIComponent(plainText)));
  }
}

export function simpleDecrypt(cipherText: string, passcode: string): string {
  try {
    const key = passcode || 'KURIKULUM_MERDEKA_2025';
    const raw = decodeURIComponent(escape(atob(cipherText)));
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const charCode = raw.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode ^ (keyChar & 0x1f));
    }
    return result;
  } catch (e) {
    console.error('Decryption error:', e);
    try {
      return decodeURIComponent(escape(atob(cipherText)));
    } catch {
      throw new Error('Kode sandi tidak cocok atau format file rusak.');
    }
  }
}

export function exportEncryptedFile(data: any, fileName: string, passcode: string) {
  const jsonStr = JSON.stringify(data, null, 2);
  const encrypted = simpleEncrypt(jsonStr, passcode);
  const blob = new Blob([encrypted], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_encrypted_${new Date().toISOString().split('T')[0]}.erapor`;
  link.click();
  URL.revokeObjectURL(url);
}
