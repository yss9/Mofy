import CommunityList from "../../src/searchBoard/CommunityList-container";
import MarketBoardList from "../../src/searchBoard/MarketBoardList-container";
import StyleBoardList from "../../src/searchBoard/StyleBoardList-container";

export default function CommunityPage(){
    return (
        <>
            <CommunityList/>
            <MarketBoardList/>
            <StyleBoardList/>
        </>
        )
}