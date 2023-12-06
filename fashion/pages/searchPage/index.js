import CommunityList from "../../src/searchBoard/CommunityList-container";
import MarketBoardList from "../../src/searchBoard/MarketBoardList-container";
import StyleBoardList from "../../src/searchBoard/StyleBoardList-container";
import {Title} from "../../styles/mainPageStyle";

const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
export default function CommunityPage(){
    return (
        <>
            {/*<CommunityList/>*/}
            {/*<MarketBoardList/>*/}
            <div>
                {/*<Title onClick={onClickHome} src="images/mofylogo.png"/>*/}
            </div>
            <div>
                <StyleBoardList/>
            </div>

        </>
        )
}