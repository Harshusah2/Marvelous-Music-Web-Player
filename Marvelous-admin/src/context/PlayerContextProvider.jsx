import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [songsData, setSongsData] = useState([]);
    const [track, setTrack] = useState(null);

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            console.log('Fetched Songs:', response.data.songs);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]); // Set the first song as the default track
        } catch (error) {
            console.error("Error fetching songs data", error);
        }
    };

    const contextvalue = {
        songsData,
        track,
        getSongsData,
    }

    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;