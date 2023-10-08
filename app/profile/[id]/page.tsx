"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Character, getCharacter } from 'rickmortyapi';

const Profile = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") as string
    const [character, setCharacter] = useState<Character>()

     useEffect(() => {
        const fetchCharData = async () => {
            try {
                const currentCharacter = await getCharacter(parseInt(id)); //id has to be a number
                setCharacter(currentCharacter.data)
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        }

        if (id) {
            fetchCharData();
        }

    }, [id]);
    
    if (!character) {
        return <div className='text-center'>Loading...</div>;
    }

    const epNumbers = character.episode.map((ep: string) => {
        const matches: RegExpMatchArray | null = ep.match(/\d+$/);
        return matches ? matches[0] : '';
    })

    if(character.type === ""){
        character.type = "-"
    }

    return (
        <>
        <div>
            <Link href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-700 m-4">
                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
        <ul className='text-center text-xl sm:mx-52'>
            <li className='flex justify-center my-2'><Image src={character.image} alt={character.name} width={250} height={250} className='rounded [box-shadow:_1px_1px_1px_#A9D729,_0_0_0.8em_#A9D729,_0_0_0.3em_#A9D729]'/></li>
            <div className='grid grid-cols-1'>
            <li className='my-2 text-center'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Name: </div>
                <div className=' '>{character.name}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Gender: </div>
                <div className=' '>{character.gender}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Species: </div>
                <div className=' '>{character.species}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Status: </div>
                <div className=''>{character.status}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Type: </div>
                <div className=' '>{character.type}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Location: </div>
                <div className=''>{character.location.name}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Origin: </div>
                <div className=''>{character.origin.name}</div>
            </li>
            <li className='my-2'>
                <div className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Episodes: </div>
                <div className=''>{epNumbers.join(", ")}</div>
            </li>
            </div>
        </ul>
        </>
    );
}

export default Profile;