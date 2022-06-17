export function formatCellphone(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function formatCurrency(value: string): string {
  let v = value,
    integer = v.split(".")[0];
  v = v.replace(/\D/, "");
  v = v.replace(/^[0]+/, "");

  if (v.length <= 3 || !integer) {
    if (v.length === 1) v = "0,00" + v;
    if (v.length === 2) v = "0,0" + v;
    if (v.length === 3) v = "0," + v;
  } else v = v.replace(/^(\d{1,})(\d{2})$/, "$1,$2");

  return v;
}

export function formatCEP(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
}
