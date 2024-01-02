import React from 'react'
import Dolar from '../../../../../assets/MAINSVGS/Caja SVG/DolarSignoSvg';

interface SalesListProps {
    ventas:any [];
  }



 const SalesList: React.FC<SalesListProps> = ({ventas}) => {

  return (
    
      <div className=" flex flex-1 bg-slate-800 pt-2 ">
        <div className=" w-10/12 space-y-2 flex-col">
          {ventas.map((e) => {
            return (
              <div
                key={e._id}
                className="flex flex-1 flex-row bg-slate-700 h-12 rounded-e-lg items-center p-2 "
              >
                <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                  <div className=" flex items-center p-2"></div>
                  {e.articulo}
                </div>
                <div className=" flex flex-1 flex-row items-center text-green-400 text-lg">
                  <div className=" flex items-center p-2">
                    +
                    <Dolar />
                  </div>
                  <p className="">{e.cantidad}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

}


export default SalesList;