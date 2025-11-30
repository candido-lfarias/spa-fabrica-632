export const maskCNPJ = (v: string) => v.replace(/\D/g,"")
  .replace(/^(\d{2})(\d)/,"$1.$2")
  .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
  .replace(/\.(\d{3})(\d)/,".$1/$2")
  .replace(/(\d{4})(\d)/,"$1-$2").slice(0,18);

export const maskCEP = (v: string) => v.replace(/\D/g,"")
  .replace(/^(\d{5})(\d)/,"$1-$2").slice(0,9);

export const maskTelefoneBR = (v: string) => v.replace(/\D/g,"")
  .replace(/^(\d{2})(\d)/,"($1) $2")
  .replace(/(\d{4,5})(\d{4})$/,"$1-$2").slice(0,16);
