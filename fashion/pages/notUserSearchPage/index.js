
import {
    Wrapper, ConsentWrapper, SearchWrapper, SearchInput,
    RecentSearchWrapper, RecentSearchText,
    RecentSearchButton, TagButton, TagWrapper, TagText,
    MoreTagButton, PopularSearchWrapper, PopularSearchText,
    PopularSearchItems, Rate, PopularSearchItemsWrapper,
    TagButtonWrapper
}
    from '../../styles/searchPageStyle'



import {useState, useEffect} from "react";
import axios from "axios";
export default function BoardNewPage() {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
        setQuery(event.target.value);

    }

    const onEnterSubmit = (event) => {
        if (event.key ==="Enter") {
            // Send data to the Django backend using Axios
            axios.post('http://localhost:8000/search/history', { query: query })
                .then(response => {
                    // Handle successful response
                    console.log(response.data);
                    window.location.href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + search;
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                    alert("검색에 실패했습니다. 다시 시도해주세요.");
                });
        }
    }

    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');
        window.location.href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + encodeURIComponent(buttonText);
    }
    //
    const onMoreTagClickSubmit = (event) => {
        window.location.href = "https://google.com";
    };

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <SearchWrapper>
                        <SearchInput type="text" placeholder="검색어를 입력하세요." value={search} onChange={onChangeSearch} onKeyDown={onEnterSubmit}/>
                    </SearchWrapper>
                    <RecentSearchWrapper>
                        <RecentSearchText>최근검색어</RecentSearchText>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="가을 원피스">가을 원피스</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="긴팔">긴팔</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="브라운 코디">브라운 코디</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="레이어드">레이어드</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="틴트">틴트</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                        <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                    </RecentSearchWrapper>
                    <TagWrapper>
                        <TagText>태그</TagText>
                        <TagButtonWrapper>
                            <TagButton onClick={onTagClickSubmit} data-text="가을">#가을</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="운동화">#운동화</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="후드">#후드</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="섀도우">#섀도우</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="여름쿨톤">#여름쿨톤</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                        </TagButtonWrapper>
                        <MoreTagButton onClick={onMoreTagClickSubmit}>더보기</MoreTagButton>
                    </TagWrapper>
                    <PopularSearchWrapper>
                        <PopularSearchText>인기검색어</PopularSearchText>
                        <PopularSearchItemsWrapper>
                            <Rate>1.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                가을바지
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>2.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                겨울옷
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>3.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                부츠
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>4.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                목티
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>5.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                후리스
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>6.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                운동화
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>7.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                기모
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>8.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                잠옷
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>9.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                셋업
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                        <PopularSearchItemsWrapper>
                            <Rate>10.</Rate>
                            <PopularSearchItems onClick={onTagClickSubmit}>
                                블록코어
                            </PopularSearchItems>
                        </PopularSearchItemsWrapper>
                    </PopularSearchWrapper>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}

// fashion 파일에서 yarn dev 명령어
// 화면 뜨면 /boards