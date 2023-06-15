import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import {Searchbar, Sidebar, MusicPlayer, TopPlay} from './components';
import {ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts} from './pages';
import isProdFunc from "./utils/Production";
import Song from "./pages/Song";
import {useState} from "react";

const App = () => {
    const {activeSong} = useSelector((state) => state.player);
    const [rightSide, setRightSide] = useState(true);
    const url = isProdFunc()


    const setFun = (e) => {
        e.preventDefault()
        setRightSide(!rightSide)
    }
    return (
        <div className="relative flex">
            <Sidebar/>
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
                <Searchbar/>

                <div
                    className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        <Routes>
                            <Route path={url + "/"} element={<Discover/>}/>
                            <Route path={url + "/top-artists"} element={<TopArtists/>}/>
                            <Route path={url + "/top-charts"} element={<TopCharts/>}/>
                            <Route path={url + "/around-you"} element={<AroundYou/>}/>
                            <Route path={url + "/artists/:id"} element={<ArtistDetails/>}/>
                            <Route path={url + "/songs/:songid"} element={<SongDetails/>}/>
                            <Route path={url + "/search/:searchTerm"} element={<Search/>}/>
                            <Route path={url + "/song/:searchTerm"} element={<Song/>}/>
                        </Routes>
                    </div>
                    <div className="xl:sticky relative top-0 h-fit none">
                        <button
                            type={"button"}
                            onClick={(e) => setFun(e)}
                            className={"inline text-2xl text-white font-bold px-5 py-2 mx-5 my-2 border-2"}
                        >
                            {rightSide ? "Close" : "Open"} Sidebar
                        </button>
                        {
                            rightSide && <TopPlay/>
                        }
                    </div>
                </div>
            </div>

            {activeSong?.title && (
                <div
                    className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                    <MusicPlayer/>
                </div>
            )}
        </div>
    );
};

export default App;
