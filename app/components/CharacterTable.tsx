"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getCharacters, Character, Info, ApiResponse } from 'rickmortyapi';
import Link from 'next/link';

export default function CharacterTable(): JSX.Element {
    const [characters, setCharacters] = useState<Character[]>(); //get all characters
    const [page, setPage] = useState<number>(1); //set the current page
    const [totalPages, setTotalPages] = useState<number>(); //set the total number of page
    const [searchChars, setSearchChars] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchChars(event.target.value);
    };
    
    /**
     * @function useEffect is used to run code whenever the page state changes
     * @function fetchdata retrieves data from the api call and runs when the component is initialized or when the page or the search changes
     */
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const currentCharacters :  ApiResponse<Info<Character[]>>  = await getCharacters({page: page, name: searchChars}) //get the characters from the current page
                setCharacters(currentCharacters.data.results)
                setTotalPages(currentCharacters.data.info?.pages)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchdata();
    }, [page, searchChars]);
    
    return(
        <div>
            <h1 className='md:text-5xl text-3xl text-center mt-3 antialiased text-rick-blue [text-shadow:_1px_1px_2px_#A9D729,_0_0_1em_#A9D729,_0_0_0.2em_#A9D729]'>The Rick and Morty characters</h1>
            <div className='mt-10 grid grid-cols-2 text-center '>
                <div>
                <label htmlFor="search" className='md:text-2xl text-lg [text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue font-bold'>Search by name: </label>
                <input type="text" id='search' placeholder="Search" onChange={handleSearch} className='md:ms-3 ms-2 md:text-xl text-lg bg-rick-blue text-dark-blue placeholder:text-dark-blue placeholder:font-extralight rounded p-2 [box-shadow:_0px_0px_0px,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] focus:[box-shadow:_0px_0px_0px,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] focus:outline-none'/>
                </div>
            </div>
            <table className='w-full text-center justify-center border-rick-blue table-auto mt-10'>
                <thead>
                    <tr className='md:text-3xl text-xl'>
                        <th className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Avatar</th>
                        <th className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Name</th>
                        <th className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Species</th>
                        <th className='[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] text-rick-blue'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {characters?.map((character: Character) => (
                        <tr key={character.id} className='md:text-xl text-md'>
                            <td className='flex justify-center my-3'>
                                <Image src={character.image} alt={character.name} width={60} height={60} className='rounded [box-shadow:_0px_0px_0px,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729]'/>
                            </td>
                            <td>
                                {/* search is used to pass query parameters */}
                                <Link href={`/profile/${character.id}`} className='hover:text-rick-blue hover:[text-shadow:_0.5px_0.5px_0.5px_#A9D729,_0_0_0.5em_#A9D729,_0_0_0.1em_#A9D729] hover:duration-100'>
                                    {character.name}
                                </Link>
                            </td>
                            <td>{character.species}</td>
                            <td>{character.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='text-center'>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className='me-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 hover:text-rick-blue hover:duration-75">
                <path fillRule="evenodd" d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z" clipRule="evenodd" />
                </svg>
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 hover:text-morty-green hover:duration-75">
                <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
        </div>
    )
}