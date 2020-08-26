import { JSEncrypt } from './jsencrypt'
//加密
//加密一个参数
export function getRsaCode(str) {
  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsLGekXJFaFk9ncuEaK6iJn00cczBZ+F8hJlpPetOC1YB4cPbmOwUHOXjE1r64CuMpQxYfJojdYxXzLk/s5/Ykd5jGdYMjbts3P6NgeS7DCdF+KJT3F18xpkOD/rVHdN1pnlWuim2U6EeSE9RTXvR5h1aRZLw2At1sC6HAY/7UfwIDAQAB'
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  let rsaPassWord = encryptor.encryptLong(str)
  return rsaPassWord
}

export function deRsaCode(encrypted) {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey('MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJJ9SsIumi+QSq9jhJ3jOivaDtixFn3ZGIzW/xZbnxqojWC5Dm8lMqRnmNdBXHSTmGu+Z2C6mlWydSZa4wbD6cYT9eeRu0wldF/omsWJHV9Rx0hKHDUo3aiV00yrIQgshuMP18wy46yUktdd0BYrxGuljoAcyjxZfmg7VNGNCxptAgMBAAECgYAxOnnNF+wo38y5dDA0/w+lfPpQR/LPCA4ABqBi2xd01f/s6UO4hj+mkEoEzKpNYuxuCOak0xDai8ZixVhWBbChpg4T3XTcd1OkLMgpjiuAtDpFoxPUXc6ssmL3ah7kvLo2FFfLy0bUHWXNKSjHUd4tkgZ4YAS/J7JFQbgGJd0Z4QJBAMcsvvPCAYpoA7vRwNg0Syht6kGL5W+m+/MtXbUzVfuVe+w3QB3N19g4aGTgX7EE39Osfyt9bUlkKHrDFCgf9RcCQQC8SIgrTzD8IMbsA5763wyKHdUXPS9v5wvYHvwbJNoicueTDZ9Lo71wc5qYt1sKQpMp5Zo079Q3+ntns/YkcGcbAkBNWgdey32lrvekPbXTQZveu7E6e4ZDcmpu6rN159YAuvFBr8Nqz8J/6ohAhRMkwGvc3SUWUsPauNcvtgth+edJAkBwcNhxFM/qIiDpnZf5te6lJP+26yFDMLXQEWD5TN7AJ+LH3SC+aUCewUsX3JgP3oZIRQf8iSUxcPL1kXFzfXT1AkAhyiDC1PDzBX8VBMGU/a4JtlaYtDZEDTI/2G2bpiLoz6r+yN8H7nqZsSbDb/kCi0046BFzzixubtNd39evRoRn');
  var uncrypted = decrypt.decryptLong(encrypted);
  return uncrypted
}

export default {
  getRsaCode,deRsaCode
}