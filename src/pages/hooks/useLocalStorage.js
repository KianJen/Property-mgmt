import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue) //value is present

        if (typeof defaultValue === "function") {
            return defaultValue()
        } else {
            return defaultValue
        }
    })
    useEffect(() => { //on change
        localStorage.setItem(key, JSON.stringify(value)) //update with json version
    }, [key,value])

    return [value, setValue]
}