'use client';

import { useEffect, useState } from "react";
import { Weapon } from "@/app/types/weapon";
// import data from "@/data.json";

export default function Weapons(){
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [w_name, setWName] = useState<string>('');
    const [damage, setDamage] = useState<number>();

    const [edit_w_name, set_edit_w_name] = useState<string>('');
    const [editDamage, setEditDamage] = useState<string>('');
 
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false); 
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
    const [currentWeaponID, setCurrentWeaponID] = useState<number>(0);

    useEffect(() => {
        fetch('/api/weapons')
        .then((res) => res.json())
        .then((data) => setWeapons(data));
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedDamage = editDamage === "" ? undefined : Number(editDamage);

        const res = await fetch('/api/weapons', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ weapon_id: currentWeaponID, w_name: edit_w_name, damage: parsedDamage })
        })

        if(res.ok) {
            console.log("Weapon updated!");
            fetch('/api/weapons')
            .then(res => res.json())
            .then(data => setWeapons(data));
        } else {
            console.error("update failed");
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/weapons', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({w_name, damage})
        });

        if(res.ok) {
            const newWeapon = await res.json();
            setWeapons(prev => [...prev, {weapon_id: newWeapon.id, w_name: w_name, damage: damage}]);
            setWName('');
            setDamage(0);
        } else {
            console.error("Failed to add weapon");
        }
    }

    const showUpdateForm = () => {
        if(isUpdateFormOpen){
            const editWeapon = weapons.filter((weapon) => {
                return weapon.weapon_id === currentWeaponID;
            })

            return (
                <div>
                    <h2>Edit weapon</h2>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder={editWeapon[0].w_name}
                            value={edit_w_name}
                            onChange={(e)=> set_edit_w_name(e.target.value)}
                            />
                        <input
                            type="number"
                            placeholder={editWeapon[0].damage.toString()}
                            value={editDamage}
                            onChange={(e) => setEditDamage(e.target.value)}
                            />
                        <button type="submit">Update Weapon</button>
                    </form>
                </div>
            )
        } else {
            return;
        }
    }

    const viewWeapon = () => {
        if(isViewOpen){
            const viewedWeapon = weapons.filter((weapon) => {
                return weapon.weapon_id === currentWeaponID;
            })

            return <div>
                <p>Weapon Name: {viewedWeapon[0].w_name}</p>
                <p>Damage Amount: {viewedWeapon[0].damage}</p>
            </div>
        } else {
            return null;       
        }
    }

    return(
        <div>
            <h3>Weapons Page</h3>
            <ul>
                {weapons.map((weapon) => {
                    return (
                    <li key={weapon.weapon_id}>
                        <strong>{weapon.w_name} - {weapon.damage} </strong>
                        <button onClick={() => {
                            setIsUpdateFormOpen(!isUpdateFormOpen);
                            setCurrentWeaponID(weapon.weapon_id);
                        }}>Edit</button>
                        <button onClick={() => {
                            setCurrentWeaponID(weapon.weapon_id);
                            setIsViewOpen(!isViewOpen);
                        }}>View</button>
                    </li>
                    )
                })}
            </ul>

            <p>Add a new Weapon</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Weapon Name"
                    value={w_name}
                    onChange={(e)=> setWName(e.target.value)}
                    required
                    />
                <input
                    type="number"
                    placeholder="Damage"
                    value={damage}
                    onChange={(e) => setDamage(Number(e.target.value))}
                    required
                    />
                <button type="submit">Add Weapon</button>
            </form>

            {showUpdateForm()}
            {viewWeapon()}

        </div>
    )
}