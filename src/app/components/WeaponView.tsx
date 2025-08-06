import React from 'react';

interface WeaponViewProps{
    w_name: string;
    damage: number;
}

const WeaponView:React.FC<WeaponViewProps> = ({w_name, damage}) => {
    return (
        <div>
            <p>Weapon Name: {w_name}</p>
            <p>Damage Amount: {damage}</p>
        </div>
    )
}

export default WeaponView;