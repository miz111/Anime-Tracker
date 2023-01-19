import { useState, useEffect } from "react";
import { useAuthContext } from "./auth";


export default function Favorites() {
    const { token, user } = useAuthContext();
    const [anime, setAnime] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function getFavoriteAnime() {
            const favoritesURL = `${process.env.REACT_APP_FAVORITES_API_HOST}/favorites/${user.id}`;
            const fetchConfig = {
                method: "get",
                headers: {
                    Authorization: "Bearer ",
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(favoritesURL, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setAnime(data.anime);
                setSubmitted(false);
            }
            else {
                console.log("error");
            }
        }
        if (user) {
            getFavoriteAnime();
        }
    }, [user, setAnime, submitted]);

    const removeFavorite = async (favorite) => {
        const removeURL = `${process.env.REACT_APP_FAVORITES_API_HOST}/favorites/${user.id}/${favorite.id}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                Authorization: "Bearer ",
                "Content-Type": "application/json",
            },
        };
        const response = await fetch (removeURL, fetchConfig);
        if (response.ok) {
            setAnime([...anime]);
            setSubmitted(true);
        }
    };

    return
}