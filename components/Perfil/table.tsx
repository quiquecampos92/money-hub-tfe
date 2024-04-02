import { Cuenta, Movimiento } from '@/shared/interfaces/Interfaces';
import { UpdateUser } from '../movimientos/buttons';
import { getIdAuth } from '@/shared/middlewares/data';

export default async function UserTable(){
  const userId = getIdAuth();

    return (
      <div>
        {userId}
      </div> 
      );
};


