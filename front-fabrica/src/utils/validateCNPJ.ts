export function validarCNPJ(cnpjIn: string): boolean {
  const cnpj = (cnpjIn||"").replace(/[^\d]+/g,"");
  if (!cnpj || cnpj.length!==14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = 12, numeros = cnpj.substring(0,tamanho), soma = 0, pos = tamanho-7;
  for (let i=tamanho;i>=1;i--) { soma += parseInt(numeros.charAt(tamanho-i))*pos--; if (pos<2) pos=9; }
  let res = soma%11<2?0:11-(soma%11);
  if (res !== parseInt(cnpj.charAt(12))) return false;
  tamanho = 13; numeros = cnpj.substring(0,tamanho); soma = 0; pos = tamanho-7;
  for (let i=tamanho;i>=1;i--) { soma += parseInt(numeros.charAt(tamanho-i))*pos--; if (pos<2) pos=9; }
  res = soma%11<2?0:11-(soma%11);
  return res === parseInt(cnpj.charAt(13));
}
