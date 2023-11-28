import MarketBoardDetail from "@/src/marketBoard/detail/MarketBoardDetail-container";
import BoardCommentWrite from "@/src/boardComment/write/boardCommentWrite";
import BoardCommentList from "@/src/boardComment/list/boardCommentList";


export default function MarketBoardDetailPage(){
    return (
        <>
            <MarketBoardDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>

        </>

    )


}