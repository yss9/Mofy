import StyleBoardDetail from "../../../src/styleBoard/detail/StyleBoardDetail-container";
import BoardCommentWrite from "../../../src/boardComment/write/boardCommentWrite";
import BoardCommentList from "../../../src/boardComment/list/boardCommentList";


export default function StyleBoardDetailPage(){
    return (
        <>
            <StyleBoardDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>
        </>

    )


}