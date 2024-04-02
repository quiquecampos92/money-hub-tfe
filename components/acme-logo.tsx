import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/fonts';
import Image from 'next/image';

export default function AcmeLogo({ isColumn = false }: { isColumn?: boolean }) {
  return (
    <>
    <div className={`${lusitana.className} flex ${isColumn ? "flex-col items-center" : "flex-row items-center"} leading-none text-[#EB8833]`}>
      <div className={`hidden md:block ${isColumn ? "mb-2" : "mr-2"}`}> {/* Agregar mb-2 si es columna, mr-2 si es fila */}
        <Image src="/moneyhub.png" width={80} height={80} alt="MoneyHub" />
      </div>
    </div>
      <div className={`${lusitana.className} flex ${isColumn ? "flex-col" : "flex-row"} ${isColumn ? "items-start" : "items-center"} leading-none text-[#EB8833]`}>
        <p className="text-[44px] ">MoneyHub</p>
      </div>
    </>
  );
}
