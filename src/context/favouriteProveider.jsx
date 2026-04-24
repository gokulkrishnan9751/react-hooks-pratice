import React, { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'

export const FavouriteContext = createContext()
export default function FavouriteProveider({children}) {
    const [favourite, setFavourite] = useState([])
    const [profileData, setProfileData] = useState([])
    const profile = JSON.parse(sessionStorage.getItem("profile"))

    useEffect(() => {
        if(profile){
            setProfileData(profile)
        } else {
            setProfileData([])
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem("favourite", JSON.stringify(favourite))
    },[favourite])

    function handleFavourite(id) {
        if(favourite.includes(id)){
            setFavourite((ids) => ids.filter((item) => item !== id))
            sessionStorage.setItem("profile", JSON.stringify(profileData))
        }
        else{
            setFavourite((prev) => [...prev, id])
        }
    }

    const favouriteContextValue = useMemo(
      () => ({
        setFavourite,
        favourite,
        handleFavourite,
        setProfileData,
        profileData
      }),
      [favourite, profileData]
    )

  return (
    <FavouriteContext.Provider value={favouriteContextValue}>
        {children}
    </FavouriteContext.Provider>
  )
}
