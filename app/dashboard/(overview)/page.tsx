import SaldoTotal from "@/components/dashboard/saldo-total";
import { fetchCuentasUser, fetchMovimientos, getIdAuth, getNameAuth, fetchCountCuentasUser } from "@/shared/middlewares/data";


export default async function Page() {
  const cuentas = await fetchCuentasUser("ASC");
  const { data }: any = await fetchMovimientos({
    order: "ASC",
  });
  const name = await getNameAuth();

  return (
    <main
      className="w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-center text-[#EB8833]">¡Bienvenido, {name}!</h1>
        </div>
        <div className="w-full">
          <SaldoTotal cuentas={cuentas} movimientos={data} />
        </div>
      </div>
      <br />

      {/* Aquí se incluyen los widgets de Investing.com */}
      <div className="w-full flex flex-col gap-4">
        {/* Criptos */}
        <div className="w-full">
          <iframe
            height="500"
            width="100%"
            src="https://es.widgets.investing.com/top-cryptocurrencies?theme=darkTheme"
          />
        </div>
        {/* Forex */}
        <div className="flex-1">
          <iframe
            src="https://es.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&roundedCorners=true&cols=ask,high,low,changePerc&pairs=1,3,2,4,7,5,8,6,9,10,49,11"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <br /><br /><br />
      <div className="flex gap-4">
        {/* Noticias */}
        <div className="flex-1">
          <iframe
            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=day&timeZone=58&lang=1"
            height="500"
            width="100%"
          />
        </div>
        {/* Conversor */}
        <div className="flex-1">
          <iframe
            src="https://ssltools.investing.com/currency-converter/?from=17&to=12&force_lang=4&with_powered_by=true"
            height="500"
            width="100%"
          />
        </div>
      </div>

    </main>
  );
}
