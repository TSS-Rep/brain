import React from 'react'


interface ExtraInfoATMProps {
    atm: {
      _id: string;
      brand: string;
      model: string;
      service: string;
      coor: {
        lat: number;
        lng: number;
      };
    };
}
export const ExtraInfoATM: React.SFC<ExtraInfoATMProps> = (props) => {
    return (
        <div>
            {props.atm.brand}
        </div>
    )
}
