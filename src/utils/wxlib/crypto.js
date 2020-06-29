import CryptoJS from 'crypto-js'

class tripleDES {
  decode(key, text) {
    var data
    var hexkey = CryptoJS.enc.Utf8.parse(key);
    var hexiv = CryptoJS.enc.Utf8.parse(key.substr(0, 8));
    var decrypttext = CryptoJS.TripleDES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(text) }, hexkey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: hexiv,
    });
    try {
      data = JSON.parse(decrypttext.toString(CryptoJS.enc.Utf8))
    } catch (err) {
      console.log('decode err...')
      console.log(err)
      console.log(text)
    }

    return data
  }

  encode(key, text) {
    var hexkey = CryptoJS.enc.Utf8.parse(key);
    var hexiv = CryptoJS.enc.Utf8.parse(key.substr(0, 8));
    var encrypttext = CryptoJS.TripleDES.encrypt(JSON.stringify(text), hexkey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: hexiv,
    });
    let base64str = encrypttext.ciphertext.toString(CryptoJS.enc.Base64)
    return base64str
  }
}

export default new tripleDES
