export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Cuenta = {
  id: string;
  user_id: string;
  accountnumber: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: string;
};

export type Movimiento = {
  id: string;
  cuenta_id: string;
  cantidad: string;
  concepto: string;
  date: string;
  user_id?: string;
  accountnumber?: string;
  iban?: string;
  name?: string;
  entidad?: string;
  saldo?: string;
  tipo: "ingreso" | "gasto";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type MovimientoForm = {
  id: string;
  cuenta_id: string;
  cantidad: string;
  concepto: string;
  tipo: "ingreso" | "gasto";
};

export type CuentaForm = {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
};
