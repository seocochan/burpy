import React, { Component } from 'react';
import SearchResult from '../components/SearchResult';

// FIX: 타이틀, 필터, 결과 리스트를 별개의 컴포넌트로 분리
class SearchResultPage extends Component {
  render() {
    return (
      <div>
        <SearchResult />
      </div>
    );
  }
}

export default SearchResultPage;