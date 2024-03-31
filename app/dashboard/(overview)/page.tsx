import SaldoTotal from "@/components/dashboard/saldo-total";
import { fetchCuentasUser, fetchMovimientos, getIdAuth } from "@/shared/middlewares/data";


export default async function Page() {
  const cuentas = await fetchCuentasUser("ASC");
  const movimientos = await fetchMovimientos("ASC");

  return (
    <main
      className="w-full flex flex-col"
    >
      <div
        className="w-full flex flex-col"
      >
        <div className="w-full">
          <SaldoTotal cuentas={cuentas} movimientos={movimientos} />
        </div>
      </div>

      {/* Aquí se incluye el widget de Investing.com */}

      <div
        className="w-full flex gap-[20px]"
      >
      <div
        className="flex-1"
      >
          <iframe
            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=day&timeZone=58&lang=1"
            height="500"
            width="90%"
          />
        </div>

        <div>
          <iframe 
            height="500" 
            width="100%"
            src="https://ssltools.investing.com/currency-converter/?from=17&to=12&force_lang=4&with_powered_by=true" 
          />
        </div>
      </div>
    </main>
  );
}
